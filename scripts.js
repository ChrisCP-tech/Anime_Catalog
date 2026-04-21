/**
 * Anime Catalog - SEA Stage 2 Project
 *
 * Data source: MyAnimeList (myanimelist.net), retrieved via the
 * Jikan public REST API (jikan.moe). All scores, episodes, studios,
 * and genres are real, publicly available information.
 *
 * Data operations:
 *   1. Live Search  — filters cards by title as the user types
 *   2. Genre Filter — shows only anime that belong to a selected genre
 *   3. Sort         — reorders cards by score, year, episode count, or title
 *
 * All three filters work together through applyFilters().
 */

// ─── Dataset ────────────────────────────────────────────────────────────────

const animeData = [
  {
    title: "Sousou no Frieren",
    studio: "Madhouse",
    genres: ["Adventure", "Drama", "Fantasy"],
    episodes: 28,
    year: 2023,
    score: 9.27,
    synopsis: "A decade after defeating the Demon King, the elven mage Frieren reflects on the fleeting lives of her human companions and embarks on a new journey to understand humanity.",
    image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    studio: "Bones",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    episodes: 64,
    year: 2009,
    score: 9.11,
    synopsis: "After a failed alchemical ritual leaves them scarred, brothers Edward and Alphonse Elric search for the Philosopher's Stone to restore their bodies.",
    image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg"
  },
  {
    title: "Steins;Gate",
    studio: "White Fox",
    genres: ["Drama", "Sci-Fi", "Suspense"],
    episodes: 24,
    year: 2011,
    score: 9.07,
    synopsis: "Self-proclaimed scientist Rintarou Okabe accidentally discovers time travel and must navigate its devastating consequences to save the people he cares about.",
    image: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
  },
  {
    title: "Gintama°",
    studio: "Bandai Namco Pictures",
    genres: ["Action", "Comedy", "Sci-Fi"],
    episodes: 51,
    year: 2015,
    score: 9.05,
    synopsis: "Gintoki, Shinpachi, and Kagura return as the fun-loving but broke members of the Yorozuya team in an alternate-reality Edo ruled by alien overlords.",
    image: "https://cdn.myanimelist.net/images/anime/3/72078.jpg"
  },
  {
    title: "Attack on Titan Season 3 Part 2",
    studio: "Wit Studio",
    genres: ["Action", "Drama", "Suspense"],
    episodes: 10,
    year: 2019,
    score: 9.05,
    synopsis: "The Survey Corps launches a desperate assault to retake Wall Maria, uncovering earth-shattering truths about Titans and humanity's hidden history.",
    image: "https://cdn.myanimelist.net/images/anime/1517/100633.jpg"
  },
  {
    title: "Hunter x Hunter (2011)",
    studio: "Madhouse",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 148,
    year: 2011,
    score: 9.03,
    synopsis: "Young Gon Freecss sets out to become a Hunter to find his absent father, forging powerful bonds and facing extraordinary challenges across the world.",
    image: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg"
  },
  {
    title: "Vinland Saga Season 2",
    studio: "MAPPA",
    genres: ["Action", "Adventure", "Drama"],
    episodes: 24,
    year: 2023,
    score: 9.01,
    synopsis: "After years of violence, Thorfinn is enslaved on a farm in England and begins a painful journey toward discovering what it truly means to live without war.",
    image: "https://cdn.myanimelist.net/images/anime/1170/124312.jpg"
  },
  {
    title: "Mob Psycho 100 II",
    studio: "Bones",
    genres: ["Action", "Comedy", "Supernatural"],
    episodes: 13,
    year: 2019,
    score: 8.95,
    synopsis: "Shigeo 'Mob' Kageyama continues suppressing his overwhelming psychic powers while striving to grow as a person and protect the people who matter to him.",
    image: "https://myanimelist.net/images/anime/1918/96303l.jpg"
  },
  {
    title: "Bleach: Thousand-Year Blood War",
    studio: "Studio Pierrot",
    genres: ["Action", "Adventure", "Supernatural"],
    episodes: 13,
    year: 2022,
    score: 8.98,
    synopsis: "Soul Reaper Ichigo Kurosaki faces the Quincy empire's all-out war against the Soul Society in this long-awaited adaptation of Bleach's final arc.",
    image: "https://cdn.myanimelist.net/images/anime/1908/135431.jpg"
  },
  {
    title: "Kaguya-sama: Love is War Ultra Romantic",
    studio: "A-1 Pictures",
    genres: ["Comedy", "Romance"],
    episodes: 13,
    year: 2022,
    score: 8.96,
    synopsis: "Student council president Miyuki and vice-president Kaguya wage an escalating war of psychological tactics, each refusing to be the first to confess their love.",
    image: "https://cdn.myanimelist.net/images/anime/1160/122627.jpg"
  },
  {
    title: "Code Geass: Lelouch of the Rebellion R2",
    studio: "Sunrise",
    genres: ["Drama", "Sci-Fi"],
    episodes: 25,
    year: 2008,
    score: 8.92,
    synopsis: "The exiled prince Lelouch wages a final campaign against the Holy Britannian Empire with shocking and irreversible sacrifices.",
    image: "https://cdn.myanimelist.net/images/anime/1088/135089.jpg"
  },
  {
    title: "Fruits Basket: The Final",
    studio: "TMS Entertainment",
    genres: ["Drama", "Romance", "Supernatural"],
    episodes: 13,
    year: 2021,
    score: 8.93,
    synopsis: "Tohru Honda races to break the Souma family's ancient zodiac curse before she loses the people she has come to love in this deeply emotional conclusion.",
    image: "https://cdn.myanimelist.net/images/anime/1085/114792.jpg"
  },
  {
    title: "Clannad: After Story",
    studio: "Kyoto Animation",
    genres: ["Drama", "Romance"],
    episodes: 24,
    year: 2008,
    score: 8.93,
    synopsis: "Following high school, Tomoya and Nagisa navigate the joys and heartbreaks of adult life together in one of anime's most emotionally powerful stories.",
    image: "https://cdn.myanimelist.net/images/anime/1299/110774.jpg"
  },
  {
    title: "Monster",
    studio: "Madhouse",
    genres: ["Drama", "Mystery", "Suspense"],
    episodes: 74,
    year: 2004,
    score: 8.89,
    synopsis: "Elite surgeon Dr. Tenma saves a boy's life and later discovers the child has become a serial killer, sending Tenma on a dangerous chase across Europe.",
    image: "https://cdn.myanimelist.net/images/anime/10/18793.jpg"
  },
  {
    title: "Kusuriya no Hitorigoto",
    studio: "OLM",
    genres: ["Drama", "Mystery"],
    episodes: 24,
    year: 2023,
    score: 8.85,
    synopsis: "Maomao, an apothecary's daughter sold into the imperial court, uses her knowledge of medicine and poisons to solve the palace's deadly secrets.",
    image: "https://cdn.myanimelist.net/images/anime/1708/138033.jpg"
  },
  {
    title: "3-gatsu no Lion 2nd Season",
    studio: "Shaft",
    genres: ["Drama"],
    episodes: 22,
    year: 2017,
    score: 8.90,
    synopsis: "Teen shogi prodigy Rei Kiriyama pushes forward in the professional world while slowly healing emotionally through the warmth of a caring family.",
    image: "https://cdn.myanimelist.net/images/anime/3/88469.jpg"
  },
  {
    title: "Kingdom 3rd Season",
    studio: "Signpost",
    genres: ["Action", "Adventure", "Drama"],
    episodes: 26,
    year: 2020,
    score: 8.83,
    synopsis: "Young general Shin and King Zheng of Qin press their ambition to unify China, facing their most devastating battles yet on the path to supremacy.",
    image: "https://cdn.myanimelist.net/images/anime/1443/111830.jpg"
  },
  {
    title: "Haikyuu!! To the Top",
    studio: "Production I.G",
    genres: ["Sports", "Drama", "Comedy"],
    episodes: 25,
    year: 2020,
    score: 8.78,
    synopsis: "The Karasuno High volleyball team trains intensely for the Spring Tournament, with ace hopeful Hinata attending a grueling special training camp.",
    image: "https://cdn.myanimelist.net/images/anime/1767/92553.jpg"
  },
  {
    title: "Your Lie in April",
    studio: "A-1 Pictures",
    genres: ["Drama", "Music", "Romance"],
    episodes: 22,
    year: 2014,
    score: 8.69,
    synopsis: "Piano prodigy Kousei, who lost the ability to hear his own playing after trauma, is reawakened by the free-spirited and vibrant violinist Kaori Miyazono.",
    image: "https://cdn.myanimelist.net/images/anime/3/67177.jpg"
  },
  {
    title: "Violet Evergarden",
    studio: "Kyoto Animation",
    genres: ["Drama", "Fantasy"],
    episodes: 13,
    year: 2018,
    score: 8.64,
    synopsis: "Former child soldier Violet Evergarden becomes a letter writer for hire as she works to understand the final words her major left her.",
    image: "https://cdn.myanimelist.net/images/anime/1795/95329.jpg"
  },
  {
    title: "Death Note",
    studio: "Madhouse",
    genres: ["Mystery", "Psychological", "Supernatural", "Suspense"],
    episodes: 37,
    year: 2006,
    score: 8.62,
    synopsis: "Genius student Light Yagami finds a supernatural notebook that kills anyone whose name is written in it, sparking a deadly cat-and-mouse game with the world's top detective.",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg"
  },
  {
    title: "Jujutsu Kaisen",
    studio: "MAPPA",
    genres: ["Action", "Fantasy", "Supernatural"],
    episodes: 24,
    year: 2020,
    score: 8.64,
    synopsis: "High schooler Yuji Itadori swallows a cursed finger to save his friends, becoming the vessel of the powerful Curse Sukuna and joining a secret school of sorcerers.",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
  },
  {
    title: "Demon Slayer: Kimetsu no Yaiba",
    studio: "ufotable",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 26,
    year: 2019,
    score: 8.44,
    synopsis: "After his family is slaughtered and his sister Nezuko is turned into a demon, Tanjiro Kamado becomes a Demon Slayer vowing to find a cure.",
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
  },
  {
    title: "Attack on Titan: The Final Season",
    studio: "MAPPA",
    genres: ["Action", "Drama", "Suspense"],
    episodes: 16,
    year: 2021,
    score: 8.79,
    synopsis: "Gabi Braun and Falco Grice train to inherit Titan powers under Marley's control, unaware of the storm building across the sea.",
    image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg"
  },
  {
    title: "Vinland Saga",
    studio: "Wit Studio",
    genres: ["Action", "Adventure", "Drama"],
    episodes: 24,
    year: 2019,
    score: 8.78,
    synopsis: "Young Thorfinn dreams of Vinland, but after his father is killed he is consumed by a thirst for revenge against the mercenary leader Askeladd.",
    image: "https://cdn.myanimelist.net/images/anime/1500/103005.jpg"
  },
  {
    title: "Hajime no Ippo",
    studio: "Madhouse",
    genres: ["Sports", "Comedy", "Drama"],
    episodes: 75,
    year: 2000,
    score: 8.78,
    synopsis: "Timid teenager Ippo Makunouchi is saved from bullies by pro boxer Mamoru Takamura and discovers an unexpected talent that sets him on the path to the Japanese featherweight championship.",
    image: "https://cdn.myanimelist.net/images/anime/4/86334.jpg"
  },
  {
    title: "Haikyuu!! vs Shiratorizawa",
    studio: "Production I.G",
    genres: ["Sports", "Drama"],
    episodes: 10,
    year: 2016,
    score: 8.77,
    synopsis: "Karasuno High battles powerhouse Shiratorizawa Academy in a winner-takes-all match to claim the prefecture title and a spot at nationals.",
    image: "https://cdn.myanimelist.net/images/anime/7/81992.jpg"
  },
  {
    title: "Attack on Titan: The Final Season Part 2",
    studio: "MAPPA",
    genres: ["Action", "Drama", "Suspense"],
    episodes: 12,
    year: 2022,
    score: 8.77,
    synopsis: "Turning against former allies and enemies alike, Eren Yeager sets a catastrophic plan in motion — the Rumbling — that will shake the entire world.",
    image: "https://cdn.myanimelist.net/images/anime/1948/120625.jpg"
  },
  {
    title: "Cowboy Bebop",
    studio: "Sunrise",
    genres: ["Action", "Sci-Fi"],
    episodes: 26,
    year: 1998,
    score: 8.75,
    synopsis: "In 2071, bounty hunters Spike Spiegel and Jet Black cruise the solar system aboard the Bebop, chasing criminals while running from their own haunted pasts.",
    image: "https://cdn.myanimelist.net/images/anime/4/19644.jpg"
  },
  {
    title: "Bocchi the Rock!",
    studio: "CloverWorks",
    genres: ["Comedy", "Music"],
    episodes: 12,
    year: 2022,
    score: 8.73,
    synopsis: "Severely socially anxious Hitori 'Bocchi' Gotou dreams of making friends through music and gets her chance when she joins the school band Kessoku Band.",
    image: "https://cdn.myanimelist.net/images/anime/1448/127956.jpg"
  },
  {
    title: "Jujutsu Kaisen 2nd Season",
    studio: "MAPPA",
    genres: ["Action", "Supernatural"],
    episodes: 23,
    year: 2023,
    score: 8.71,
    synopsis: "The Hidden Inventory arc reveals the past of Satoru Gojo and Suguru Getou, before the explosive Shibuya Incident plunges the jujutsu world into chaos.",
    image: "https://cdn.myanimelist.net/images/anime/1792/138022.jpg"
  },
  {
    title: "Code Geass: Lelouch of the Rebellion",
    studio: "Sunrise",
    genres: ["Action", "Drama", "Sci-Fi"],
    episodes: 25,
    year: 2006,
    score: 8.71,
    synopsis: "Exiled prince Lelouch Lamperouge gains the power of absolute command and uses it to wage a secret rebellion against the empire that destroyed his family.",
    image: "https://cdn.myanimelist.net/images/anime/1032/135088.jpg"
  },
  {
    title: "Demon Slayer: Entertainment District Arc",
    studio: "ufotable",
    genres: ["Action", "Fantasy", "Supernatural"],
    episodes: 11,
    year: 2022,
    score: 8.70,
    synopsis: "Tanjiro and his friends accompany the Sound Hashira Tengen Uzui into the Yoshiwara Entertainment District to hunt an Upper Rank demon lurking in the shadows.",
    image: "https://cdn.myanimelist.net/images/anime/1908/120036.jpg"
  },
  {
    title: "Tengen Toppa Gurren Lagann",
    studio: "Gainax",
    genres: ["Action", "Adventure", "Sci-Fi"],
    episodes: 27,
    year: 2007,
    score: 8.64,
    synopsis: "Underground-dwelling Simon and the fearless Kamina break to the surface and pilot a giant mecha in humanity's fight against beastmen who have subjugated them for generations.",
    image: "https://cdn.myanimelist.net/images/anime/4/5123.jpg"
  },
  {
    title: "Mushishi",
    studio: "Artland",
    genres: ["Adventure", "Mystery", "Slice of Life", "Supernatural"],
    episodes: 26,
    year: 2005,
    score: 8.65,
    synopsis: "Ginko travels the land studying Mushi — primal supernatural beings that interact with the living world in ways both wondrous and dangerous.",
    image: "https://cdn.myanimelist.net/images/anime/2/73862.jpg"
  },
  {
    title: "Made in Abyss",
    studio: "Kinema Citrus",
    genres: ["Adventure", "Drama", "Fantasy", "Mystery", "Sci-Fi"],
    episodes: 13,
    year: 2017,
    score: 8.62,
    synopsis: "Orphan Riko descends into the mysterious and perilous Abyss alongside robot boy Reg, chasing rumors that her legendary mother may still be alive somewhere deep below.",
    image: "https://cdn.myanimelist.net/images/anime/6/86733.jpg"
  },
  {
    title: "Odd Taxi",
    studio: "OLM",
    genres: ["Drama", "Mystery", "Suspense"],
    episodes: 13,
    year: 2021,
    score: 8.63,
    synopsis: "Blunt walrus taxi driver Hiroshi Odokawa slowly finds himself at the center of a missing-girl case and a criminal conspiracy involving his unusual passengers.",
    image: "https://cdn.myanimelist.net/images/anime/1981/113348.jpg"
  },
  {
    title: "Great Teacher Onizuka",
    studio: "Studio Pierrot",
    genres: ["Comedy", "Drama"],
    episodes: 43,
    year: 1999,
    score: 8.68,
    synopsis: "Former biker gang leader Eikichi Onizuka becomes a high school teacher with unorthodox methods that genuinely change his students' lives.",
    image: "https://cdn.myanimelist.net/images/anime/13/11460.jpg"
  },
  {
    title: "Mob Psycho 100 III",
    studio: "Bones",
    genres: ["Action", "Comedy", "Supernatural"],
    episodes: 12,
    year: 2022,
    score: 8.72,
    synopsis: "After foiling a world-threatening plot, Shigeo 'Mob' Kageyama returns to tackle the more exhausting aspects of his mundane daily life.",
    image: "https://cdn.myanimelist.net/images/anime/1228/125011.jpg"
  },
  {
    title: "Nana",
    studio: "Madhouse",
    genres: ["Drama", "Romance"],
    episodes: 47,
    year: 2006,
    score: 8.57,
    synopsis: "Two young women named Nana are brought together pursuing new beginnings in Tokyo — one dreams of blissful love, the other aims for music stardom.",
    image: "https://cdn.myanimelist.net/images/anime/2/11232.jpg"
  },
  {
    title: "Haikyuu!! To the Top Part 2",
    studio: "Production I.G",
    genres: ["Sports"],
    episodes: 12,
    year: 2020,
    score: 8.56,
    synopsis: "Karasuno faces their toughest opponent yet at nationals — the runners-up of the last Spring Tournament, the powerful Inarizaki High School.",
    image: "https://cdn.myanimelist.net/images/anime/1453/106768.jpg"
  },
  {
    title: "Steins;Gate 0",
    studio: "White Fox",
    genres: ["Drama", "Sci-Fi", "Suspense"],
    episodes: 23,
    year: 2018,
    score: 8.55,
    synopsis: "Traumatized after failing to rescue Makise Kurisu, Okabe meets an AI storing her memories and faces the terrifying consequences of the timeline he abandoned.",
    image: "https://cdn.myanimelist.net/images/anime/1375/93521.jpg"
  },
  {
    title: "Ore dake Level Up na Ken Season 2",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 13,
    year: 2025,
    score: 8.55,
    synopsis: "Sung Jin-Woo grows ever stronger with supernatural powers, but keeping his abilities hidden becomes impossible as dangerous dungeon incidents pile up around him.",
    image: "https://cdn.myanimelist.net/images/anime/1448/147351.jpg"
  },
  {
    title: "Fate/Zero 2nd Season",
    studio: "ufotable",
    genres: ["Action", "Fantasy"],
    episodes: 12,
    year: 2012,
    score: 8.54,
    synopsis: "As the Fourth Holy Grail War reaches its climax, the remaining Servants and Masters face an impending threat that could unravel the entire war.",
    image: "https://cdn.myanimelist.net/images/anime/1522/117645.jpg"
  },
  {
    title: "Samurai Champloo",
    studio: "Manglobe",
    genres: ["Action", "Adventure", "Comedy"],
    episodes: 26,
    year: 2004,
    score: 8.52,
    synopsis: "Waitress Fuu Kasumi hires two wildly different swordsmen — the erratic Mugen and disciplined Jin — to help her search for a mysterious samurai who smells of sunflowers.",
    image: "https://cdn.myanimelist.net/images/anime/1370/135212.jpg"
  },
  {
    title: "[Oshi no Ko]",
    studio: "Doga Kobo",
    genres: ["Award Winning", "Drama"],
    episodes: 11,
    year: 2023,
    score: 8.53,
    synopsis: "In the entertainment world, celebrities conceal their true selves beneath elaborate lies — a story about idols, reincarnation, and the dark side of the spotlight.",
    image: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg"
  },
  {
    title: "Ansatsu Kyoushitsu 2nd Season",
    studio: "Lerche",
    genres: ["Action", "Comedy"],
    episodes: 25,
    year: 2016,
    score: 8.47,
    synopsis: "Returning from summer vacation, the students of Class 3-E must devise increasingly elaborate plans to assassinate their tentacle teacher before the year ends.",
    image: "https://cdn.myanimelist.net/images/anime/8/77966.jpg"
  },
  {
    title: "Nichijou",
    studio: "Kyoto Animation",
    genres: ["Comedy"],
    episodes: 26,
    year: 2011,
    score: 8.47,
    synopsis: "Everyday life in a small town gets hilariously surreal as childhood friends Mio, Yuuko, and Mai cross paths with a genius inventor, her robot, and a talking cat.",
    image: "https://cdn.myanimelist.net/images/anime/3/75617.jpg"
  },
  {
    title: "Summertime Render",
    studio: "OLM",
    genres: ["Mystery", "Supernatural", "Suspense"],
    episodes: 25,
    year: 2022,
    score: 8.46,
    synopsis: "Shinpei returns to his island hometown after his childhood friend drowns, only to discover sinister supernatural forces and find himself trapped in a deadly time loop.",
    image: "https://cdn.myanimelist.net/images/anime/1120/120796.jpg"
  },
  {
    title: "Banana Fish",
    studio: "MAPPA",
    genres: ["Action", "Adventure", "Drama", "Suspense"],
    episodes: 24,
    year: 2018,
    score: 8.45,
    synopsis: "Street gang boss Ash Lynx, raised by the New York mafia, investigates the mysterious drug 'Banana Fish' while forming an unexpected bond with Japanese photographer Eiji.",
    image: "https://cdn.myanimelist.net/images/anime/1190/93472.jpg"
  },
  {
    title: "Grand Blue",
    studio: "Zero-G",
    genres: ["Comedy"],
    episodes: 12,
    year: 2018,
    score: 8.45,
    synopsis: "College freshman Iori Kitahara moves to a coastal town expecting an ideal student life, but is immediately absorbed into the chaotic, alcohol-fueled antics of the Diving Club.",
    image: "https://cdn.myanimelist.net/images/anime/1302/94882.jpg"
  },
  {
    title: "Demon Slayer: Swordsmith Village Arc",
    studio: "ufotable",
    genres: ["Action", "Supernatural"],
    episodes: 11,
    year: 2023,
    score: 8.15,
    synopsis: "Tanjiro travels to the secret Swordsmith Village to get his blade repaired, only to discover Upper Rank demons have already found the location.",
    image: "https://cdn.myanimelist.net/images/anime/1765/135099.jpg"
  },
  {
    title: "Demon Slayer: Mugen Train Arc",
    studio: "ufotable",
    genres: ["Action", "Supernatural"],
    episodes: 7,
    year: 2021,
    score: 8.34,
    synopsis: "Tanjiro and companions board the Mugen Train to investigate disappearances, coming face-to-face with the terrifying Upper Rank demon Enmu.",
    image: "https://cdn.myanimelist.net/images/anime/1065/118763.jpg"
  },
  {
    title: "Re:Zero Season 2 Part 2",
    studio: "White Fox",
    genres: ["Drama", "Fantasy", "Suspense"],
    episodes: 12,
    year: 2021,
    score: 8.42,
    synopsis: "Sworn to save everyone, Subaru Natsuki works to help Emilia overcome her past while uncovering the truth about the Witch of Envy who haunts them.",
    image: "https://cdn.myanimelist.net/images/anime/1724/117421.jpg"
  },
  {
    title: "Dandadan",
    studio: "Science SARU",
    genres: ["Action", "Comedy", "Supernatural"],
    episodes: 12,
    year: 2024,
    score: 8.42,
    synopsis: "Momo Ayase believes in the supernatural while Ken Takakura is obsessed with aliens — after an otherworldly encounter, they must team up against forces from both worlds.",
    image: "https://cdn.myanimelist.net/images/anime/1584/143719.jpg"
  },
  {
    title: "Fumetsu no Anata e",
    studio: "Brain's Base",
    genres: ["Adventure", "Drama", "Supernatural"],
    episodes: 20,
    year: 2021,
    score: 8.35,
    synopsis: "An immortal being cast to Earth takes the forms of things it encounters — rock, moss, wolf, then human — and slowly begins to understand life and loss.",
    image: "https://cdn.myanimelist.net/images/anime/1880/118484.jpg"
  },
  {
    title: "86",
    studio: "A-1 Pictures",
    genres: ["Drama", "Sci-Fi"],
    episodes: 11,
    year: 2021,
    score: 8.35,
    synopsis: "The Republic claims their war has no casualties — while a secret eighty-sixth faction fights and dies, piloting unmanned weapons no one admits exist.",
    image: "https://cdn.myanimelist.net/images/anime/1987/117507.jpg"
  },
  {
    title: "Baccano!",
    studio: "Brain's Base",
    genres: ["Action", "Mystery", "Supernatural"],
    episodes: 13,
    year: 2007,
    score: 8.35,
    synopsis: "In 1930s Chicago, a transcontinental train journey becomes legendary as immortal alchemists, mobsters, and thieves cross paths in a story told out of sequence.",
    image: "https://cdn.myanimelist.net/images/anime/3/14547.jpg"
  },
  {
    title: "Tensei shitara Slime Datta Ken 2nd Season",
    studio: "8bit",
    genres: ["Action", "Comedy", "Fantasy"],
    episodes: 12,
    year: 2021,
    score: 8.34,
    synopsis: "The slime Rimuru Tempest returns to his kingdom just in time to navigate new alliances and face a devastating surprise attack from a neighboring nation.",
    image: "https://cdn.myanimelist.net/images/anime/1271/109841.jpg"
  },
  {
    title: "Barakamon",
    studio: "Kinema Citrus",
    genres: ["Slice of Life"],
    episodes: 12,
    year: 2014,
    score: 8.36,
    synopsis: "Narcissistic calligrapher Seishuu Handa is exiled to a rural island after punching a veteran critic — and slowly rediscovers creativity through the islanders' warmth.",
    image: "https://cdn.myanimelist.net/images/anime/1426/111248.jpg"
  },
  {
    title: "Mushoku Tensei: Isekai Ittara Honki Dasu",
    studio: "Studio Bind",
    genres: ["Adventure", "Drama", "Fantasy"],
    episodes: 11,
    year: 2021,
    score: 8.33,
    synopsis: "A 34-year-old shut-in is reborn in a fantasy world as Rudeus Greyrat and vows to live without regrets, bringing his real-world knowledge to a new life.",
    image: "https://cdn.myanimelist.net/images/anime/1530/117776.jpg"
  },
  {
    title: "Re:Zero Season 2",
    studio: "White Fox",
    genres: ["Drama", "Fantasy", "Suspense"],
    episodes: 13,
    year: 2020,
    score: 8.32,
    synopsis: "A reunion that was supposed to bring peace is shattered when Subaru and Emilia return to find Irlam village decimated by mysterious calamities.",
    image: "https://cdn.myanimelist.net/images/anime/1444/108005.jpg"
  },
  {
    title: "Bakemonogatari",
    studio: "Shaft",
    genres: ["Mystery", "Romance", "Supernatural"],
    episodes: 15,
    year: 2009,
    score: 8.32,
    synopsis: "High schooler Koyomi Araragi, a recovering vampire, uses his supernatural connections to help classmates plagued by dangerous oddities known as apparitions.",
    image: "https://cdn.myanimelist.net/images/anime/11/75274.jpg"
  },
  {
    title: "NHK ni Youkoso!",
    studio: "Gonzo",
    genres: ["Comedy", "Drama", "Romance"],
    episodes: 24,
    year: 2006,
    score: 8.32,
    synopsis: "College dropout and conspiracy theorist Tatsuhiro Satou has been a shut-in for four years — until a mysterious girl arrives claiming she can cure his hikikomori lifestyle.",
    image: "https://cdn.myanimelist.net/images/anime/3/52675.jpg"
  },
  {
    title: "Haikyuu!! Second Season",
    studio: "Production I.G",
    genres: ["Sports"],
    episodes: 25,
    year: 2015,
    score: 8.62,
    synopsis: "Karasuno aims to conquer the Spring tournament after the Inter-High and receives an invitation from rival Nekoma High for an intense training camp.",
    image: "https://cdn.myanimelist.net/images/anime/9/76662.jpg"
  },
  {
    title: "Kage no Jitsuryokusha ni Naritakute!",
    studio: "Nexus",
    genres: ["Action", "Comedy", "Fantasy"],
    episodes: 20,
    year: 2022,
    score: 8.22,
    synopsis: "Minoru Kagenou obsessively trains to become a shadow operative, and when reincarnated in a fantasy world, accidentally creates a secret organization that fights real conspiracies.",
    image: "https://cdn.myanimelist.net/images/anime/1091/128729.jpg"
  },
  {
    title: "Trigun",
    studio: "Madhouse",
    genres: ["Action", "Adventure", "Sci-Fi"],
    episodes: 26,
    year: 1998,
    score: 8.22,
    synopsis: "Vash the Stampede carries a $$60 billion bounty and a reputation for destruction — but the legend hides a surprisingly kind-hearted gunman running from a tragic past.",
    image: "https://cdn.myanimelist.net/images/anime/1130/120002.jpg"
  },
  {
    title: "Danshi Koukousei no Nichijou",
    studio: "Sunrise",
    genres: ["Comedy"],
    episodes: 12,
    year: 2012,
    score: 8.23,
    synopsis: "Three close friends at an all-boys high school fill their days with absurd imaginative adventures, awkward encounters, and the kind of nonsense only high school boys experience.",
    image: "https://cdn.myanimelist.net/images/anime/3/33257.jpg"
  },
  {
    title: "Dragon Ball Z",
    studio: "Toei Animation",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    episodes: 291,
    year: 1989,
    score: 8.21,
    synopsis: "Five years after the World Martial Arts tournament, Goku's peaceful life is shattered by the arrival of Raditz — his alien brother — kicking off a saga of ever-greater battles.",
    image: "https://cdn.myanimelist.net/images/anime/1277/142022.jpg"
  },
  {
    title: "Fruits Basket 1st Season",
    studio: "TMS Entertainment",
    genres: ["Drama", "Romance", "Supernatural"],
    episodes: 25,
    year: 2019,
    score: 8.21,
    synopsis: "Orphan Tooru Honda stumbles into the lives of the enigmatic Souma family, who transform into Chinese zodiac animals when hugged by the opposite sex.",
    image: "https://cdn.myanimelist.net/images/anime/1447/99827.jpg"
  },
  {
    title: "Magi: The Kingdom of Magic",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 25,
    year: 2013,
    score: 8.20,
    synopsis: "After their victory over Al-Thamen, Aladdin and his friends part ways as each follows their own path — Aladdin heading to the magical nation of Magnostadt.",
    image: "https://cdn.myanimelist.net/images/anime/13/55039.jpg"
  },
  {
    title: "Yahari Ore no Seishun Love Comedy wa Machigatteiru. Zoku",
    studio: "feel.",
    genres: ["Comedy", "Romance"],
    episodes: 13,
    year: 2015,
    score: 8.20,
    synopsis: "The Volunteer Service Club grows more complex as Hachiman's unconventional problem-solving methods clash with the ideals of the people he's trying to help.",
    image: "https://cdn.myanimelist.net/images/anime/11/75376.jpg"
  },
  {
    title: "Spy x Family Part 2",
    studio: "Wit Studio",
    genres: ["Action", "Comedy"],
    episodes: 13,
    year: 2022,
    score: 8.20,
    synopsis: "Operation Strix continues as Anya must befriend Damian Desmond or earn eight Stella Stars to become an Imperial Scholar and get close to her target.",
    image: "https://cdn.myanimelist.net/images/anime/1111/127508.jpg"
  },
  {
    title: "Ore dake Level Up na Ken",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 12,
    year: 2024,
    score: 8.17,
    synopsis: "Regarded as the weakest hunter, Sung Jin-Woo gains a mysterious power that lets him level up endlessly — and becomes the strongest being in a world full of monsters.",
    image: "https://cdn.myanimelist.net/images/anime/1801/142390.jpg"
  },
  {
    title: "Bakuman.",
    studio: "J.C.Staff",
    genres: ["Comedy", "Drama", "Romance"],
    episodes: 25,
    year: 2010,
    score: 8.17,
    synopsis: "Aspiring mangaka Moritaka Mashiro and writer Akito Takagi team up to create manga, chasing the dream of publication in Weekly Shonen Jump.",
    image: "https://cdn.myanimelist.net/images/anime/6/26138.jpg"
  },
  {
    title: "Ouran Koukou Host Club",
    studio: "Bones",
    genres: ["Comedy", "Romance"],
    episodes: 26,
    year: 2006,
    score: 8.16,
    synopsis: "Scholarship student Haruhi Fujioka accidentally breaks an expensive vase and must repay the debt by joining Ouran Academy's eccentric Host Club.",
    image: "https://cdn.myanimelist.net/images/anime/2/71992.jpg"
  },
  {
    title: "Blue Lock",
    studio: "8bit",
    genres: ["Sports"],
    episodes: 24,
    year: 2022,
    score: 8.12,
    synopsis: "300 top strikers are locked in a facility and forced to compete in a ruthless program designed to create Japan's first true world-class soccer ace.",
    image: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg"
  },
  {
    title: "Bungou Stray Dogs 2nd Season",
    studio: "Bones",
    genres: ["Action", "Mystery"],
    episodes: 12,
    year: 2016,
    score: 8.16,
    synopsis: "The origins of Osamu Dazai and the Armed Detective Agency are revealed as an American gifted organization called The Guild enters Yokohama seeking to take their permit.",
    image: "https://cdn.myanimelist.net/images/anime/1572/133096.jpg"
  },
  {
    title: "Dr. Stone: Stone Wars",
    studio: "TMS Entertainment",
    genres: ["Adventure", "Comedy"],
    episodes: 11,
    year: 2021,
    score: 8.15,
    synopsis: "Senkuu and his Kingdom of Science prepare for war against Tsukasa Shishiou and his Empire of Might in a battle over who has the right to rebuild civilization.",
    image: "https://cdn.myanimelist.net/images/anime/1711/110614.jpg"
  },
  {
    title: "Kimetsu no Yaiba: Hashira Training Arc",
    studio: "ufotable",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 55,
    year: 2024,
    score: 8.60,
    synopsis: "Tanjiro undergoes grueling training under all nine Hashira to prepare for the inevitable battle against Muzan Kibutsuji and his remaining Upper Rank demons.",
    image: "https://cdn.myanimelist.net/images/anime/1565/142711.jpg"
  },
  {
    title: "Serial Experiments Lain",
    studio: "Triangle Staff",
    genres: ["Award Winning", "Drama", "Mystery", "Sci-Fi", "Supernatural", "Suspense"],
    episodes: 13,
    year: 1998,
    score: 8.10,
    synopsis: "Introverted 14-year-old Lain Iwakura receives an email from a classmate who recently committed suicide — drawing her into the mysterious digital realm called the Wired.",
    image: "https://cdn.myanimelist.net/images/anime/1718/91550.jpg"
  },
  {
    title: "Jigokuraku",
    studio: "MAPPA",
    genres: ["Action", "Adventure", "Supernatural"],
    episodes: 13,
    year: 2023,
    score: 8.09,
    synopsis: "Ninja Gabimaru is offered a pardon from death row if he can travel to a mysterious island and retrieve the legendary Elixir of Life for the shogun.",
    image: "https://cdn.myanimelist.net/images/anime/1075/131925.jpg"
  },
  {
    title: "Zankyou no Terror",
    studio: "MAPPA",
    genres: ["Mystery", "Suspense"],
    episodes: 11,
    year: 2014,
    score: 8.08,
    synopsis: "Two mysterious teenagers calling themselves Sphinx launch a series of terror attacks in Tokyo, challenging the police with cryptic riddles and a hidden agenda.",
    image: "https://cdn.myanimelist.net/images/anime/1417/117422.jpg"
  },
  {
    title: "Durarara!!",
    studio: "Brain's Base",
    genres: ["Action", "Mystery", "Supernatural"],
    episodes: 24,
    year: 2010,
    score: 8.09,
    synopsis: "In Tokyo's Ikebukuro, strange rumors swirl — including an urban legend about a headless Black Rider — as the lives of a dozen people become dangerously intertwined.",
    image: "https://cdn.myanimelist.net/images/anime/10/71772.jpg"
  },
  {
    title: "Hyouka",
    studio: "Kyoto Animation",
    genres: ["Mystery", "Slice of Life"],
    episodes: 22,
    year: 2012,
    score: 8.05,
    synopsis: "Energy-conserving freshman Houtarou Oreki joins the Classics Club at his sister's request and discovers he has a talent for solving mysteries he never wanted to investigate.",
    image: "https://cdn.myanimelist.net/images/anime/13/50521.jpg"
  },
  {
    title: "Mahoutsukai no Yome",
    studio: "Wit Studio",
    genres: ["Drama", "Fantasy", "Romance"],
    episodes: 24,
    year: 2017,
    score: 8.05,
    synopsis: "15-year-old Chise Hatori is sold at auction to a mysterious mage who takes her as both apprentice and bride, introducing her to a world of magic she never knew existed.",
    image: "https://cdn.myanimelist.net/images/anime/3/88476.jpg"
  },
  {
    title: "Kuroko no Basket",
    studio: "Production I.G",
    genres: ["Sports"],
    episodes: 25,
    year: 2012,
    score: 8.04,
    synopsis: "The invisible sixth man of Teikou's legendary Generation of Miracles joins a new high school team determined to defeat his former prodigy teammates.",
    image: "https://cdn.myanimelist.net/images/anime/11/50453.jpg"
  },
  {
    title: "Sakura-sou no Pet na Kanojo",
    studio: "J.C.Staff",
    genres: ["Drama", "Romance"],
    episodes: 24,
    year: 2012,
    score: 8.04,
    synopsis: "Sorata Kanda ends up in the chaotic Sakura-sou dormitory and must care for the brilliant but helpless savant Shiina Mashiro, changing both their lives.",
    image: "https://cdn.myanimelist.net/images/anime/4/43643.jpg"
  },
  {
    title: "Black Lagoon",
    studio: "Madhouse",
    genres: ["Action"],
    episodes: 12,
    year: 2006,
    score: 8.04,
    synopsis: "Salaryman Rokurou Okajima is taken hostage by pirate mercenaries in Thailand — and eventually joins their crew, navigating a violent criminal underworld.",
    image: "https://cdn.myanimelist.net/images/anime/1906/121592.jpg"
  },
  {
    title: "Noragami Aragoto",
    studio: "Bones",
    genres: ["Action", "Supernatural"],
    episodes: 13,
    year: 2015,
    score: 8.14,
    synopsis: "Minor deity Yato and his Regalia Yukine face a dangerous conflict with the god Bishamon while navigating the volatile world of gods and spirits.",
    image: "https://cdn.myanimelist.net/images/anime/1689/94850.jpg"
  },
  {
    title: "Fate/stay night: Unlimited Blade Works",
    studio: "ufotable",
    genres: ["Action", "Fantasy"],
    episodes: 12,
    year: 2014,
    score: 8.18,
    synopsis: "In the Fifth Holy Grail War, honor student Rin Toosaka and her Servant Archer battle alongside reluctant mage Shirou Emiya in a tournament where only one wish can be granted.",
    image: "https://cdn.myanimelist.net/images/anime/12/67333.jpg"
  },
  {
    title: "Fate/stay night: Unlimited Blade Works 2nd Season",
    studio: "ufotable",
    genres: ["Action", "Fantasy"],
    episodes: 13,
    year: 2015,
    score: 8.32,
    synopsis: "As Caster seizes control of the Holy Grail War, Rin and Shirou struggle to survive amid shifting alliances and the haunting question of what it means to be a hero.",
    image: "https://cdn.myanimelist.net/images/anime/1881/124810.jpg"
  },
  {
    title: "Fate/Zero",
    studio: "ufotable",
    genres: ["Action", "Fantasy"],
    episodes: 13,
    year: 2011,
    score: 8.26,
    synopsis: "Seven magi summon legendary Heroic Spirits to battle for the Holy Grail's one wish in a war of ruthless ambition, tragic ideals, and dark secrets.",
    image: "https://cdn.myanimelist.net/images/anime/1887/117644.jpg"
  },
  {
    title: "Dororo",
    studio: "MAPPA",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 24,
    year: 2019,
    score: 8.26,
    synopsis: "A lord sacrifices his newborn son's body parts to demons for power — and that son grows up as the swordsman Hyakkimaru, fighting to reclaim what was taken.",
    image: "https://cdn.myanimelist.net/images/anime/1879/100467.jpg"
  },
  {
    title: "Fullmetal Alchemist (2003)",
    studio: "Bones",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    episodes: 51,
    year: 2003,
    score: 8.12,
    synopsis: "Brothers Edward and Alphonse Elric pay a terrible price for attempting human transmutation and set out to find the Philosopher's Stone to restore what they lost.",
    image: "https://cdn.myanimelist.net/images/anime/10/75815.jpg"
  },
  {
    title: "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders",
    studio: "David Production",
    genres: ["Action", "Adventure"],
    episodes: 24,
    year: 2014,
    score: 8.11,
    synopsis: "Joutarou Kuujou is imprisoned by his own Stand, a spiritual manifestation of his will — and must travel across the world with his grandfather to defeat DIO.",
    image: "https://cdn.myanimelist.net/images/anime/11/55267.jpg"
  },
  {
    title: "Sono Bisque Doll wa Koi wo Suru",
    studio: "CloverWorks",
    genres: ["Romance"],
    episodes: 12,
    year: 2022,
    score: 8.13,
    synopsis: "Hina doll craftsman Wakana Gojou befriends the popular Marin Kitagawa, who asks him to help make her cosplay outfits — sparking an unexpected connection.",
    image: "https://cdn.myanimelist.net/images/anime/1179/119897.jpg"
  },
  {
    title: "Nisemonogatari",
    studio: "Shaft",
    genres: ["Comedy", "Mystery", "Supernatural"],
    episodes: 11,
    year: 2012,
    score: 8.12,
    synopsis: "Koyomi Araragi faces new supernatural threats while navigating the complex relationships between his sisters Karen and Tsukihi and his circle of oddity-afflicted friends.",
    image: "https://cdn.myanimelist.net/images/anime/1044/103654.jpg"
  },
  {
    title: "Kimi ni Todoke",
    studio: "Production I.G",
    genres: ["Drama", "Romance"],
    episodes: 25,
    year: 2009,
    score: 8.01,
    synopsis: "Shy Sawako Kuronuma — nicknamed Sadako for her resemblance to a horror character — slowly opens up after popular boy Shota Kazehaya sees her true kindness.",
    image: "https://cdn.myanimelist.net/images/anime/1502/124384.jpg"
  },
  {
    title: "Clannad",
    studio: "Kyoto Animation",
    genres: ["Drama", "Romance"],
    episodes: 23,
    year: 2007,
    score: 7.99,
    synopsis: "Aimless delinquent Tomoya Okazaki meets the gentle Nagisa Furukawa one spring morning — and their budding friendship begins to change both their lives.",
    image: "https://cdn.myanimelist.net/images/anime/1804/95033.jpg"
  },
  {
    title: "Kaichou wa Maid-sama!",
    studio: "J.C.Staff",
    genres: ["Comedy", "Romance"],
    episodes: 26,
    year: 2010,
    score: 7.99,
    synopsis: "Seika High's iron-willed student council president Misaki secretly works part-time at a maid cafe — until popular student Usui discovers her hidden life.",
    image: "https://cdn.myanimelist.net/images/anime/6/25254.jpg"
  },
  {
    title: "Dragon Ball",
    studio: "Toei Animation",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    episodes: 153,
    year: 1986,
    score: 7.98,
    synopsis: "Young Goku and the resourceful Bulma travel the world collecting seven magical Dragon Balls that can grant any wish — encountering enemies and allies along the way.",
    image: "https://cdn.myanimelist.net/images/anime/1887/92364.jpg"
  },
  {
    title: "Yahari Ore no Seishun Love Comedy wa Machigatteiru.",
    studio: "Brain's Base",
    genres: ["Comedy", "Romance"],
    episodes: 13,
    year: 2013,
    score: 8.00,
    synopsis: "Antisocial loner Hachiman Hikigaya is forced to join the Service Club and must use his sharp, cynical mind to solve his classmates' problems.",
    image: "https://cdn.myanimelist.net/images/anime/1786/120117.jpg"
  },
  {
    title: "Log Horizon",
    studio: "Satelight",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 25,
    year: 2013,
    score: 7.90,
    synopsis: "Thirty thousand Japanese gamers find themselves trapped in the world of Elder Tale after a new update — and strategist Shiroe leads the effort to build a functioning society.",
    image: "https://cdn.myanimelist.net/images/anime/5/84004.jpg"
  },
  {
    title: "Kobayashi-san Chi no Maid Dragon",
    studio: "Kyoto Animation",
    genres: ["Slice of Life", "Supernatural"],
    episodes: 13,
    year: 2017,
    score: 7.90,
    synopsis: "Office worker Kobayashi drunkenly invites a dragon to stay with her — and Tohru the dragon shows up the next morning, determined to be the perfect maid.",
    image: "https://cdn.myanimelist.net/images/anime/5/85434.jpg"
  },
  {
    title: "Yuri!!! on Ice",
    studio: "MAPPA",
    genres: ["Award Winning", "Sports"],
    episodes: 12,
    year: 2016,
    score: 7.90,
    synopsis: "Disheartened Japanese figure skater Yuuri Katsuki goes viral performing his idol Victor Nikiforov's routine — and Victor himself shows up to coach him.",
    image: "https://cdn.myanimelist.net/images/anime/6/81149.jpg"
  },
  {
    title: "InuYasha",
    studio: "Sunrise",
    genres: ["Action", "Adventure", "Fantasy", "Romance"],
    episodes: 167,
    year: 2000,
    score: 7.88,
    synopsis: "Modern-day Kagome falls into a well and emerges in feudal Japan, where she awakens the half-demon InuYasha and begins a quest to collect the shards of the sacred Shikon Jewel.",
    image: "https://cdn.myanimelist.net/images/anime/1589/95329.jpg"
  },
  {
    title: "Higurashi no Naku Koro ni",
    studio: "Studio Deen",
    genres: ["Horror", "Mystery", "Suspense"],
    episodes: 26,
    year: 2006,
    score: 7.87,
    synopsis: "Keiichi Maebara moves to the peaceful village of Hinamizawa and makes new friends — but beneath the idyllic surface lurks a cycle of madness and murder tied to a local festival.",
    image: "https://cdn.myanimelist.net/images/anime/12/19634.jpg"
  },
  {
    title: "K-On!",
    studio: "Kyoto Animation",
    genres: ["Comedy"],
    episodes: 13,
    year: 2009,
    score: 7.87,
    synopsis: "Yui Hirasawa joins the Light Music Club expecting easy fun — but ends up learning guitar alongside her bandmates as they slowly become a genuine high school band.",
    image: "https://cdn.myanimelist.net/images/anime/10/76120.jpg"
  },
  {
    title: "Tonikaku Kawaii",
    studio: "Seven Arcs",
    genres: ["Comedy", "Romance"],
    episodes: 12,
    year: 2020,
    score: 7.84,
    synopsis: "Prodigy student Nasa Yuzaki is saved from an accident by a mysterious girl named Tsukasa — who agrees to date him only if they get married first.",
    image: "https://cdn.myanimelist.net/images/anime/1613/108722.jpg"
  },
  {
    title: "Bungou Stray Dogs",
    studio: "Bones",
    genres: ["Action", "Mystery"],
    episodes: 12,
    year: 2016,
    score: 7.80,
    synopsis: "Homeless orphan Atsushi Nakajima is saved from starvation by a strange man named Osamu Dazai and joins an agency of gifted humans who solve supernatural crimes.",
    image: "https://cdn.myanimelist.net/images/anime/3/79409.jpg"
  },
  {
    title: "Tokyo Revengers",
    studio: "LIDENFILMS",
    genres: ["Action", "Drama"],
    episodes: 24,
    year: 2021,
    score: 7.82,
    synopsis: "Takemichi Hanagaki travels back 12 years to his middle school days to prevent his ex-girlfriend's death by infiltrating and changing a dangerous gang.",
    image: "https://cdn.myanimelist.net/images/anime/1839/122012.jpg"
  },
  {
    title: "Gekkan Shoujo Nozaki-kun",
    studio: "Doga Kobo",
    genres: ["Comedy", "Romance"],
    episodes: 12,
    year: 2014,
    score: 7.81,
    synopsis: "Chiyo Sakura confesses her love to classmate Nozaki — only to discover he's a popular shoujo manga artist who immediately enlists her as his assistant.",
    image: "https://cdn.myanimelist.net/images/anime/5/66083.jpg"
  },
  {
    title: "Little Witch Academia",
    studio: "Trigger",
    genres: ["Adventure", "Comedy", "Fantasy"],
    episodes: 25,
    year: 2017,
    score: 7.81,
    synopsis: "Star-struck Atsuko 'Akko' Kagari enrolls at Luna Nova Magical Academy to become a witch like her idol, despite having no magical background.",
    image: "https://cdn.myanimelist.net/images/anime/1520/147248.jpg"
  },
  {
    title: "Suzumiya Haruhi no Yuuutsu",
    studio: "Kyoto Animation",
    genres: ["Award Winning", "Comedy", "Mystery", "Sci-Fi"],
    episodes: 14,
    year: 2006,
    score: 7.82,
    synopsis: "Ordinary Kyon gets swept up in the SOS Brigade by the whirlwind Haruhi Suzumiya — unaware she is a god-like being who unconsciously reshapes reality to fight her boredom.",
    image: "https://cdn.myanimelist.net/images/anime/1470/137929.jpg"
  },
  {
    title: "Lucky Star",
    studio: "Kyoto Animation",
    genres: ["Comedy"],
    episodes: 24,
    year: 2007,
    score: 7.76,
    synopsis: "Lucky Star follows four high school girls — lazy otaku Konata, bubbly Tsukasa, sharp-tongued Kagami, and studious Miyuki — through the hilariously ordinary moments of daily life.",
    image: "https://cdn.myanimelist.net/images/anime/1561/115660.jpg"
  },
  {
    title: "Beastars",
    studio: "Orange",
    genres: ["Drama", "Suspense"],
    episodes: 12,
    year: 2019,
    score: 7.78,
    synopsis: "In a society of anthropomorphic animals, grey wolf Legoshi struggles with his instincts as a carnivore while developing unexpected feelings for the gentle rabbit Haru.",
    image: "https://cdn.myanimelist.net/images/anime/1713/145599.jpg"
  },
  {
    title: "Komi-san wa, Comyushou desu.",
    studio: "OLM",
    genres: ["Comedy"],
    episodes: 12,
    year: 2021,
    score: 7.79,
    synopsis: "Hitohito Tadano sits next to Shouko Komi — the most admired girl at school — and discovers she has crippling communication disorder. He vows to help her make 100 friends.",
    image: "https://cdn.myanimelist.net/images/anime/1899/117237.jpg"
  },
  {
    title: "Enen no Shouboutai",
    studio: "David Production",
    genres: ["Action", "Fantasy", "Sci-Fi"],
    episodes: 24,
    year: 2019,
    score: 7.72,
    synopsis: "In a future where people spontaneously combust into fire demons, the earnest Shinra Kusakabe joins the Special Fire Force to uncover the truth behind his family's tragedy.",
    image: "https://cdn.myanimelist.net/images/anime/1664/103275.jpg"
  },
  {
    title: "Kyoukai no Kanata",
    studio: "Kyoto Animation",
    genres: ["Action", "Supernatural"],
    episodes: 12,
    year: 2013,
    score: 7.71,
    synopsis: "Mirai Kuriyama, a Spirit World warrior who wields her own blood as a weapon, hunts supernatural creatures — and unexpectedly befriends a half-youmu named Akihito.",
    image: "https://cdn.myanimelist.net/images/anime/3/85468.jpg"
  },
  {
    title: "Shiki",
    studio: "Daume",
    genres: ["Horror", "Mystery", "Supernatural", "Suspense"],
    episodes: 22,
    year: 2010,
    score: 7.72,
    synopsis: "A series of mysterious deaths strikes the rural village of Sotoba during a summer heat wave, and the village doctor begins to suspect something supernatural is responsible.",
    image: "https://cdn.myanimelist.net/images/anime/1531/119165.jpg"
  },
  {
    title: "Golden Time",
    studio: "J.C.Staff",
    genres: ["Drama", "Romance"],
    episodes: 24,
    year: 2013,
    score: 7.74,
    synopsis: "Amnesia-stricken law student Banri Tada starts fresh in Tokyo, but his past self and a complicated new love triangle threaten to unravel everything he's rebuilt.",
    image: "https://cdn.myanimelist.net/images/anime/12/52091.jpg"
  },
  {
    title: "Zom 100: Zombie ni Naru made ni Shitai 100 no Koto",
    studio: "BUG FILMS",
    genres: ["Comedy", "Suspense"],
    episodes: 12,
    year: 2023,
    score: 7.70,
    synopsis: "Akira Tendou hated his corporate job — then the zombie apocalypse starts, and he realizes he's finally free to pursue his 100 bucket list dreams.",
    image: "https://cdn.myanimelist.net/images/anime/1384/136408.jpg"
  },
  {
    title: "Kuroshitsuji",
    studio: "A-1 Pictures",
    genres: ["Action", "Comedy", "Drama", "Fantasy"],
    episodes: 24,
    year: 2008,
    score: 7.65,
    synopsis: "Young nobleman Ciel Phantomhive employs the demon Sebastian Michaelis as his butler, using him to investigate crimes in Victorian England while hiding a dark personal vendetta.",
    image: "https://cdn.myanimelist.net/images/anime/1467/137783.jpg"
  },
  {
    title: "Toaru Kagaku no Railgun",
    studio: "J.C.Staff",
    genres: ["Action", "Fantasy", "Sci-Fi"],
    episodes: 24,
    year: 2009,
    score: 7.65,
    synopsis: "Level 5 esper Misaka Mikoto patrols Academy City alongside her dorm friends, uncovering dark conspiracies beneath the city's shining scientific surface.",
    image: "https://cdn.myanimelist.net/images/anime/1099/106939.jpg"
  },
  {
    title: "Fairy Tail (2014)",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 102,
    year: 2014,
    score: 7.66,
    synopsis: "The Fairy Tail guild continues their adventures through grand arcs including the Grand Magic Games and the final battles against the dark guild Tartaros.",
    image: "https://cdn.myanimelist.net/images/anime/3/60551.jpg"
  },
  {
    title: "Hai to Gensou no Grimgar",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    episodes: 12,
    year: 2016,
    score: 7.66,
    synopsis: "A group of strangers awaken in a fantasy world with no memories and must become soldiers to survive, struggling painfully with their new reality.",
    image: "https://cdn.myanimelist.net/images/anime/13/77976.jpg"
  },
  {
    title: "Goblin Slayer",
    studio: "White Fox",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 12,
    year: 2018,
    score: 7.41,
    synopsis: "A stoic adventurer known only as Goblin Slayer dedicates his entire existence to hunting and exterminating goblins — the weakest monsters that everyone else overlooks.",
    image: "https://cdn.myanimelist.net/images/anime/1719/95621.jpg"
  },
  {
    title: "Gate: Jieitai Kanochi nite, Kaku Tatakaeri",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 12,
    year: 2015,
    score: 7.68,
    synopsis: "When a portal to a fantasy world opens in Tokyo, off-duty JSDF officer and otaku Youji Itami is sent through to make first contact — and find unexpected friends.",
    image: "https://cdn.myanimelist.net/images/anime/8/76222.jpg"
  },
  {
    title: "5-toubun no Hanayome",
    studio: "Tezuka Productions",
    genres: ["Comedy", "Romance"],
    episodes: 12,
    year: 2019,
    score: 7.62,
    synopsis: "Broke honor student Fuutarou Uesugi becomes tutor to the identical Nakano quintuplets — five girls who are all failing and all want nothing to do with him.",
    image: "https://cdn.myanimelist.net/images/anime/1819/97947.jpg"
  },
  {
    title: "Magi: The Labyrinth of Magic",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 25,
    year: 2012,
    score: 7.62,
    synopsis: "Young magi Aladdin and street merchant Alibaba adventure across a world of dungeons, wishes, and kings — inspired by the tales of One Thousand and One Nights.",
    image: "https://cdn.myanimelist.net/images/anime/11/42773.jpg"
  },
  {
    title: "Ao Haru Ride",
    studio: "Production I.G",
    genres: ["Romance"],
    episodes: 12,
    year: 2014,
    score: 7.63,
    synopsis: "Futaba Yoshioka is reunited with Kou Mabuchi — her first crush who disappeared years ago — only to find he has become a completely different person.",
    image: "https://cdn.myanimelist.net/images/anime/8/64813.jpg"
  },
  {
    title: "Inuyashiki",
    studio: "MAPPA",
    genres: ["Action", "Drama", "Sci-Fi", "Suspense"],
    episodes: 11,
    year: 2017,
    score: 7.63,
    synopsis: "Middle-aged salaryman Ichirou Inuyashiki and teenager Hiro Shishigami are both rebuilt as cyborgs after an alien accident — and choose opposite paths with their new powers.",
    image: "https://cdn.myanimelist.net/images/anime/7/88471.jpg"
  },
  {
    title: "Orange",
    studio: "Telecom Animation Film",
    genres: ["Drama", "Romance", "Sci-Fi"],
    episodes: 13,
    year: 2016,
    score: 7.63,
    synopsis: "Naho Takamiya receives letters from her future self urging her to save a new transfer student from a tragic fate — but changing the past proves heartbreakingly difficult.",
    image: "https://cdn.myanimelist.net/images/anime/1415/102477.jpg"
  },
  {
    title: "Kami no Tou",
    studio: "Telecom Animation Film",
    genres: ["Action", "Adventure", "Drama", "Fantasy", "Mystery"],
    episodes: 13,
    year: 2020,
    score: 7.55,
    synopsis: "A mysterious boy named Bam enters the Tower — a place where those chosen can have any wish granted — to find the girl who was his entire world.",
    image: "https://cdn.myanimelist.net/images/anime/1702/106229.jpg"
  },
  {
    title: "Wonder Egg Priority",
    studio: "CloverWorks",
    genres: ["Drama", "Supernatural", "Suspense"],
    episodes: 12,
    year: 2021,
    score: 7.54,
    synopsis: "Following her best friend's suicide, lonely Ai Ooto is given mysterious eggs that transport her to dream worlds where she must fight to save others — and herself.",
    image: "https://cdn.myanimelist.net/images/anime/1079/110751.jpg"
  },
  {
    title: "Wotaku ni Koi wa Muzukashii",
    studio: "A-1 Pictures",
    genres: ["Comedy", "Romance"],
    episodes: 11,
    year: 2018,
    score: 7.92,
    synopsis: "Office worker Narumi desperately hides her otaku hobby at her new job — until she runs into childhood friend and gaming obsessive Hirotaka Nifuji.",
    image: "https://cdn.myanimelist.net/images/anime/1864/93518.jpg"
  },
  {
    title: "Plastic Memories",
    studio: "Doga Kobo",
    genres: ["Drama", "Romance", "Sci-Fi"],
    episodes: 13,
    year: 2015,
    score: 7.92,
    synopsis: "New SAI Corp employee Tsukasa is paired with Isla, an android 'Giftia' nearing the end of her lifespan, as they retrieve expiring androids before they turn dangerous.",
    image: "https://cdn.myanimelist.net/images/anime/4/72750.jpg"
  },
  {
    title: "Kokoro Connect",
    studio: "SILVER LINK.",
    genres: ["Drama", "Romance", "Supernatural"],
    episodes: 13,
    year: 2012,
    score: 7.72,
    synopsis: "Five students in the Student Cultural Society begin randomly swapping bodies and sharing emotions, forcing them to confront painful secrets they kept from each other.",
    image: "https://cdn.myanimelist.net/images/anime/2/39665.jpg"
  },
  {
    title: "Enen no Shouboutai: Ni no Shou",
    studio: "David Production",
    genres: ["Action", "Fantasy", "Sci-Fi"],
    episodes: 24,
    year: 2020,
    score: 7.82,
    synopsis: "Shinra Kusakabe strengthens his resolve to become a hero after confronting his brother Shou, while the mysteries of the Evangelist and the Adolla Burst deepen.",
    image: "https://cdn.myanimelist.net/images/anime/1673/107657.jpg"
  },
  {
    title: "Kuroko no Basket 3rd Season",
    studio: "Production I.G",
    genres: ["Sports"],
    episodes: 25,
    year: 2015,
    score: 8.29,
    synopsis: "Seirin heads into the Winter Cup facing former Generation of Miracles members one by one — with the ultimate showdown against Akashi Seijuuro looming.",
    image: "https://cdn.myanimelist.net/images/anime/4/68299.jpg"
  },
  {
    title: "Tensei shitara Slime Datta Ken 2nd Season Part 2",
    studio: "8bit",
    genres: ["Action", "Comedy", "Fantasy"],
    episodes: 12,
    year: 2021,
    score: 8.29,
    synopsis: "Following the devastating Falmuth invasion, Rimuru must make a fateful decision that will reshape his kingdom and his very identity as its ruler.",
    image: "https://cdn.myanimelist.net/images/anime/1033/118296.jpg"
  },
  {
    title: "Shinsekai yori",
    studio: "A-1 Pictures",
    genres: ["Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi"],
    episodes: 25,
    year: 2012,
    score: 8.24,
    synopsis: "In a future Japan where everyone has telekinetic powers, Saki and her friends begin questioning the peaceful society they grew up in — and uncover a horrifying truth.",
    image: "https://cdn.myanimelist.net/images/anime/1549/136389.jpg"
  },
  {
    title: "Koutetsujou no Kabaneri",
    studio: "Wit Studio",
    genres: ["Action", "Fantasy", "Horror", "Suspense"],
    episodes: 12,
    year: 2016,
    score: 7.28,
    synopsis: "During an industrial revolution plagued by zombie-like Kabane creatures, engineer Ikoma creates a weapon to fight back and joins a group of survivors aboard an armored train.",
    image: "https://cdn.myanimelist.net/images/anime/12/79164.jpg"
  },
  {
    title: "91 Days",
    studio: "Shuka",
    genres: ["Action", "Drama", "Suspense"],
    episodes: 12,
    year: 2016,
    score: 7.82,
    synopsis: "After witnessing his family's murder by the Vanetti mafia, Angelo Lagusa returns seven years later under a false name to execute his revenge one by one.",
    image: "https://cdn.myanimelist.net/images/anime/13/80515.jpg"
  },
  {
    title: "Overlord II",
    studio: "Madhouse",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 13,
    year: 2018,
    score: 7.75,
    synopsis: "Ainz Ooal Gown continues expanding his influence in the New World, forging alliances and confronting enemies as he works to unravel the world's many mysteries.",
    image: "https://cdn.myanimelist.net/images/anime/1212/113415.jpg"
  },
  {
    title: "Overlord III",
    studio: "Madhouse",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 13,
    year: 2018,
    score: 7.91,
    synopsis: "The Great Tomb of Nazarick sets its plans of world domination into motion, with Ainz orchestrating political events across the Re-Estize Kingdom.",
    image: "https://cdn.myanimelist.net/images/anime/1511/93473.jpg"
  },
  {
    title: "Youjo Senki",
    studio: "Nut",
    genres: ["Action", "Fantasy"],
    episodes: 12,
    year: 2017,
    score: 7.96,
    synopsis: "A ruthless salaryman reincarnated as a young blonde girl in a WWI-era fantasy world rises through the military ranks as a terrifyingly effective mage officer.",
    image: "https://cdn.myanimelist.net/images/anime/5/82890.jpg"
  },
  {
    title: "Elfen Lied",
    studio: "Arms",
    genres: ["Action", "Drama", "Horror", "Romance", "Suspense"],
    episodes: 13,
    year: 2004,
    score: 7.46,
    synopsis: "Lucy, a mutant human with invisible telekinetic arms and a split personality, escapes a government facility and is found on a beach by two cousins who take her in.",
    image: "https://cdn.myanimelist.net/images/anime/1780/121555.jpg"
  },
  {
    title: "Gintama",
    studio: "Sunrise",
    genres: ["Action", "Comedy", "Sci-Fi"],
    episodes: 201,
    year: 2006,
    score: 8.93,
    synopsis: "In an alternate Edo ruled by alien conquerors, jack-of-all-trades samurai Gintoki Sakata and his friends take on odd jobs — and occasionally save the world.",
    image: "https://cdn.myanimelist.net/images/anime/10/73274.jpg"
  },
  {
    title: "Dragon Ball Super",
    studio: "Toei Animation",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    episodes: 131,
    year: 2015,
    score: 7.47,
    synopsis: "With Majin Buu defeated, Earth enjoys peace — until the God of Destruction Beerus awakens seeking the prophesied Super Saiyan God and shakes the universe.",
    image: "https://cdn.myanimelist.net/images/anime/7/74606.jpg"
  },
  {
    title: "Nanatsu no Taizai: Imashime no Fukkatsu",
    studio: "A-1 Pictures",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 24,
    year: 2018,
    score: 7.53,
    synopsis: "After Hendrickson's defeat releases the Ten Commandments from their seal, Meliodas and the Seven Deadly Sins must prevent the revival of the Demon Clan.",
    image: "https://cdn.myanimelist.net/images/anime/11/90089.jpg"
  },
  {
    title: "Deadman Wonderland",
    studio: "Manglobe",
    genres: ["Action", "Sci-Fi", "Supernatural", "Suspense"],
    episodes: 12,
    year: 2011,
    score: 7.13,
    synopsis: "Innocent student Ganta Igarashi is framed for his class's massacre and sent to a brutal prison theme park where inmates fight for their lives to entertain the public.",
    image: "https://cdn.myanimelist.net/images/anime/9/75299.jpg"
  },
  {
    title: "Hellsing",
    studio: "Gonzo",
    genres: ["Action", "Horror", "Supernatural"],
    episodes: 13,
    year: 2001,
    score: 7.50,
    synopsis: "The Hellsing Organization — tasked with eliminating supernatural threats — deploys its most powerful weapon: the ancient and terrifying vampire Alucard.",
    image: "https://cdn.myanimelist.net/images/anime/10/19956.jpg"
  },
  {
    title: "Hunter x Hunter (1999)",
    studio: "Nippon Animation",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 62,
    year: 1999,
    score: 8.44,
    synopsis: "Young Gon Freecss enters the brutal Hunter Exam to find his father, forging friendships and facing dangers in the original 1999 adaptation of the classic manga.",
    image: "https://cdn.myanimelist.net/images/anime/1305/132237.jpg"
  },
  {
    title: "Shokugeki no Souma: Ni no Sara",
    studio: "J.C.Staff",
    genres: ["Comedy"],
    episodes: 13,
    year: 2016,
    score: 8.06,
    synopsis: "The Autumn Election semifinalists face off in themed one-on-one Shokugeki battles, pushing every chef — including Souma — to their creative limits.",
    image: "https://cdn.myanimelist.net/images/anime/8/79353.jpg"
  },
  {
    title: "Spy x Family Season 2",
    studio: "Wit Studio",
    genres: ["Action", "Comedy"],
    episodes: 12,
    year: 2023,
    score: 8.06,
    synopsis: "Operation Strix continues with Anya navigating Eden Academy, Yor completing assassin missions, and Loid juggling spy work — all while keeping their fake family intact.",
    image: "https://cdn.myanimelist.net/images/anime/1506/138982.jpg"
  },
  {
    title: "Classroom of the Elite 2nd Season",
    studio: "Lerche",
    genres: ["Drama", "Suspense"],
    episodes: 13,
    year: 2022,
    score: 8.05,
    synopsis: "At Tokyo Metropolitan Advanced Nurturing High School, the calculating Kiyotaka Ayanokoji continues manipulating events from the shadows as more deadly special exams begin.",
    image: "https://cdn.myanimelist.net/images/anime/1010/124180.jpg"
  },
  {
    title: "Yofukashi no Uta",
    studio: "LIDENFILMS",
    genres: ["Romance", "Supernatural"],
    episodes: 13,
    year: 2022,
    score: 7.94,
    synopsis: "Insomniac teenager Kou Yamori wanders the city at night and meets the charming vampire Nazuna Nanakusa, who offers to turn him — if he can fall in love with her first.",
    image: "https://cdn.myanimelist.net/images/anime/1045/123711.jpg"
  },
  {
    title: "Overlord",
    studio: "Madhouse",
    genres: ["Action", "Adventure", "Fantasy"],
    episodes: 13,
    year: 2015,
    score: 7.94,
    synopsis: "When a beloved MMORPG shuts down, player Momonga finds himself trapped inside as his all-powerful character Ainz Ooal Gown in a world that has become terrifyingly real.",
    image: "https://cdn.myanimelist.net/images/anime/7/84011.jpg"
  },
  {
    title: "Shokugeki no Souma: San no Sara",
    studio: "J.C.Staff",
    genres: ["Comedy"],
    episodes: 12,
    year: 2017,
    score: 7.97,
    synopsis: "At the Moon Festival, Souma competes against the Elite Ten for the first time, testing his ingenuity against the academy's most powerful and arrogant chefs.",
    image: "https://cdn.myanimelist.net/images/anime/3/88434.jpg"
  },
  {
    title: "ReLIFE",
    studio: "TMS Entertainment",
    genres: ["Drama", "Romance"],
    episodes: 13,
    year: 2016,
    score: 7.96,
    synopsis: "27-year-old NEET Arata Kaizaki takes an experimental pill that makes him look 17 again, sending him back to high school to fix his life before the year is up.",
    image: "https://cdn.myanimelist.net/images/anime/3/82149.jpg"
  },
  {
    title: "Kakegurui",
    studio: "MAPPA",
    genres: ["Drama", "Mystery", "Suspense"],
    episodes: 12,
    year: 2017,
    score: 7.21,
    synopsis: "At a school where the social hierarchy is determined entirely by gambling, transfer student Yumeko Jabami arrives and shakes everything up — she gambles purely for the thrill.",
    image: "https://cdn.myanimelist.net/images/anime/3/86578.jpg"
  },
  {
    title: "Mashle",
    studio: "A-1 Pictures",
    genres: ["Action", "Comedy", "Fantasy"],
    episodes: 12,
    year: 2023,
    score: 7.61,
    synopsis: "In a world where magic determines everything, the completely magic-less Mash Burnedead enrolls in a prestigious magic academy — relying purely on his superhuman physical strength.",
    image: "https://cdn.myanimelist.net/images/anime/1218/135107.jpg"
  },
  {
    title: "Tsurezure Children",
    studio: "Studio Gokumi",
    genres: ["Comedy", "Romance"],
    episodes: 12,
    year: 2017,
    score: 7.53,
    synopsis: "A collection of short vignettes showing different high school couples at various stages of falling in love — each story hilariously relatable and sweet.",
    image: "https://cdn.myanimelist.net/images/anime/12/86676.jpg"
  },
  {
    title: "Hataraku Saibou",
    studio: "David Production",
    genres: ["Comedy"],
    episodes: 13,
    year: 2018,
    score: 7.55,
    synopsis: "Inside the human body, red blood cell AE3803 and white blood cell U-1146 navigate daily crises — from bacterial invasions to seasonal allergies — in this educational comedy.",
    image: "https://cdn.myanimelist.net/images/anime/1141/117446.jpg"
  },
  {
    title: "Baka to Test to Shoukanjuu",
    studio: "SILVER LINK.",
    genres: ["Comedy", "Romance"],
    episodes: 13,
    year: 2010,
    score: 7.50,
    synopsis: "At Fumizuki Academy, students summon avatar warriors to battle for better classroom privileges — and Class F's idiots launch a rebellion against the elite Class A.",
    image: "https://cdn.myanimelist.net/images/anime/3/50389.jpg"
  },
  {
    title: "Kami nomi zo Shiru Sekai",
    studio: "Manglobe",
    genres: ["Comedy", "Romance", "Supernatural"],
    episodes: 12,
    year: 2010,
    score: 7.64,
    synopsis: "The legendary 'God of Conquest' — a dating sim master — is contracted by a demon to capture runaway spirits by making real girls fall in love with him.",
    image: "https://cdn.myanimelist.net/images/anime/2/43361.jpg"
  },
  {
    title: "Free!",
    studio: "Kyoto Animation",
    genres: ["Sports"],
    episodes: 12,
    year: 2013,
    score: 7.32,
    synopsis: "Childhood friends reunite in high school to form a swim club, reigniting old rivalries and friendships as they compete in relay races and pursue their dreams.",
    image: "https://cdn.myanimelist.net/images/anime/6/51107.jpg"
  },
  {
    title: "Boku no Hero Academia 5th Season",
    studio: "Bones",
    genres: ["Action"],
    episodes: 25,
    year: 2021,
    score: 7.35,
    synopsis: "Class 1-A faces off against Class 1-B in joint hero training, while the villains prepare a massive strike that will change the hero world forever.",
    image: "https://cdn.myanimelist.net/images/anime/1911/113611.jpg"
  },
  {
    title: "Mahouka Koukou no Rettousei",
    studio: "Madhouse",
    genres: ["Action", "Fantasy", "Romance", "Sci-Fi"],
    episodes: 26,
    year: 2014,
    score: 7.36,
    synopsis: "In a world where magic is technology, the overpowered yet seemingly average Tatsuya Shiba enrolls at a magic high school with his brilliant sister Miyuki.",
    image: "https://cdn.myanimelist.net/images/anime/11/61039.jpg"
  },
  {
    title: "Guilty Crown",
    studio: "Production I.G",
    genres: ["Drama", "Sci-Fi"],
    episodes: 22,
    year: 2011,
    score: 7.39,
    synopsis: "Shy student Shu Ouma gains the ability to pull weapons from people's hearts and is dragged into a rebellion against the authoritarian GHQ ruling post-apocalyptic Japan.",
    image: "https://cdn.myanimelist.net/images/anime/1566/133912.jpg"
  },
  {
    title: "Maou Gakuin no Futekigousha",
    studio: "SILVER LINK.",
    genres: ["Action", "Fantasy"],
    episodes: 13,
    year: 2020,
    score: 7.30,
    synopsis: "The legendary Demon King Anos Voldigoad reincarnates 2,000 years after sacrificing himself for peace — only to find the world has forgotten his true history.",
    image: "https://cdn.myanimelist.net/images/anime/1126/108573.jpg"
  },
  {
    title: "The God of High School",
    studio: "MAPPA",
    genres: ["Action", "Fantasy"],
    episodes: 13,
    year: 2020,
    score: 7.07,
    synopsis: "Jin Mo-Ri, an expert in taekwondo, enters the God of High School tournament that pits Korea's best fighters against each other — with any wish as the prize.",
    image: "https://cdn.myanimelist.net/images/anime/1722/107269.jpg"
  },
  {
    title: "Black Bullet",
    studio: "Kinema Citrus",
    genres: ["Action", "Mystery", "Sci-Fi"],
    episodes: 13,
    year: 2014,
    score: 7.07,
    synopsis: "In a future Japan under siege from the virus Gastrea, Rentaro Satomi and his Initiator Enju fight to protect Tokyo while uncovering a deeper political conspiracy.",
    image: "https://cdn.myanimelist.net/images/anime/1292/94693.jpg"
  },
  {
    title: "JoJo no Kimyou na Bouken Part 5: Ougon no Kaze",
    studio: "David Production",
    genres: ["Action", "Adventure"],
    episodes: 39,
    year: 2018,
    score: 8.58,
    synopsis: "Giorno Giovanna, the son of the vampire DIO, joins the Italian mafia with one goal: to become a Gang-Star and rid it of the drug trade destroying Naples.",
    image: "https://cdn.myanimelist.net/images/anime/1882/94989.jpg"
  },
  {
    title: "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen S2",
    studio: "A-1 Pictures",
    genres: ["Comedy", "Romance"],
    episodes: 12,
    year: 2020,
    score: 8.61,
    synopsis: "Miyuki and Kaguya's mind games escalate further as Miyuki's birthday approaches and both refuse to show their true feelings — while their friends grow ever more suspicious.",
    image: "https://cdn.myanimelist.net/images/anime/1764/106659.jpg"
  },
  {
    title: "Ijiranaide, Nagatoro-san",
    studio: "Telecom Animation Film",
    genres: ["Comedy", "Romance"],
    episodes: 12,
    year: 2021,
    score: 7.18,
    synopsis: "Underclassman Hayase Nagatoro makes it her mission to tease the shy, withdrawn Senpai every day after school — but her teasing slowly begins to look like something more.",
    image: "https://cdn.myanimelist.net/images/anime/1900/110097.jpg"
  }
];

