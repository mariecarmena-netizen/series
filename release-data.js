// Revisión del catálogo: 8 de octubre de 2026. Las temporadas conservan
// la numeración de la app y de las plataformas, incluidos sus especiales.
const RELEASE_REVIEW = {
  reviewedOn: "2026-10-08",
  timeZone: "Europe/Madrid",
  series: {
    "koh-lanta": {
      trackingSeason: 34,
      description: "Reality de supervivencia · TF1 / TF1+ · All Stars en emisión. La numeración incluye las ediciones especiales; el total de esta edición sigue pendiente.",
      seasons: [{season: 34, total: 9, totalKnown: false, releasedEpisodes: 7, available: true, note: "Koh-Lanta All Stars · próximas emisiones confirmadas: 13 y 20/10/2026; número total de emisiones pendiente", episodes: Array.from({length: 9}, (_, i) => `Émission ${i + 1}`)}],
      sources: [
        {label: "TF1 · emisión del 13 de octubre", url: "https://tf1pro.com/programmes/diffusion/2026-10-13-2110-koh-lanta-alls-stars-emission-8-partie-1"},
        {label: "TF1 · emisión del 20 de octubre", url: "https://tf1pro.com/programmes/diffusion/2026-10-20-2110-koh-lanta-emission-9-partie-1"}
      ]
    },
    "big-brother-us": {
      trackingSeason: 28,
      renewalNote: "Temporadas 29 y 30 confirmadas · fechas pendientes",
      description: "Reality de competición · CBS / Paramount+ · temporada 28 completa desde el 01/10/2026. Sus 41 emisiones incluyen los cinco especiales Big Brother: Unlocked. Renovada hasta la temporada 30.",
      seasons: [
        {season: 28, releasedEpisodes: 41, available: true, note: "Temporada completa · 41 emisiones, incluidos cinco especiales Unlocked · final 01/10/2026"},
        {season: 29, total: 0, available: false, releasedEpisodes: 0, note: "Renovada para el verano de 2027 · fecha exacta y emisiones pendientes"},
        {season: 30, total: 0, available: false, releasedEpisodes: 0, note: "Renovada para el verano de 2028 · fecha exacta y emisiones pendientes"}
      ],
      sources: [{label: "CBS · final y renovación hasta la temporada 30", url: "https://www.paramountpressexpress.com/cbs-entertainment/shows/big-brother/releases/?view=113353-big-brother-crowns-its-season-28-winner-and-announces-renewal-through-season-30-in-tonights-live-finale"}, {label: "CBS · 41 emisiones con los especiales", url: "https://www.cbs.com/shows/video/ALVE01KV9H9F4REX5SESVBX97DSCQA/?p=1"}]
    },
    "wednesday": {
      status: "Temporada 3 rodada · rodaje terminado el 30/09/2026 · fecha de estreno pendiente",
      seasons: [{season: 3, note: "Rodaje terminado el 30/09/2026 · fecha de estreno y capítulos sin anunciar"}],
      sources: [{label: "Netflix · fin del rodaje de la temporada 3", url: "https://www.netflix.com/tudum/articles/wednesday-season-3-release-date"}]
    },
    "love-is-blind-us": {
      trackingSeason: 11,
      description: "Reality de citas · Netflix · temporada 11 en Boston. Estreno por tandas: capítulos 1–5 el 14/10, 6–8 el 21/10, 9–11 el 28/10 y capítulo 12 el 04/11/2026.",
      seasons: [{season: 11, total: 12, totalKnown: true, available: false, releasedEpisodes: 0, episodes: Array.from({length: 12}, (_, i) => `Episodio ${i + 1} · título pendiente`), note: "Boston · 12 capítulos confirmados · estreno 14/10/2026 · última tanda 04/11/2026"}],
      sources: [{label: "Netflix · calendario oficial de la temporada 11", url: "https://www.netflix.com/tudum/articles/love-is-blind-season-11-release-date-news"}]
    },
    "the-traitors-us": {
      trackingSeason: 5,
      renewalNote: "Edición con famosos prevista para 2027 · fecha pendiente",
      description: "Reality de estrategia · NBC / Peacock · New Blood tiene participantes no famosos. Emisión los jueves a las 20:00 de Nueva York, de madrugada del viernes en Madrid; disponible en Peacock al día siguiente de NBC.",
      seasons: [{season: 5, note: "New Blood · NBC: jueves 20:00 ET; Peacock: viernes · pausa 01/10 · final doble 19/11 en Estados Unidos, madrugada del 20/11 en Madrid", episodes: ["A New Dawn Is Rising", "I'm a Sweaty Boy", "The Traitors Are Watching", "The Death Parade", "Wake of the Living Dead", "A Murder of Necessity", "Episodio 7 · título pendiente", "Episodio 8 · título pendiente", "Episodio 9 · título pendiente", "Episodio 10 · título pendiente", "Episodio 11 · título pendiente", "Episodio 12 · título pendiente"]}],
      sources: [{label: "NBCUniversal · emisión y disponibilidad en Peacock", url: "https://www.nbcuniversal.com/article/traitors-new-blood-expands-traitors-fandom-nbc-viewers"}, {label: "TVmaze · calendario de New Blood", url: "https://www.tvmaze.com/shows/58177/the-traitors/episodes"}]
    },
    "lupin": {
      trackingSeason: 4,
      sources: [{label: "Netflix · ocho capítulos el 23 de octubre", url: "https://www.netflix.com/tudum/articles/lupin-part-4-release-date-photos-news"}, {label: "Netflix · hora habitual de los estrenos originales", url: "https://help.netflix.com/es-es/node/118959"}]
    },
    "dexter-resurrection": {
      trackingSeason: 2,
      renewalNote: "Fecha de SkyShowtime en España pendiente",
      seasons: [{season: 2, total: 1, totalKnown: false, episodes: ["Estreno de la temporada 2 · título pendiente"], note: "Estreno confirmado: 30/10/2026 en Paramount+ (Estados Unidos) · total de capítulos y fecha de SkyShowtime en España pendientes"}],
      sources: [{label: "Paramount+ · estreno de la temporada 2", url: "https://www.paramountplus.com/sneak-peak/dexter-resurrection-season-2-everything-you-need-to-know/"}]
    },
    "only-murders-in-the-building": {
      trackingSeason: 6,
      seasons: [{season: 6, total: 1, totalKnown: false, episodes: ["Only Murders in London · título pendiente"], note: "Estreno anunciado: 08/12/2026 en Hulu y Disney+ · resto del calendario y total de capítulos pendientes"}],
      sources: [{label: "Anuncio de estreno de Hulu y Disney+", url: "https://www.techradar.com/streaming/hulu/only-murders-in-the-building-season-6-confirms-long-awaited-release-date-but-i-already-think-one-drastic-change-is-going-to-wear-thin-very-quickly"}]
    },
    "ghosts-us": {
      trackingSeason: 6,
      renewalNote: "Emisión regular prevista para 2027 · fecha pendiente",
      seasons: [{season: 6, total: 4, totalKnown: false, episodes: ["Halloween 6: The Mirror - Part One", "Halloween 6: The Mirror - Part Two", "Ghostsmas · primera parte (título pendiente)", "Ghostsmas · segunda parte (título pendiente)"], note: "CBS (Estados Unidos): Halloween 29/10 y Ghostsmas 10/12 · calendario mostrado en hora de Madrid: 30/10 y 11/12 · resto de la temporada en 2027; total pendiente"}],
      sources: [{label: "CBS · especiales y regreso a mitad de temporada", url: "https://www.paramountpressexpress.com/cbs-entertainment/shows/ghosts/"}, {label: "CBS · títulos y horarios de Halloween", url: "https://www.paramountpressexpress.com/cbs-studios/shows/ghosts/episodes?limit=100&page=1"}]
    },
    "atasco": {sources: [{label: "Prime Video · quinta temporada confirmada", url: "https://www.aboutamazon.es/noticias/entretenimiento/prime-video-presenta-nuevas-producciones-originales-y-licenciadas"}]},
    "machos-alfa": {sources: [{label: "Netflix · sexta y última temporada", url: "https://about.netflix.com/es_es/news/alpha-males-films-its-sixth-and-final-season"}]},
    "a-good-girls-guide-to-murder": {sources: [{label: "Netflix · tercera y última temporada en 2027", url: "https://www.netflix.com/tudum/articles/a-good-girls-guide-to-murder-season-3-cast-release-date-news"}]},
    "a-man-on-the-inside": {sources: [{label: "Netflix · tercera y última temporada en rodaje", url: "https://www.netflix.com/tudum/articles/man-on-the-inside-season-3-cast-release-date-news"}]},
    "love-is-blind-uk": {sources: [{label: "Netflix · cuarta temporada confirmada", url: "https://www.netflix.com/tudum/articles/love-is-blind-uk-season-4-release-date-news"}]},
    "squid-game-the-challenge": {sources: [{label: "Netflix · The VIP Challenge anunciado", url: "https://www.netflix.com/tudum/articles/squid-game-the-vip-challenge-celebrities-cast"}]},
    "black-mirror": {sources: [{label: "Variety · temporada 8 en producción", url: "https://au.variety.com/2026/tv/global/netflix-black-mirror-season-8-legends-gordon-ramsay-39665/"}]},
    "the-white-lotus": {sources: [{label: "HBO · noticias de producción", url: "https://press.wbd.com/na/property/white-lotus/media-releases"}, {label: "Declaraciones de HBO · prevista para el primer semestre de 2027", url: "https://www.tvinsider.com/1162885/"}]},
    "your-friends-and-neighbors": {sources: [{label: "Apple TV · renovación de la temporada 3", url: "https://www.apple.com/tv-pr/news/2026/02/apples-hit-drama-your-friends-neighbors-starring-and-executive-produced-by-jon-hamm-lands-early-season-three-renewal/"}]},
    "margos-got-money-troubles": {sources: [{label: "Apple TV · renovación de la temporada 2", url: "https://images.apple.com/uk/tv-pr/news/2026/05/apple-tv-renews-globally-acclaimed-comedy-margos-got-money-troubles-from-multiemmy-award-winner-david-e-kelley-and-stars-and-executive-producers-elle-fanning-michelle-pfeiffer-and-nicole-kidman/"}]},
    "fargo": {sources: [{label: "Estado de renovación revisado el 7 de octubre", url: "https://tvseriesfinale.com/tv-show/fargo-season-six-has-the-fx-anthology-series-been-cancelled-or-renewed/"}]},
    "les-traitres-m6": {sources: [{label: "M6 · avance de la temporada 7, aún sin fecha", url: "https://www.ozap.com/actu/les-traitres-m6-devoile-la-toute-premiere-bande-annonce-de-la-saison-7-qui-sera-a-voir-prochainement/655910"}]},
    "l-agence-immobilier-de-luxe-en-famille": {sources: [{label: "Temporada 7 · anuncio de Valentin Kretz", url: "https://serieously.ouest-france.fr/lagence-tmc-renouvelee-pour-une-saison-7-le-gros-changement-annonce-par-valentin-kretz/"}]},
    "loups-garous-canal-plus": {sources: [{label: "Canal+ · preparación de la tercera temporada", url: "https://www.leparisien.fr/culture-loisirs/tv/on-a-deja-commence-a-travailler-sur-la-saison-3-la-recette-gagnante-de-loups-garous-sur-canal-12-02-2026-2JNFN7ZKKNBR3ANJG2KXNGQPQE.php"}]},
    "the-circle-us": {sources: [{label: "Nueva edición en Hulu · estreno pendiente", url: "https://www.tvline.com/2191703/the-circle-season-8-hulu-netflix-rule-changes-explained/"}]},
    "the-beauty": {sources: [{label: "FX · serie y episodios disponibles", url: "https://www.fxnetworks.com/shows/the-beauty"}, {label: "Estado de una segunda temporada", url: "https://thegww.com/the-beauty-season-2-cast-released/"}]}
  },
  events: [
    ...Array.from({length: 8}, (_, i) => ({serieId: "lupin", serie: "Lupin", season: 4, episode: i + 1, date: "2026-10-23", releaseAt: "2026-10-23T07:00:00Z", title: `Episodio ${i + 1} · título pendiente`, platform: "Netflix"})),
    {serieId: "koh-lanta", serie: "Koh-Lanta", season: 34, episode: 8, date: "2026-10-13", releaseAt: "2026-10-13T21:10:00+02:00", title: "Émission 8", platform: "TF1 / TF1+"},
    {serieId: "koh-lanta", serie: "Koh-Lanta", season: 34, episode: 9, date: "2026-10-20", releaseAt: "2026-10-20T21:10:00+02:00", title: "Émission 9", platform: "TF1 / TF1+"},
    ...["2026-10-14", "2026-10-14", "2026-10-14", "2026-10-14", "2026-10-14", "2026-10-21", "2026-10-21", "2026-10-21", "2026-10-28", "2026-10-28", "2026-10-28", "2026-11-04"].map((date, i) => ({serieId: "love-is-blind-us", serie: "Love Is Blind (USA)", season: 11, episode: i + 1, date, releaseAt: `${date}T${date >= "2026-11-01" ? "08" : "07"}:00:00Z`, title: i === 11 ? "Episodio 12 · última tanda" : `Episodio ${i + 1} · Boston`, platform: "Netflix"})),
    ...[
      [5, "2026-10-09T00:00:00Z", "Wake of the Living Dead"],
      [6, "2026-10-16T00:00:00Z", "A Murder of Necessity"],
      [7, "2026-10-23T00:00:00Z", "Episodio 7 · título pendiente"],
      [8, "2026-10-30T00:00:00Z", "Episodio 8 · título pendiente"],
      [9, "2026-11-06T01:00:00Z", "Episodio 9 · título pendiente"],
      [10, "2026-11-13T01:00:00Z", "Episodio 10 · título pendiente"],
      [11, "2026-11-20T01:00:00Z", "Episodio 11 · título pendiente"],
      [12, "2026-11-20T02:00:00Z", "Episodio 12 · título pendiente"]
    ].map(([episode, releaseAt, title]) => ({serieId: "the-traitors-us", serie: "The Traitors (USA)", season: 5, episode, releaseAt, date: releaseAt.slice(0, 10), title: `New Blood · ${title}`, platform: "NBC (Estados Unidos)", note: "Horario de Madrid · Peacock: al día siguiente de la emisión estadounidense"})),
    ...[
      [1, "2026-10-30T01:00:00Z", "Halloween 6: The Mirror - Part One"],
      [2, "2026-10-30T01:30:00Z", "Halloween 6: The Mirror - Part Two"],
      [3, "2026-12-11T02:00:00Z", "Ghostsmas · primera parte (título pendiente)"],
      [4, "2026-12-11T02:30:00Z", "Ghostsmas · segunda parte (título pendiente)"]
    ].map(([episode, releaseAt, title]) => ({serieId: "ghosts-us", serie: "Ghosts (US)", season: 6, episode, releaseAt, date: releaseAt.slice(0, 10), title, platform: "CBS (Estados Unidos)", note: "Horario de Madrid · fecha de disponibilidad en España pendiente"}))
  ]
};

