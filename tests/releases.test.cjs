const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const model = script.slice(0, script.indexOf('  document.addEventListener("error"'));

function app(seed = null, instant = '2026-10-08T14:00:00Z') {
  const clock = {now: new Date(instant).getTime()};
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : [clock.now])); }
    static now() { return clock.now; }
  }
  const context = vm.createContext({Date: ClockDate, localStorage: {getItem: () => seed && JSON.stringify(seed)}});
  vm.runInContext(fs.readFileSync(path.join(root, 'release-data.js'), 'utf8'), context);
  vm.runInContext(model, context);
  return {
    read: expression => vm.runInContext(expression, context),
    at: instant => {clock.now = new Date(instant).getTime();}
  };
}

const fresh = app();
assert.equal(fresh.read('catalog.length'), 76);
assert.equal(fresh.read('new Set(catalog.map(s => s.id)).size'), 76);
assert.equal(fresh.read('new Set(releaseEvents.map(e => `${e.serieId}:${e.season}:${e.episode}`)).size'), fresh.read('releaseEvents.length'));
assert.equal(fresh.read('releaseEvents.every(e => /^\u005cd{4}-\u005cd{2}-\u005cd{2}$/.test(e.date) && catalog.some(s => s.id === e.serieId && s.seasons.some(t => t.season === e.season && t.total >= e.episode)))'), true);
assert.equal(fresh.read('catalog.every(s => new Set(s.seasons.map(t => t.season)).size === s.seasons.length)'), true);
assert.equal(fresh.read('RELEASE_REVIEW.events.every(e => releaseEvents.find(r => r.serieId === e.serieId && r.season === e.season && r.episode === e.episode).serie === getCatalogSerie(e.serieId).name)'), true);
assert.equal(fresh.read("releaseEvents.filter(e => e.date === '2026-10-23')[0].serieId"), 'the-traitors-us');
assert.equal(fresh.read('catalog.every(s => RELEASE_REVIEW.providerSources[s.id]?.length > 0)'), true);

function available(app, id, season) {
  return app.read(`availableEpisodeLimit(getCatalogSerie('${id}'), getCatalogSerie('${id}').seasons.find(s => s.season === ${season}))`);
}
assert.equal(available(fresh, 'big-brother-us', 28), 41);
assert.equal(available(fresh, 'koh-lanta', 34), 7);
assert.equal(available(fresh, 'the-traitors-us', 5), 4);
assert.equal(available(fresh, 'love-is-blind-us', 11), 0);
assert.equal(available(fresh, 'ghosts-us', 6), 0);
assert.equal(available(fresh, 'lupin', 4), 0);
assert.match(fresh.read("releaseStatusText(getCatalogSerie('big-brother-us'))"), /completa.*41\/41.*29 y 30/);
assert.equal(fresh.read("catalogFilterKind(getCatalogSerie('big-brother-us'))"), 'upcoming');
assert.equal(fresh.read("catalogFilterKind(getCatalogSerie('koh-lanta'))"), 'airing');
assert.equal(fresh.read("nextCatalogRelease(getCatalogSerie('the-traitors-us')).date"), '2026-10-09');
assert.doesNotMatch(fresh.read("getCatalogSerie('ghosts-us').description"), /Próximo 29\/10\/2026/);
assert.doesNotMatch(fresh.read("getCatalogSerie('only-murders-in-the-building').description"), /50\/50 emitidos/);
assert.doesNotMatch(fresh.read("getCatalogSerie('lupin').description"), /Próximo|17\/25 emitidos/);

// NBC estrena durante la madrugada siguiente en Madrid.
fresh.at('2026-10-08T23:59:59Z');
assert.equal(available(fresh, 'the-traitors-us', 5), 4);
fresh.at('2026-10-09T00:00:00Z');
assert.equal(available(fresh, 'the-traitors-us', 5), 5);
assert.equal(fresh.read("nextCatalogRelease(getCatalogSerie('the-traitors-us')).date"), '2026-10-16');