// ─── Filter State ────────────────────────────────────────────────────────────

let currentSearch = "";
let currentGenre = "All";
let currentSort = "score";

// ─── Genre Dropdown Population ───────────────────────────────────────────────
// Collects every unique genre across all anime using a Set, then adds each
// as an <option> element to the genre filter dropdown.

function populateGenreFilter() {
  const genreSet = new Set();
  animeData.forEach(anime => {
    anime.genres.forEach(genre => genreSet.add(genre));
  });

  const sortedGenres = [...genreSet].sort();
  const select = document.getElementById("genre-filter");

  sortedGenres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    select.appendChild(option);
  });
}

// ─── Core Render ─────────────────────────────────────────────────────────────
// Clones the hidden template card for each anime in the filtered array,
// fills in all the fields, and appends it to the card container.

function showCards(data) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  const template = document.querySelector(".card");

  if (data.length === 0) {
    container.innerHTML = '<p class="no-results">No anime match your search. Try a different filter!</p>';
    return;
  }

  data.forEach(anime => {
    const card = template.cloneNode(true);
    editCardContent(card, anime);
    card.style.display = "flex";
    container.appendChild(card);
  });
}

function editCardContent(card, anime) {
  card.querySelector(".card-img").src = anime.image;
  card.querySelector(".card-img").alt = anime.title + " cover art";
  card.querySelector(".card-title").textContent = anime.title;
  card.querySelector(".card-studio").textContent = anime.studio;
  card.querySelector(".card-year").textContent = anime.year;
  card.querySelector(".card-episodes").textContent = anime.episodes + " eps";
  card.querySelector(".card-synopsis").textContent = anime.synopsis;

  const scoreEl = card.querySelector(".card-score");
  scoreEl.textContent = "★ " + anime.score.toFixed(2);
  scoreEl.className = "card-score";
  if (anime.score >= 9.0) {
    scoreEl.classList.add("score-gold");
  } else if (anime.score >= 8.7) {
    scoreEl.classList.add("score-green");
  } else {
    scoreEl.classList.add("score-blue");
  }

  const genreContainer = card.querySelector(".card-genres");
  genreContainer.innerHTML = "";
  anime.genres.forEach(genre => {
    const tag = document.createElement("span");
    tag.className = "genre-tag";
    tag.textContent = genre;
    genreContainer.appendChild(tag);
  });
}