RELEASE_REVIEW.providerSources = {
  "koh-lanta": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/17936/koh-lanta"
    }
  ],
  "secret-story": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/31287/secret-story"
    }
  ],
  "atasco": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/78649/atasco"
    }
  ],
  "muertos-sl": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/75909/muertos-sl"
    }
  ],
  "machos-alfa": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/65679/machos-alfa"
    }
  ],
  "maximum-pleasure-guaranteed": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/82915/maximum-pleasure-guaranteed"
    }
  ],
  "lethally-blonde": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/75592/lethally-blonde"
    }
  ],
  "deadly-influence": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/77552/deadly-influence-the-social-media-murders"
    }
  ],
  "a-good-girls-guide-to-murder": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/63949/a-good-girls-guide-to-murder"
    }
  ],
  "dynasty-2017": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/21656/dynasty"
    }
  ],
  "hacks": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/54914/hacks"
    }
  ],
  "stranger-things": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/2993/stranger-things"
    }
  ],
  "brain-games": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/3209/brain-games"
    }
  ],
  "section-de-recherches": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/6214/section-de-recherches"
    }
  ],
  "lucifer": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/1859/lucifer"
    }
  ],
  "see-no-evil": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/1559/see-no-evil"
    }
  ],
  "on-the-case-with-paula-zahn": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/4438/on-the-case-with-paula-zahn"
    }
  ],
  "homicide-hunter-american-detective": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/52817/homicide-hunter-american-detective"
    }
  ],
  "loot": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/60527/loot"
    }
  ],
  "people-magazine-investigates": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/22247/people-magazine-investigates"
    }
  ],
  "a-man-on-the-inside": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/74443/a-man-on-the-inside"
    }
  ],
  "big-brother-us": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/1453/big-brother"
    }
  ],
  "poker-face-2023": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/54128/poker-face"
    }
  ],
  "upload": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/31732/upload"
    }
  ],
  "wednesday": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/53647/wednesday"
    }
  ],
  "malcolm-in-the-middle": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/568/malcolm-in-the-middle"
    }
  ],
  "malcolm-lifes-still-unfair": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/90782/malcolm-in-the-middle-lifes-still-unfair"
    }
  ],
  "modern-family": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/80/modern-family"
    }
  ],
  "como-conoci-a-vuestra-madre": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/171/how-i-met-your-mother"
    }
  ],
  "love-is-blind-us": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/46167/love-is-blind"
    }
  ],
  "love-is-blind-uk": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/66877/love-is-blind-uk"
    }
  ],
  "love-is-blind-france": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/85871/pour-le-meilleur-et-a-laveugle"
    }
  ],
  "the-traitors-us": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/58177/the-traitors"
    }
  ],
  "the-ultimatum-marry-or-move-on-us": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/60873/the-ultimatum-marry-or-move-on"
    }
  ],
  "the-ultimatum-france": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/66097/ultimatum-on-se-marie-ou-cest-fini"
    }
  ],
  "perfect-match": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/66503/perfect-match"
    }
  ],
  "recale": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/83620/recale"
    }
  ],
  "mean-girl-murders": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/67016/mean-girl-murders"
    }
  ],
  "american-monster": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/17890/american-monster"
    }
  ],
  "criminal-confessions": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/28136/criminal-confessions"
    }
  ],
  "severance": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/44933/severance"
    }
  ],
  "big-little-lies": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/3080/big-little-lies"
    }
  ],
  "josephine-ange-gardien": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/53531/josephine-ange-gardien"
    }
  ],
  "camping-paradis": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/41517/camping-paradis"
    }
  ],
  "csi-miami": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/576/csi-miami"
    }
  ],
  "the-green-glove-gang": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/64287/gang-zielonej-rekawiczki"
    }
  ],
  "loki": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/41007/loki"
    }
  ],
  "the-beauty": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/79916/the-beauty"
    }
  ],
  "grotesquerie": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/74952/grotesquerie"
    }
  ],
  "squid-game": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/43687/squid-game"
    }
  ],
  "squid-game-the-challenge": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/62538/squid-game-the-challenge"
    }
  ],
  "lupin": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/50701/lupin"
    }
  ],
  "black-mirror": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/305/black-mirror"
    }
  ],
  "westworld": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/1371/westworld"
    }
  ],
  "the-white-lotus": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/51394/the-white-lotus"
    }
  ],
  "only-murders-in-the-building": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/48830/only-murders-in-the-building"
    }
  ],
  "dexter": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/161/dexter"
    }
  ],
  "dexter-new-blood": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/58846/dexter-new-blood"
    }
  ],
  "dexter-resurrection": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/78665/dexter-resurrection"
    }
  ],
  "scream-queens": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/1862/scream-queens"
    }
  ],
  "loups-garous-canal-plus": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/80116/loups-garous"
    }
  ],
  "celebrity-hunted-france": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/58429/celebrity-hunted-chasse-a-lhomme"
    }
  ],
  "les-traitres-m6": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/70731/les-traitres-seront-ils-demasques"
    }
  ],
  "fargo": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/32/fargo"
    }
  ],
  "ghosts-us": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/46573/ghosts"
    }
  ],
  "travelers-2016": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/15996/travelers"
    }
  ],
  "space-force": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/40445/space-force"
    }
  ],
  "en-place": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/66088/en-place"
    }
  ],
  "your-friends-and-neighbors": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/73484/your-friends-neighbors"
    }
  ],
  "l-agence-immobilier-de-luxe-en-famille": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/55852/lagence-limmobilier-de-luxe-en-famille"
    }
  ],
  "schitts-creek": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/1775/schitts-creek"
    }
  ],
  "the-circle-us": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/45419/the-circle"
    }
  ],
  "summertime": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/46660/summertime"
    }
  ],
  "margos-got-money-troubles": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/74442/margos-got-money-troubles"
    }
  ],
  "what-we-do-in-the-shadows": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/34522/what-we-do-in-the-shadows"
    }
  ],
  "rooster": [
    {
      "label": "TVmaze · ficha y emisiones registradas",
      "url": "https://www.tvmaze.com/shows/88862/rooster"
    }
  ]
};