// El calendario oficial se desbloquea por tandas, sin recargar la app.
fresh.at('2026-10-14T06:59:59Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 0);
fresh.at('2026-10-14T07:00:00Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 5);
assert.equal(fresh.read("catalogFilterKind(getCatalogSerie('love-is-blind-us'))"), 'airing');
fresh.at('2026-10-21T07:00:00Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 8);
fresh.at('2026-10-28T07:00:00Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 11);
fresh.at('2026-11-04T07:59:59Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 11);
fresh.at('2026-11-04T08:00:00Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 12);
assert.match(fresh.read("releaseStatusText(getCatalogSerie('love-is-blind-us'))"), /completa/);
assert.equal(fresh.read("catalogFilterKind(getCatalogSerie('love-is-blind-us'))"), 'complete');

fresh.at('2026-10-23T06:59:59Z');
assert.equal(available(fresh, 'lupin', 4), 0);
fresh.at('2026-10-23T07:00:00Z');
assert.equal(available(fresh, 'lupin', 4), 8);
assert.match(fresh.read("releaseStatusText(getCatalogSerie('lupin'))"), /completa/);
assert.equal(fresh.read("catalogFilterKind(getCatalogSerie('lupin'))"), 'complete');
fresh.at('2026-10-13T19:09:59Z');
assert.equal(available(fresh, 'koh-lanta', 34), 7);
fresh.at('2026-10-13T19:10:00Z');
assert.equal(available(fresh, 'koh-lanta', 34), 8);
fresh.at('2026-10-20T19:10:00Z');
assert.equal(available(fresh, 'koh-lanta', 34), 9);
assert.match(fresh.read("releaseStatusText(getCatalogSerie('koh-lanta'))"), /en emisión.*total pendiente/);

// Una fecha sin hora no implica disponibilidad a medianoche.
fresh.at('2026-10-30T10:00:00Z');
assert.equal(available(fresh, 'dexter-resurrection', 2), 0);
fresh.at('2026-10-31T00:00:00Z');
assert.equal(available(fresh, 'dexter-resurrection', 2), 1);
assert.equal(fresh.read("serieTotals(getCatalogSerie('dexter-resurrection')).upcomingUnknownSeason"), true);

// Los dos cambios de horario no alteran las fechas/horas de Madrid.
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'the-traitors-us' && e.season === 5 && e.episode === 8).date"), '2026-10-30');
assert.match(fresh.read("releaseAvailabilityText(releaseEvents.find(e => e.serieId === 'the-traitors-us' && e.season === 5 && e.episode === 8))"), /01:00/);
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'ghosts-us' && e.season === 6 && e.episode === 1).date"), '2026-10-30');
assert.equal(fresh.read("new Intl.DateTimeFormat('en-GB', {timeZone:'America/Los_Angeles',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(releaseEvents.find(e => e.serieId === 'love-is-blind-us' && e.season === 11 && e.episode === 12).releaseAt))"), '00:00');

// Actualizar el catálogo conserva contadores, ritmo e historial existentes.
const old = app();
const seed = JSON.parse(old.read(`JSON.stringify({mySeries: ['koh-lanta','big-brother-us','love-is-blind-uk','ghosts-us'].map(id => clone(getCatalogSerie(id))), watchHistory: [{serieId:'koh-lanta',season:34,watchedAt:'2026-10-06T22:00:00'}]})`));
seed.mySeries.forEach(s => {
  s.episodesPerDay = 3;
  s.lastWatchedAt = '2026-10-06T22:00:00';
  s.seasons.forEach(t => {t.watched = t.total;});
});
const koh = seed.mySeries.find(s => s.id === 'koh-lanta').seasons.find(s => s.season === 34);
koh.total = 7;
koh.watched = 6;
koh.note = 'Koh-Lanta All Stars · 6 emisiones disponibles · próxima 06/10/2026';
koh.episodes = koh.episodes.slice(0, 7);
const bb = seed.mySeries.find(s => s.id === 'big-brother-us');
bb.seasons = bb.seasons.filter(s => s.season <= 28);
bb.seasons.find(s => s.season === 28).watched = 40;
const ghost = seed.mySeries.find(s => s.id === 'ghosts-us').seasons.find(s => s.season === 6);
ghost.total = 0;
ghost.watched = 0;
ghost.episodes = [];
const migrated = app(seed);
assert.equal(migrated.read("getSerie('koh-lanta').seasons.find(s => s.season === 34).watched"), 6);
assert.equal(migrated.read("getSerie('big-brother-us').seasons.find(s => s.season === 28).watched"), 40);
assert.equal(migrated.read("getSerie('big-brother-us').seasons.length"), 30);
assert.equal(migrated.read("state.watchHistory.length"), 1);
assert.equal(migrated.read("getSerie('koh-lanta').episodesPerDay"), 3);
assert.equal(migrated.read("getSerie('ghosts-us').seasons.find(s => s.season === 6).totalKnown"), false);
assert.equal(migrated.read("getSerie('love-is-blind-uk').seasons.find(s => s.season === 3).watched"), 11);
assert.equal(migrated.read("ui.calendarScope = 'followed'; calendarSourceEvents().every(e => state.mySeries.some(s => s.id === e.serieId))"), true);

console.log('OK: 76 series, calendario, horarios, estrenos progresivos y conservación del progreso.');
