const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const model = script.slice(0, script.indexOf('  document.addEventListener("error"'));

function app(seed = null) {
  let saved = seed;
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : ['2026-11-03T12:00:00Z'])); }
    static now() { return new Date('2026-11-03T12:00:00Z').getTime(); }
  }
  const context = vm.createContext({
    Date: ClockDate,
    confirm: () => true,
    localStorage: {
      getItem: () => saved && JSON.stringify(saved),
      setItem: (_key, value) => {saved = JSON.parse(value);}
    }
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'release-data.js'), 'utf8'), context);
  vm.runInContext(model, context);
  vm.runInContext('render = () => saveState(); showScreen = () => saveState();', context);
  return {
    read: expression => vm.runInContext(expression, context),
    saved: () => saved
  };
}

const id = 'the-righteous-gemstones';
const fresh = app();
fresh.read(`addSerie('${id}')`);
assert.equal(fresh.read(`completedWatchCount('${id}')`), 0);
assert.equal(fresh.read(`serieDisplayName(getSerie('${id}'))`), 'The Righteous Gemstones (x0)');
fresh.read('completeSeason(0)');
assert.equal(fresh.read(`completedWatchCount('${id}')`), 0, 'Una temporada no completa una serie con varias temporadas');
fresh.read(`getSerie('${id}').seasons.forEach((_, index) => completeSeason(index))`);
assert.equal(fresh.read(`completedWatchCount('${id}')`), 1);
assert.equal(fresh.read(`filteredRewatchCatalog().some(serie => serie.id === '${id}')`), true);
assert.equal(fresh.read(`filteredCatalog().some(serie => serie.id === '${id}')`), false);
fresh.read('render(); completeSeason(3); render()');
assert.equal(fresh.read(`completedWatchCount('${id}')`), 1, 'Renderizar o completar de nuevo no duplica el contador');

const migrated = app({mySeries: [fresh.saved().mySeries[0]], watchHistory: fresh.saved().watchHistory});
assert.equal(migrated.read(`completedWatchCount('${id}')`), 1, 'Una finalización guardada conserva al menos un visionado');
const legacy = JSON.parse(JSON.stringify(fresh.saved()));
delete legacy.viewingHistory;
delete legacy.mySeries[0].watchCompletion;
const old = app(legacy);
assert.equal(old.read(`completedWatchCount('${id}')`), 1, 'El progreso antiguo completo cuenta como primer visionado');
assert.equal(old.read(`getSerie('${id}').seasons.every(season => season.watched === season.total)`), true);

const restored = app(fresh.saved());
assert.equal(restored.read(`completedWatchCount('${id}')`), 1);
restored.read('saveState()');
assert.equal(app(restored.saved()).read(`completedWatchCount('${id}')`), 1, 'Recargar conserva el contador');

const historyLength = restored.read('state.watchHistory.length');
restored.read(`rewatchSerie('${id}')`);
assert.equal(restored.read(`getSerie('${id}').seasons.every(season => season.watched === 0)`), true);
assert.equal(restored.read(`getSerie('${id}').lastWatchedAt`), '');
assert.equal(restored.read(`completedWatchCount('${id}')`), 1);
assert.equal(restored.read('state.watchHistory.length'), historyLength, 'Reiniciar conserva la actividad anterior');
assert.equal(restored.read('state.mySeries.length'), 1, 'Reiniciar no duplica la serie');
assert.equal(restored.read(`homeSeries().some(serie => serie.id === '${id}')`), true);
assert.equal(restored.read(`nextEpisodeDetails(getSerie('${id}')).label.startsWith('T1 · capítulo 1')`), true);
restored.read(`incrementSeason(0); rewatchSerie('${id}')`);
assert.equal(restored.read(`getSerie('${id}').seasons[0].watched`), 1, 'Una repetición en curso se continúa sin borrar su progreso');

const continuing = app(restored.saved());
assert.equal(continuing.read(`completedWatchCount('${id}')`), 1);
continuing.read(`getSerie('${id}').seasons.forEach((_, index) => completeSeason(index))`);
assert.equal(continuing.read(`completedWatchCount('${id}')`), 2);
assert.equal(continuing.read(`serieDisplayName(getSerie('${id}'))`), 'The Righteous Gemstones (x2)');
continuing.read('decrementSeason(3)');
assert.equal(continuing.read(`completedWatchCount('${id}')`), 1, 'Deshacer el último capítulo corrige el visionado actual');
continuing.read('watchNextEpisode(); saveState()');
assert.equal(continuing.read(`completedWatchCount('${id}')`), 2, 'El botón rápido registra también el final de la serie');
continuing.read(`rewatchSerie('${id}'); getSerie('${id}').seasons.forEach((_, index) => completeSeason(index)); decrementSeason(3); incrementSeason(3)`);
assert.equal(continuing.read(`completedWatchCount('${id}')`), 3, 'El botón +1 de una temporada registra el final');

continuing.read(`ui.catalogSearch = 'gemstones'`);
assert.equal(continuing.read('filteredRewatchCatalog().length'), 1);
continuing.read(`ui.catalogSearch = 'sin coincidencias'`);
assert.equal(continuing.read('filteredRewatchCatalog().length'), 0);
continuing.read(`ui.catalogSearch = ''; ui.catalogFilter = 'upcoming'`);
assert.equal(continuing.read('filteredRewatchCatalog().length'), 0);
continuing.read(`ui.catalogFilter = 'all'; removeActiveSerie()`);
assert.equal(continuing.read('state.mySeries.length'), 0);
assert.equal(continuing.read(`completedWatchCount('${id}')`), 3);
const archived = app(continuing.saved());
assert.equal(archived.read('filteredRewatchCatalog().length'), 1, 'Las completadas se conservan aunque se retiren de la lista');
archived.read(`rewatchSerie('${id}')`);
assert.equal(archived.read('state.mySeries.length'), 1);
assert.equal(archived.read(`getSerie('${id}').seasons.every(season => season.watched === 0)`), true);
assert.equal(archived.read(`completedWatchCount('${id}')`), 3);

const incomplete = app();
incomplete.read(`state.mySeries.push({id:'test', name:'Test', seasons:[{season:1,total:4,watched:2,releasedEpisodes:2}]}); recordFullWatch(getSerie('test'))`);
assert.equal(incomplete.read(`completedWatchCount('test')`), 0, 'Estar al día en una temporada en emisión no completa la serie');
incomplete.read(`getSerie('test').seasons[0] = {season:1,total:4,watched:4,releasedEpisodes:4,totalKnown:false}; recordFullWatch(getSerie('test'))`);
assert.equal(incomplete.read(`completedWatchCount('test')`), 0, 'Un total desconocido no cuenta como visionado completo');
incomplete.read(`getSerie('test').seasons[0].totalKnown = true; recordFullWatch(getSerie('test')); getSerie('test').seasons.push({season:2,total:1,watched:1}); recordFullWatch(getSerie('test'))`);
assert.equal(incomplete.read(`completedWatchCount('test')`), 1, 'Una temporada nueva no suma otro visionado de toda la serie');
incomplete.read(`getSerie('test').seasons[1].watched = 0; undoFullWatch(getSerie('test'))`);
assert.equal(incomplete.read(`completedWatchCount('test')`), 1, 'Corregir una temporada posterior conserva el visionado ya registrado');

console.log('OK: migración, repeticiones completas, contador persistente, correcciones, historial y filtros.');
