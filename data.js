const DATA_SOURCES = [
  {
    label: "Official Travian Support - tribe overview",
    url: "https://support.travian.com/en/support/solutions/articles/7000061162-the-tribes-and-their-advantages",
    note: "Used for current tribe positioning, merchant traits, special buildings, and server availability notes."
  },
  {
    label: "Official Travian Support - infantry and cavalry comparison",
    url: "https://support.travian.com/en/support/solutions/articles/7000090973-infantry-and-cavalry-units-comparison-table",
    note: "Used as a cross-check for current infantry and cavalry totals, speeds, upkeep, and level-20 training behavior."
  },
  {
    label: "Official Travian Support - Vikings in Travian: Legends",
    url: "https://support.travian.com/en/support/solutions/articles/7000090975-vikings-in-travian-legends",
    note: "Used for Viking unit costs, stats, training times, and Northern Legends-specific rules."
  },
  {
    label: "Travian Fandom - troops",
    url: "https://travian.fandom.com/wiki/Troops",
    note: "Used as a seed reference for base combat stats, total costs, and siege/administrator values where the support site exposes only comparison tables."
  },
  {
    label: "Official Travian Support - buildings and resource fields",
    url: "https://support.travian.com/en/support/solutions/articles/7000090158-buildings-and-resource-fields-statistics",
    note: "Used for the structure of building-level planning. Building rows here are seeded for fast local planning and should be checked against your live gameworld before precision use."
  },
  {
    label: "Official Travian Support - game versions and speed",
    url: "https://support.travian.com/en/support/solutions/articles/7000068688-game-versions-and-speed",
    note: "Used internally when resolving Travian gameworld links."
  },
  {
    label: "Official Travian Support - map.sql",
    url: "https://support.travian.com/en/support/solutions/articles/7000092469-what-is-map-sql-",
    note: "Documents the daily gameworld map snapshot available from /map.sql on live servers; used for the dashboard world snapshot import."
  }
];

const TRIBES = [
  {
    id: "romans",
    name: "Romans",
    availability: "Classic and special worlds",
    style: "Balanced, patient growth",
    merchant: "500 resources at 16 fields/hour",
    hero: "+100 hero strength per point instead of 80",
    specials: ["Build one resource field and one village building at the same time", "City Wall", "Horse Drinking Trough"],
    strengths: ["Strong infantry", "Best wall bonus", "Good for learning both attack and defense"],
    weaknesses: ["Expensive troops", "Longer training times", "Cavalry defense is not their comfort zone"]
  },
  {
    id: "teutons",
    name: "Teutons",
    availability: "Classic and special worlds",
    style: "Aggressive raiding",
    merchant: "1000 resources at 12 fields/hour",
    hero: "20% cranny-dip plunder bonus",
    specials: ["Earth Wall", "Brewery", "Cheap early raiders"],
    strengths: ["Fast troop production", "Great early raid pressure", "Strong anti-cavalry Spearmen"],
    weaknesses: ["Slower merchants and armies", "Weak early cavalry defense if clubs are idle"]
  },
  {
    id: "gauls",
    name: "Gauls",
    availability: "Classic and special worlds",
    style: "Flexible defense and speed",
    merchant: "750 resources at 24 fields/hour",
    hero: "+5 mounted hero speed, scaled by world speed",
    specials: ["Palisade", "Trapper", "Crannies hide 1.5x more resources"],
    strengths: ["Fastest common tribe movement", "Strong beginner safety", "Excellent flexible defense"],
    weaknesses: ["Siege is expensive", "Offense requires careful planning"]
  },
  {
    id: "huns",
    name: "Huns",
    availability: "5-tribe and many special worlds",
    style: "Mobile offense",
    merchant: "500 resources at 20 fields/hour",
    hero: "+3 speed for mounted armies with a mounted hero",
    specials: ["Command Center", "Makeshift Wall", "Three offensive cavalry options"],
    strengths: ["Fast cavalry", "Strong raiding", "Excellent expansion pressure"],
    weaknesses: ["Weak wall", "Defense needs alliance support"]
  },
  {
    id: "egyptians",
    name: "Egyptians",
    availability: "5-tribe and many special worlds",
    style: "Economy and defense",
    merchant: "750 resources at 16 fields/hour",
    hero: "Increased hero resource production",
    specials: ["Waterworks", "Stone Wall", "Cheap basic defense"],
    strengths: ["Strong resource engine", "Durable defenses", "Great support role"],
    weaknesses: ["Limited offensive bite", "Less mobile than speed tribes"]
  },
  {
    id: "spartans",
    name: "Spartans",
    availability: "Special worlds",
    style: "Late-game elite troops",
    merchant: "500 resources at 14 fields/hour",
    hero: "+50% strength from Spartan weapons",
    specials: ["Asclepeion", "Defensive Wall", "High crop-efficiency troops"],
    strengths: ["Powerful troops", "Excellent late-game scaling", "Strong crop efficiency"],
    weaknesses: ["Expensive units", "Slower development curve"]
  },
  {
    id: "vikings",
    name: "Vikings",
    availability: "Northern Legends worlds",
    style: "Raiding and efficient cavalry",
    merchant: "750 resources at 18 fields/hour",
    hero: "Can reduce loyalty by 5%, but cannot conquer alone",
    specials: ["Barricade", "Fast raid ships", "Berserker damage-on-death"],
    strengths: ["Strong raiding", "Efficient Valkyries", "Naval mobility on Northern Legends"],
    weaknesses: ["Special-server dependent", "Prefers initiative over static defense"]
  }
];

