const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const listeners = {};
const storage = new Map([['tus-series-v20', new Map()], ['another-app', new Map()]]);
let active = false;
const caches = {
  open: async name => {
    if (!storage.has(name)) storage.set(name, new Map());
    const entries = storage.get(name);
    return {
      addAll: async assets => assets.forEach(asset => {
        assert.ok(fs.existsSync(path.join(root, asset)), `Falta ${asset}`);
        entries.set(asset, fs.readFileSync(path.join(root, asset)));
      }),
      put: async (request, response) => entries.set(request.url, response)
    };
  },
  keys: async () => [...storage.keys()],
  delete: async name => storage.delete(name),
  match: async request => {
    const key = typeof request === 'string' ? request : request.url;
    for (const entries of storage.values()) if (entries.has(key)) return entries.get(key);
  }
};
vm.runInNewContext(fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8'), {
  caches,
  fetch: async () => { throw new Error('Sin conexión'); },
  self: {
    addEventListener: (name, handler) => {listeners[name] = handler;},
    skipWaiting: async () => {},
    clients: {claim: async () => {active = true;}}
  }
});

async function lifecycle(name) {
  let pending;
  listeners[name]({waitUntil: promise => {pending = promise;}});
  await pending;
}
async function offlineRequest(url, mode = 'same-origin') {
  let response;
  listeners.fetch({request: {url, method: 'GET', mode}, respondWith: promise => {response = promise;}});
  return response;
}

(async () => {
  await lifecycle('install');
  await lifecycle('activate');
  assert.ok(active);
  assert.ok(!storage.has('tus-series-v20'));
  assert.ok(storage.has('another-app'));
  const offlineHtml = await offlineRequest('/series/', 'navigate');
  assert.ok(offlineHtml.toString().includes('./release-data.js'));
  const releaseData = await offlineRequest('./release-data.js');
  assert.ok(releaseData.toString().includes('2026-10-08'));
  assert.ok(await offlineRequest('./manifest.webmanifest'));
  console.log('OK: app y calendario en caché sin conexión; otras aplicaciones conservan su caché.');
})().catch(error => {console.error(error); process.exitCode = 1;});
