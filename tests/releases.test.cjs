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
assert.equal(fresh.read('catalog.length'), 97);
assert.equal(fresh.read('new Set(catalog.map(s => s.id)).size'), 97);
assert.equal(fresh.read('new Set(releaseEvents.map(e => `${e.serieId}:${e.season}:${e.episode}`)).size'), fresh.read('releaseEvents.length'));
assert.equal(fresh.read('releaseEvents.every(e => /^\u005cd{4}-\u005cd{2}-\u005cd{2}$/.test(e.date) && catalog.some(s => s.id === e.serieId && s.seasons.some(t => t.season === e.season && t.total >= e.episode)))'), true);
assert.equal(fresh.read('catalog.every(s => new Set(s.seasons.map(t => t.season)).size === s.seasons.length)'), true);
assert.equal(fresh.read('RELEASE_REVIEW.events.every(e => releaseEvents.find(r => r.serieId === e.serieId && r.season === e.season && r.episode === e.episode).serie === getCatalogSerie(e.serieId).name)'), true);
assert.equal(fresh.read("releaseEvents.filter(e => e.date === '2026-10-23')[0].serieId"), 'the-traitors-us');
assert.equal(fresh.read('catalog.every(s => RELEASE_REVIEW.providerSources[s.id]?.length > 0)'), true);
assert.equal(fresh.read('RELEASE_REVIEW.reviewedOn'), '2026-10-29');
assert.equal(fresh.read('RELEASE_REVIEW.fullReviewedOn'), '2026-10-29');
assert.equal(fresh.read('RELEASE_REVIEW.reviewScope'), 'full');
assert.equal(fresh.read('RELEASE_REVIEW.reviewedSeriesCount'), 97);
assert.equal(fresh.read("catalog.every(s => RELEASE_REVIEW.series[s.id]?.reviewedOn === '2026-10-29' && RELEASE_REVIEW.reviewedSeriesIds.includes(s.id))"), true);
assert.equal(fresh.read('new Set(releaseEvents.map(e => e.serieId)).size'), 97);
assert.ok(fresh.read('releaseEvents.length') > 6000);
const audit = JSON.parse(fs.readFileSync(path.join(root, 'catalog-review.json'), 'utf8'));
assert.equal(audit.catalogSize, 97);
assert.equal(audit.calendarEventCount, fresh.read('releaseEvents.length'));
assert.equal(audit.series.length, 97);
assert.equal(audit.reviewedSeriesCount, 97);
assert.equal(audit.reviewedSeriesIds.length, 97);
assert.ok(audit.series.every(s => s.reviewedOn === audit.reviewedOn && s.sources.length > 0 && s.verification.checkedOn === audit.reviewedOn));
assert.equal(fresh.read("Object.values(RELEASE_REVIEW.series).filter(s => s.providerReviewedOn === '2026-10-29').length"), 96);
assert.equal(fresh.read('releaseEvents.length'), 6801);
assert.equal(fresh.read('catalog.every(s => s.seasons.every(t => t.episodes.every(e => e.number <= t.total)))'), true);

assert.equal(fresh.read("getCatalogSerie('forensic-files').seasons.length"), 14);
assert.equal(fresh.read("serieTotals(clone(getCatalogSerie('forensic-files'))).availableEpisodes"), 400);
assert.equal(fresh.read("getCatalogSerie('forensic-files').seasons[0].episodes[0].title"), 'The Disappearance of Helle Crafts');
assert.equal(fresh.read("getCatalogSerie('forensic-files').seasons[13].episodes[20].title"), 'Expert Witness');
assert.equal(fresh.read("releaseEvents.filter(e => e.serieId === 'forensic-files').length"), 400);

// Los anuncios oficiales y las fechas del proveedor se distinguen sin inventar horarios.
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'koh-lanta' && e.season === 34 && e.episode === 10).date"), '2026-10-27');
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'koh-lanta' && e.season === 34 && e.episode === 10).releaseAt"), '2026-10-27T20:10:00Z');
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'koh-lanta' && e.season === 34 && e.episode === 11).releaseAt"), '2026-11-03T20:10:00Z');
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'koh-lanta' && e.season === 34 && e.episode === 9).sourceUrl"), 'https://tf1pro.com/programmes/diffusion/2026-10-20-2110-koh-lanta-emission-9-partie-1');
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'love-is-blind-us' && e.season === 11 && e.episode === 1).sourceKind"), 'official');
assert.doesNotMatch(fresh.read("releaseEvents.find(e => e.serieId === 'love-is-blind-us' && e.season === 11 && e.episode === 1).note"), /pendiente de confirmación/);
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'the-traitors-us' && e.season === 5 && e.episode === 6).sourceKind"), 'provider');
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'only-murders-in-the-building' && e.season === 6 && e.episode === 10).date"), '2027-02-09');
assert.equal(fresh.read("releaseEvents.find(e => e.serieId === 'dexter-resurrection' && e.season === 2 && e.episode === 3).date"), '2026-11-13');
assert.equal(fresh.read("getCatalogSerie('a-good-girls-guide-to-murder').seasons.find(s => s.season === 3).total"), 4);
assert.equal(fresh.read("getCatalogSerie('brain-games').seasons.find(s => s.season === 9).total"), 20);
assert.equal(fresh.read("getCatalogSerie('people-magazine-investigates').seasons.find(s => s.season === 9).episodes[13].title"), 'The University of Cosmic Intelligence Cult');
assert.equal(fresh.read("getCatalogSerie('people-magazine-investigates').seasons.find(s => s.season === 9).episodes[14].title"), 'The Cult of the Soulful Journey');
assert.equal(fresh.read("releaseEvents.some(e => /Celebrating Champions/.test(e.title))"), false);