const TROOPS = [
  troop("gauls", "Phalanx", "defense", "Barracks", [100, 130, 55, 30], 15, 40, 50, 7, 35, 1, "00:17:20", "Barracks 1"),
  troop("gauls", "Swordsman", "offense", "Barracks", [140, 150, 185, 60], 65, 35, 20, 6, 45, 1, "00:24:00", "Smithy 1, Academy 3"),
  troop("gauls", "Pathfinder", "scout", "Stable", [170, 150, 20, 40], 0, 20, 10, 17, 0, 2, "00:22:40", "Stable 1, Academy 5"),
  troop("gauls", "Theutates Thunder", "offense", "Stable", [350, 450, 230, 60], 100, 25, 40, 19, 75, 2, "00:41:20", "Stable 3, Academy 5"),
  troop("gauls", "Druidrider", "defense", "Stable", [360, 330, 280, 120], 45, 115, 55, 16, 35, 2, "00:42:40", "Stable 5, Academy 5"),
  troop("gauls", "Haeduan", "hybrid", "Stable", [500, 620, 675, 170], 140, 50, 165, 13, 65, 3, "00:52:00", "Stable 10, Academy 15"),
  troop("gauls", "Ram", "siege", "Workshop", [950, 555, 330, 75], 50, 30, 105, 4, 0, 3, "01:23:20", "Workshop 1, Academy 10"),
  troop("gauls", "Trebuchet", "siege", "Workshop", [960, 1450, 630, 90], 70, 45, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15"),
  troop("gauls", "Chieftain", "administrator", "Residence/Palace", [30750, 45400, 31000, 37500], 40, 50, 50, 5, 0, 4, "25:11:40", "Rally Point 10, Academy 20"),
  troop("gauls", "Settler", "settler", "Residence/Palace", [4400, 5600, 4200, 8500], 0, 80, 80, 5, 3000, 1, "06:18:20", "Residence 10 or Palace 10", { splitConfidence: "low" }),

  troop("romans", "Legionnaire", "hybrid", "Barracks", [120, 100, 150, 30], 40, 35, 50, 6, 50, 1, "00:26:40", "Barracks 1"),
  troop("romans", "Praetorian", "defense", "Barracks", [100, 130, 160, 70], 30, 65, 35, 5, 20, 1, "00:29:20", "Smithy 1, Academy 1"),
  troop("romans", "Imperian", "offense", "Barracks", [150, 160, 210, 80], 70, 40, 25, 7, 50, 1, "00:32:00", "Smithy 1, Academy 5"),
  troop("romans", "Equites Legati", "scout", "Stable", [140, 160, 20, 40], 0, 20, 10, 16, 0, 2, "00:22:40", "Stable 1, Academy 5"),
  troop("romans", "Equites Imperatoris", "offense", "Stable", [550, 440, 320, 100], 120, 65, 50, 14, 100, 3, "00:44:00", "Stable 5, Academy 5"),
  troop("romans", "Equites Caesaris", "offense", "Stable", [550, 640, 800, 180], 180, 80, 105, 10, 70, 4, "00:58:40", "Stable 10, Academy 15"),
  troop("romans", "Battering Ram", "siege", "Workshop", [900, 360, 500, 70], 60, 30, 75, 4, 0, 3, "01:16:40", "Workshop 1, Academy 10"),
  troop("romans", "Fire Catapult", "siege", "Workshop", [950, 1350, 600, 90], 75, 60, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15"),
  troop("romans", "Senator", "administrator", "Residence/Palace", [30750, 27200, 45000, 37500], 50, 40, 30, 4, 0, 5, "25:11:40", "Rally Point 10, Academy 20"),
  troop("romans", "Settler", "settler", "Residence/Palace", [4600, 4200, 5800, 4400], 0, 80, 80, 5, 3000, 1, "07:28:20", "Residence 10 or Palace 10"),

  troop("teutons", "Clubswinger", "offense", "Barracks", [95, 75, 40, 40], 40, 20, 5, 7, 60, 1, "00:12:00", "Barracks 1"),
  troop("teutons", "Spearman", "defense", "Barracks", [145, 70, 85, 40], 10, 35, 60, 7, 40, 1, "00:18:40", "Barracks 3, Academy 1"),
  troop("teutons", "Axeman", "offense", "Barracks", [130, 120, 170, 70], 60, 30, 30, 6, 50, 1, "00:20:00", "Smithy 3, Academy 3"),
  troop("teutons", "Scout", "scout", "Barracks", [160, 100, 50, 50], 0, 10, 5, 9, 0, 1, "00:18:40", "Academy 1, Main Building 5"),
  troop("teutons", "Paladin", "defense", "Stable", [370, 270, 290, 75], 55, 100, 40, 10, 110, 2, "00:40:00", "Stable 3, Academy 5"),
  troop("teutons", "Teutonic Knight", "offense", "Stable", [450, 515, 480, 80], 150, 50, 75, 9, 80, 3, "00:49:20", "Stable 10, Academy 15"),
  troop("teutons", "Ram", "siege", "Workshop", [1000, 300, 350, 70], 65, 30, 80, 4, 0, 3, "01:10:00", "Workshop 1, Academy 10"),
  troop("teutons", "Catapult", "siege", "Workshop", [900, 1200, 600, 60], 50, 60, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15"),
  troop("teutons", "Chief", "administrator", "Residence/Palace", [35500, 26600, 25000, 27200], 40, 60, 40, 4, 0, 4, "19:35:00", "Rally Point 10, Academy 20"),
  troop("teutons", "Settler", "settler", "Residence/Palace", [7200, 5500, 5800, 6500], 10, 80, 80, 5, 3000, 1, "08:36:40", "Residence 10 or Palace 10"),

  troop("huns", "Mercenary", "hybrid", "Barracks", [130, 80, 40, 40], 35, 40, 30, 7, 50, 1, "00:13:30", "Barracks 1"),
  troop("huns", "Bowman", "offense", "Barracks", [140, 110, 60, 60], 50, 30, 10, 6, 30, 1, "00:18:40", "Smithy 1, Academy 1"),
  troop("huns", "Spotter", "scout", "Stable", [170, 150, 20, 40], 0, 20, 10, 19, 0, 2, "00:22:40", "Stable 1, Academy 5"),
  troop("huns", "Steppe Rider", "offense", "Stable", [290, 370, 190, 45], 120, 30, 15, 16, 75, 2, "00:40:00", "Stable 3, Academy 5"),
  troop("huns", "Marksman", "hybrid", "Stable", [320, 350, 330, 50], 110, 80, 70, 15, 105, 2, "00:41:20", "Stable 5, Academy 5"),
  troop("huns", "Marauder", "offense", "Stable", [450, 560, 610, 140], 180, 60, 40, 14, 80, 3, "00:49:50", "Stable 10, Academy 15"),
  troop("huns", "Ram", "siege", "Workshop", [1060, 330, 360, 70], 45, 30, 90, 4, 0, 3, "01:13:20", "Workshop 1, Academy 10"),
  troop("huns", "Catapult", "siege", "Workshop", [950, 1280, 620, 60], 45, 55, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15"),
  troop("huns", "Logades", "administrator", "Residence/Palace", [37200, 27600, 25200, 27600], 50, 40, 30, 5, 0, 4, "25:11:40", "Rally Point 10, Academy 20"),
  troop("huns", "Settler", "settler", "Residence/Palace", [6100, 4600, 4800, 5400], 10, 80, 80, 5, 3000, 1, "08:02:30", "Residence 10 or Palace 10"),

  troop("egyptians", "Slave Militia", "defense", "Barracks", [45, 60, 30, 15], 10, 30, 20, 7, 15, 1, "00:08:50", "Barracks 1"),
  troop("egyptians", "Ash Warden", "defense", "Barracks", [115, 100, 145, 60], 30, 55, 40, 6, 50, 1, "00:22:00", "Smithy 1, Academy 1"),
  troop("egyptians", "Khopesh Warrior", "offense", "Barracks", [170, 180, 220, 80], 65, 50, 20, 7, 45, 1, "00:24:00", "Smithy 3, Academy 3"),
  troop("egyptians", "Sopdu Explorer", "scout", "Stable", [170, 150, 20, 40], 0, 20, 10, 16, 0, 2, "00:22:40", "Stable 1, Academy 5"),
  troop("egyptians", "Anhur Guard", "defense", "Stable", [360, 330, 280, 120], 50, 110, 50, 15, 50, 2, "00:42:40", "Stable 5, Academy 5"),
  troop("egyptians", "Resheph Chariot", "defense", "Stable", [450, 560, 610, 180], 110, 120, 150, 10, 70, 3, "00:54:00", "Stable 10, Academy 15"),
  troop("egyptians", "Ram", "siege", "Workshop", [995, 575, 340, 80], 55, 30, 95, 4, 0, 3, "01:20:00", "Workshop 1, Academy 10"),
  troop("egyptians", "Stone Catapult", "siege", "Workshop", [980, 1510, 660, 100], 65, 55, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15"),
  troop("egyptians", "Nomarch", "administrator", "Residence/Palace", [34000, 50000, 34000, 42000], 40, 50, 50, 4, 0, 4, "25:11:40", "Rally Point 10, Academy 20"),
  troop("egyptians", "Settler", "settler", "Residence/Palace", [4560, 5890, 4370, 4180], 0, 80, 80, 5, 3000, 1, "06:53:20", "Residence 10 or Palace 10", { splitConfidence: "low" }),

  troop("spartans", "Hoplite", "hybrid", "Barracks", null, 50, 35, 30, 6, 60, 1, "00:28:20", "Barracks 1", { totalCost: 440 }),
  troop("spartans", "Sentinel", "scout", "Barracks", null, 0, 40, 22, 9, 0, 1, "00:20:40", "Smithy 1, Academy 1", { totalCost: 445 }),
  troop("spartans", "Shieldsman", "defense", "Barracks", null, 40, 85, 45, 8, 40, 1, "00:32:10", "Smithy 1, Academy 5", { totalCost: 530 }),
  troop("spartans", "Twinsteel Therion", "offense", "Barracks", null, 90, 55, 40, 6, 50, 1, "00:35:00", "Smithy 5, Academy 10", { totalCost: 795 }),
  troop("spartans", "Elpida Rider", "defense", "Stable", null, 55, 120, 90, 16, 110, 2, "00:46:50", "Stable 1, Academy 5", { totalCost: 1440 }),
  troop("spartans", "Corinthian Crusher", "offense", "Stable", null, 195, 80, 75, 9, 80, 3, "00:57:10", "Stable 10, Academy 15", { totalCost: 2315 }),
  troop("spartans", "Ram", "siege", "Workshop", null, 65, 30, 80, 4, 0, 3, "01:10:00", "Workshop 1, Academy 10", { totalCost: 1705 }),
  troop("spartans", "Ballista", "siege", "Workshop", null, 50, 60, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15", { totalCost: 2750 }),
  troop("spartans", "Ephor", "administrator", "Residence/Palace", null, 40, 60, 40, 4, 0, 4, "19:35:00", "Rally Point 10, Academy 20", { totalCost: 114290 }),
  troop("spartans", "Settler", "settler", "Residence/Palace", null, 10, 80, 80, 5, 3000, 1, "08:36:40", "Residence 10 or Palace 10", { totalCost: 19995 }),

  troop("vikings", "Thrall", "offense", "Barracks", [95, 80, 50, 40], 45, 22, 5, 7, 60, 1, "00:13:20", "Barracks 1"),
  troop("vikings", "Shield Maiden", "defense", "Barracks", [125, 70, 85, 40], 20, 50, 30, 7, 40, 1, "00:18:00", "Smithy 1, Academy 5"),
  troop("vikings", "Berserker", "offense", "Barracks", [235, 220, 200, 70], 70, 30, 25, 5, 50, 2, "00:25:50", "Smithy 5, Academy 10"),
  troop("vikings", "Heimdall's Eye", "scout", "Barracks", [155, 95, 50, 50], 0, 10, 5, 9, 0, 1, "00:18:40", "Smithy 1, Academy 1"),
  troop("vikings", "Huskarl Rider", "defense", "Stable", [385, 295, 290, 85], 45, 95, 100, 12, 70, 2, "00:44:10", "Stable 1, Academy 5"),
  troop("vikings", "Valkyrie's Blessing", "offense", "Stable", [475, 535, 515, 100], 160, 50, 75, 9, 80, 2, "00:51:00", "Stable 10, Academy 5"),
  troop("vikings", "Ram", "siege", "Workshop", [950, 325, 375, 70], 65, 30, 80, 4, 0, 3, "01:10:00", "Workshop 1, Academy 10"),
  troop("vikings", "Catapult", "siege", "Workshop", [850, 1225, 625, 60], 50, 60, 10, 3, 0, 6, "02:30:00", "Workshop 10, Academy 15"),
  troop("vikings", "Jarl", "administrator", "Residence/Palace", [35500, 26600, 25000, 27200], 40, 40, 60, 5, 0, 4, "19:35:00", "Rally Point 10, Academy 20")
];

const BUILDINGS = [
  building("Woodcutter", "resource", [40, 100, 50, 60], 1.67, 20, "Wood production field", "Produces lumber; population/crop consumption rises with level."),
  building("Clay Pit", "resource", [80, 40, 80, 50], 1.67, 20, "Clay production field", "Produces clay; one of the most strained early resources."),
  building("Iron Mine", "resource", [100, 80, 30, 60], 1.67, 20, "Iron production field", "Produces iron; especially important for Roman and elite units."),
  building("Cropland", "resource", [70, 90, 70, 20], 1.67, 20, "Crop production field", "Raises gross crop production and supports population and troop upkeep."),
  building("Main Building", "infrastructure", [70, 40, 60, 20], 1.28, 20, "Construction speed", "Higher levels reduce construction time and unlock demolition."),
  building("Warehouse", "storage", [130, 160, 90, 40], 1.28, 20, "Resource storage", "Raises wood, clay, and iron storage capacity."),
  building("Granary", "storage", [80, 100, 70, 20], 1.28, 20, "Crop storage", "Raises crop storage capacity."),
  building("Cranny", "defense", [40, 50, 30, 10], 1.28, 10, "Hidden resources", "Protects resources from raids; Gauls hide more."),
  building("Rally Point", "military", [110, 160, 90, 70], 1.28, 20, "Troop command", "Needed for troop movement, attacks, fakes, and administrators."),
  building("Barracks", "military", [210, 140, 260, 120], 1.28, 20, "Infantry training", "Trains infantry; each level reduces training time."),
  building("Stable", "military", [260, 140, 220, 100], 1.28, 20, "Cavalry training", "Trains cavalry and mounted scouts."),
  building("Workshop", "military", [460, 510, 600, 320], 1.28, 20, "Siege training", "Trains rams and catapults."),
  building("Academy", "military", [220, 160, 90, 40], 1.28, 20, "Unit research", "Unlocks new units."),
  building("Smithy", "military", [170, 200, 380, 130], 1.28, 20, "Unit upgrades", "Improves attack and defense values."),
  building("Marketplace", "economy", [80, 70, 120, 70], 1.28, 20, "Trade", "Sends resources and creates trade routes on Plus accounts."),
  building("Trade Office", "economy", [1400, 1330, 1200, 400], 1.28, 20, "Merchant capacity", "Improves merchant carrying capacity."),
  building("Embassy", "diplomacy", [180, 130, 150, 80], 1.28, 20, "Alliance access", "Allows joining or founding alliances."),
  building("Residence", "expansion", [580, 460, 350, 180], 1.28, 20, "Expansion slots", "Trains settlers and administrators; protects village from conquest."),
  building("Palace", "expansion", [550, 800, 750, 250], 1.28, 20, "Capital and expansion", "Declares capital and unlocks more expansion slots."),
  building("Town Hall", "culture", [1250, 1110, 1260, 600], 1.28, 20, "Celebrations", "Runs celebrations for culture points and conquest support."),
  building("Hero's Mansion", "hero", [700, 670, 700, 240], 1.28, 20, "Oases", "Captures oases and houses the hero."),
  building("Tournament Square", "military", [1750, 2250, 1530, 240], 1.28, 20, "Long-distance speed", "Increases troop speed after the initial travel threshold."),
  building("Treasury", "artifact", [2880, 2740, 2580, 990], 1.26, 20, "Artifacts", "Stores artifacts and exposes artifact information."),
  building("Sawmill", "resource bonus", [520, 380, 290, 90], 1.28, 5, "Wood bonus", "Boosts wood production when woodcutters are high enough."),
  building("Brickyard", "resource bonus", [440, 480, 320, 50], 1.28, 5, "Clay bonus", "Boosts clay production when clay pits are high enough."),
  building("Iron Foundry", "resource bonus", [200, 450, 510, 120], 1.28, 5, "Iron bonus", "Boosts iron production when iron mines are high enough."),
  building("Grain Mill", "resource bonus", [500, 440, 380, 1240], 1.28, 5, "Crop bonus", "Boosts crop production from croplands."),
  building("Bakery", "resource bonus", [1200, 1480, 870, 1600], 1.28, 5, "Crop bonus", "Stacks with Grain Mill for stronger crop output.")
];

function troop(tribe, name, role, building, cost, attack, defInf, defCav, speed, carry, upkeep, trainTime, requirement, options = {}) {
  const total = options.totalCost ?? (cost ? cost.reduce((sum, value) => sum + value, 0) : null);

  return {
    tribe,
    name,
    role,
    building,
    cost: cost ? { wood: cost[0], clay: cost[1], iron: cost[2], crop: cost[3], total } : { wood: null, clay: null, iron: null, crop: null, total },
    attack,
    defInf,
    defCav,
    speed,
    carry,
    upkeep,
    trainTime,
    requirement,
    splitConfidence: options.splitConfidence ?? (cost ? "high" : "total-only")
  };
}

function building(name, category, cost, factor, maxLevel, effect, notes) {
  return {
    name,
    category,
    cost: { wood: cost[0], clay: cost[1], iron: cost[2], crop: cost[3], total: cost.reduce((sum, value) => sum + value, 0) },
    factor,
    maxLevel,
    effect,
    notes
  };
}