// ─── Feature 1: Live Search ───────────────────────────────────────────────────
// Filters the dataset by checking if the anime title contains the search text.
// Uses Array.filter() and String.toLowerCase().includes() for case-insensitive
// matching. Runs applyFilters() so genre/sort stay active at the same time.

function searchAnime(query) {
  currentSearch = query.trim();
  applyFilters();
}

// ─── Feature 2: Genre Filter ──────────────────────────────────────────────────
// Keeps only anime whose genres array includes the selected genre string.
// Uses Array.filter() combined with Array.includes(). "All" shows everything.

function filterByGenre(genre) {
  currentGenre = genre;
  applyFilters();
}

// ─── Feature 3: Sort ─────────────────────────────────────────────────────────
// Sorts a copy of the filtered array (non-mutating) using Array.sort().
// Supports: highest score, newest year, most episodes, alphabetical title.

function sortAnime(data) {
  const sorted = [...data];
  sorted.sort((a, b) => {
    if (currentSort === "score")    return b.score - a.score;
    if (currentSort === "year")     return b.year - a.year;
    if (currentSort === "episodes") return b.episodes - a.episodes;
    if (currentSort === "title")    return a.title.localeCompare(b.title);
    return 0;
  });
  return sorted;
}

// ─── Central Controller ───────────────────────────────────────────────────────
// Chains all three operations: filter by search → filter by genre → sort.
// Every control calls this so the three filters always work together.

function applyFilters() {
  let result = [...animeData];

  if (currentSearch !== "") {
    result = result.filter(anime =>
      anime.title.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  if (currentGenre !== "All") {
    result = result.filter(anime => anime.genres.includes(currentGenre));
  }

  result = sortAnime(result);

  const countEl = document.getElementById("result-count");
  countEl.textContent = result.length === animeData.length
    ? `${result.length} anime`
    : `${result.length} of ${animeData.length} anime`;

  showCards(result);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  populateGenreFilter();
  applyFilters();

  document.getElementById("search-input").addEventListener("input", e => {
    searchAnime(e.target.value);
  });

  document.getElementById("genre-filter").addEventListener("change", e => {
    filterByGenre(e.target.value);
  });

  document.getElementById("sort-by").addEventListener("change", e => {
    currentSort = e.target.value;
    applyFilters();
  });
});