const today = app(null, '2026-10-11T10:00:00Z');
assert.equal(today.read("availableEpisodeLimit(getCatalogSerie('the-traitors-us'), getCatalogSerie('the-traitors-us').seasons.find(s => s.season === 5))"), 5);
assert.equal(today.read('calendarUpcomingEvents(Infinity).length'), 105);
assert.equal(today.read("undatedUpcomingForFollowedSeries().some(e => e.serieId === 'dexter-resurrection')"), false);
assert.equal(today.read("ui.calendarScope = 'followed'; calendarUpcomingEvents(Infinity).length"), 0);

function available(app, id, season) {
  return app.read(`availableEpisodeLimit(getCatalogSerie('${id}'), getCatalogSerie('${id}').seasons.find(s => s.season === ${season}))`);
}
const vision = app(null, '2026-10-14T00:59:59Z');
assert.equal(available(vision, 'vision-quest', 1), 0);
vision.at('2026-10-14T01:00:00Z');
assert.equal(available(vision, 'vision-quest', 1), 2);
vision.at('2026-10-21T01:00:00Z');
assert.equal(available(vision, 'vision-quest', 1), 4);
vision.at('2026-11-04T01:59:59Z');
assert.equal(available(vision, 'vision-quest', 1), 6);
vision.at('2026-11-04T02:00:00Z');
assert.equal(available(vision, 'vision-quest', 1), 7);
assert.equal(vision.read("releaseEvents.find(e => e.serieId === 'vision-quest' && e.episode === 1).sourceKind"), 'official');
assert.equal(vision.read("releaseEvents.find(e => e.serieId === 'vision-quest' && e.episode === 2).sourceKind"), 'official');
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
assert.equal(fresh.read("catalogFilterKind(getCatalogSerie('love-is-blind-us'))"), 'airing');
fresh.at('2026-11-09T01:59:59Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 12);
fresh.at('2026-11-09T02:00:00Z');
assert.equal(available(fresh, 'love-is-blind-us', 11), 13);
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
assert.match(fresh.read("releaseStatusText(getCatalogSerie('koh-lanta'))"), /en emisión.*9\/13/);

// Una fecha sin hora no implica disponibilidad a medianoche.
fresh.at('2026-10-30T10:00:00Z');
assert.equal(available(fresh, 'dexter-resurrection', 2), 0);
fresh.at('2026-10-31T00:00:00Z');
assert.equal(available(fresh, 'dexter-resurrection', 2), 1);
assert.equal(fresh.read("serieTotals(getCatalogSerie('dexter-resurrection')).upcomingUnknownSeason"), false);
assert.equal(fresh.read("getCatalogSerie('dexter-resurrection').seasons.find(s => s.season === 2).total"), 10);

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
assert.equal(migrated.read("getSerie('ghosts-us').seasons.find(s => s.season === 6).totalKnown"), true);
assert.equal(migrated.read("getSerie('ghosts-us').seasons.find(s => s.season === 6).total"), 22);
assert.equal(migrated.read("getSerie('love-is-blind-uk').seasons.find(s => s.season === 3).watched"), 11);
assert.equal(migrated.read("ui.calendarScope = 'followed'; calendarSourceEvents().every(e => state.mySeries.some(s => s.id === e.serieId))"), true);

const reviewed = app(null, '2026-10-19T12:00:00Z');
assert.equal(reviewed.read('calendarUpcomingEvents(Infinity).length'), 95);
assert.match(reviewed.read('dataReviewSummary()'), /97 series revisadas el 29\/10\/2026.*catálogo completo/);
assert.equal(available(reviewed, 'furia', 2), 2);
assert.equal(available(reviewed, 'koh-lanta', 34), 8);
assert.equal(available(reviewed, 'the-traitors-us', 5), 6);
assert.equal(available(reviewed, 'love-is-blind-us', 11), 5);
assert.equal(reviewed.read("releaseEvents.find(e => e.serieId === 'furia' && e.season === 2 && e.episode === 8).date"), '2026-11-27');
assert.equal(reviewed.read("releaseEvents.find(e => e.serieId === 'dexter-resurrection' && e.season === 2 && e.episode === 10).date"), '2027-01-01');
assert.equal(reviewed.read("getCatalogSerie('maximum-pleasure-guaranteed').seasons.find(s => s.season === 2).total"), 0);
assert.equal(reviewed.read("catalogFilterKind(getCatalogSerie('maximum-pleasure-guaranteed'))"), 'upcoming');
assert.equal(reviewed.read("getCatalogSerie('atasco').seasons.find(s => s.season === 5).total"), 6);
assert.equal(reviewed.read("getCatalogSerie('the-four-seasons').seasons.find(s => s.season === 3).total"), 8);
assert.equal(reviewed.read("releaseEvents.filter(e => ['furia','dexter-resurrection'].includes(e.serieId) && e.season === 2 && e.sourceKind === 'provider').every(e => !e.releaseAt)"), true);

// La revisión completa incluye estrenos recientes, nuevos calendarios y sus límites de certeza.
const current = app(null, audit.snapshotAt);
assert.equal(current.read('calendarUpcomingEvents(Infinity).length'), audit.upcomingEventCount);
assert.equal(audit.upcomingEventCount, 63);
assert.equal(available(current, 'vision-quest', 1), 6);
assert.equal(available(current, 'nobody-wants-this', 3), 10);
assert.equal(available(current, 'lupin', 4), 8);
assert.equal(available(current, 'koh-lanta', 34), 10);
assert.equal(available(current, 'love-is-blind-us', 11), 11);
assert.equal(current.read("getCatalogSerie('nobody-wants-this').seasons.find(s => s.season === 3).episodes[6].title"), 'Watch What Happens');
assert.equal(current.read("getCatalogSerie('love-is-blind-us').seasons.find(s => s.season === 11).episodes[10].title"), 'If Not Now, When?');
assert.equal(current.read("releaseEvents.find(e => e.serieId === 'koh-lanta' && e.season === 34 && e.episode === 13).releaseAt"), '2026-11-17T20:10:00Z');
assert.equal(current.read("releaseEvents.filter(e => e.serieId === 'black-doves' && e.season === 2).length"), 6);
assert.equal(current.read("releaseEvents.filter(e => e.serieId === 'black-doves' && e.season === 2 && e.episode > 1).every(e => e.sourceKind === 'provider' && !e.releaseAt)"), true);
assert.equal(current.read("getCatalogSerie('the-circle-us').seasons.find(s => s.season === 8).total"), 16);
assert.match(current.read("getCatalogSerie('the-circle-us').platform"), /Hulu/);
assert.equal(current.read("releaseEvents.filter(e => e.serieId === 'the-circle-us' && e.season === 8).every(e => e.sourceKind === 'provider' && !e.releaseAt && /Hulu/.test(e.platform))"), true);
current.at('2026-11-17T12:00:00Z');
assert.equal(available(current, 'the-circle-us', 8), 0);
current.at('2026-11-17T23:00:00Z');
assert.equal(available(current, 'the-circle-us', 8), 1);
current.at('2026-12-18T23:00:00Z');
assert.equal(available(current, 'the-circle-us', 8), 16);

// Los especiales conservan su posición guardada; las fechas se asocian por título.
assert.equal(available(current, 'on-the-case-with-paula-zahn', 25), 17);
assert.equal(current.read("releaseEvents.find(e => e.serieId === 'on-the-case-with-paula-zahn' && e.season === 25 && e.episode === 5).date"), '2022-10-10');
assert.equal(current.read("releaseEvents.find(e => e.serieId === 'on-the-case-with-paula-zahn' && e.season === 25 && e.episode === 16).title"), 'Mystery in Coachella Valley');
assert.equal(current.read("getCatalogSerie('lucifer').seasons.find(s => s.season === 4).episodes.length"), 10);
const preserved = app({mySeries: [{...JSON.parse(current.read("JSON.stringify(getCatalogSerie('on-the-case-with-paula-zahn'))")), episodesPerDay: 4, seasons: [{season: 25, total: 15, watched: 15}]}], watchHistory: [{serieId: 'on-the-case-with-paula-zahn', season: 25, watchedAt: '2026-10-20T20:00:00'}]});
assert.equal(preserved.read("getSerie('on-the-case-with-paula-zahn').seasons.find(s => s.season === 25).watched"), 15);
assert.equal(preserved.read("getSerie('on-the-case-with-paula-zahn').episodesPerDay"), 4);
assert.equal(preserved.read('state.watchHistory.length'), 1);

console.log(`OK: ${fresh.read('catalog.length')} series, calendario, horarios, estrenos progresivos y conservación del progreso.`);
