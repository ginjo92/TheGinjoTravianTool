const state = {
  tab: "dashboard",
  tribe: "all",
  query: "",
  troopQuery: "",
  buildingQuery: "",
  role: "all",
  planningView: "troops",
  buildingCategory: "all",
  speed: 1,
  buildingLevel: 20,
  smithyLevel: 0,
  dashboardView: "villages",
  quantity: 100,
  availableResources: { wood: 0, clay: 0, iron: 0, crop: 0 },
  ocrText: {
    shared: ""
  },
  ocrFiles: {
    shared: []
  },
  db: null,
  editingAvatarId: null
};

const STORAGE_KEY = "ginjoTravianTool.db.v1";

const SERVER_PRESETS = [
  { id: "custom", name: "Server from link", speed: 1, version: "regular", tribeCount: 3, tribeUnlocked: false, url: "" }
];

const TRIBE_BY_COUNT = {
  3: ["romans", "teutons", "gauls"],
  5: ["romans", "teutons", "gauls", "huns", "egyptians"],
  6: ["romans", "teutons", "gauls", "huns", "egyptians", "spartans", "vikings"],
  7: ["romans", "teutons", "gauls", "huns", "egyptians", "spartans", "vikings"]
};

const VILLAGE_TYPES = [
  { id: "", label: "Unknown" },
  { id: "4-4-4-6", label: "4-4-4-6" },
  { id: "3-3-3-9", label: "3-3-3-9" },
  { id: "1-1-1-15", label: "1-1-1-15" },
  { id: "4-3-5-6", label: "4-3-5-6" },
  { id: "3-4-5-6", label: "3-4-5-6" },
  { id: "5-3-4-6", label: "5-3-4-6" },
  { id: "4-5-3-6", label: "4-5-3-6" },
  { id: "3-5-4-6", label: "3-5-4-6" },
  { id: "5-4-3-6", label: "5-4-3-6" }
];

const OASIS_BONUSES = [
  { id: "wood-25", label: "+25% wood", resources: ["wood"], percent: 25 },
  { id: "clay-25", label: "+25% clay", resources: ["clay"], percent: 25 },
  { id: "iron-25", label: "+25% iron", resources: ["iron"], percent: 25 },
  { id: "crop-25", label: "+25% crop", resources: ["crop"], percent: 25 },
  { id: "crop-50", label: "+50% crop", resources: ["crop"], percent: 50 },
  { id: "wood-crop-25", label: "+25% wood + crop", resources: ["wood", "crop"], percent: 25 },
  { id: "clay-crop-25", label: "+25% clay + crop", resources: ["clay", "crop"], percent: 25 },
  { id: "iron-crop-25", label: "+25% iron + crop", resources: ["iron", "crop"], percent: 25 }
];

const MERCHANTS = {
  romans: { capacity: 500, speed: 16 },
  teutons: { capacity: 1000, speed: 12 },
  gauls: { capacity: 750, speed: 24 },
  huns: { capacity: 500, speed: 20 },
  egyptians: { capacity: 750, speed: 16 },
  spartans: { capacity: 500, speed: 14 },
  vikings: { capacity: 750, speed: 18 }
};

const TEUTON_TROOP_HEADERS = [
  "Clubswinger",
  "Spearman",
  "Axeman",
  "Scout",
  "Paladin",
  "Teutonic Knight",
  "Ram",
  "Catapult",
  "Chief",
  "Settler"
];

const RESOURCE_ICON_FILES = {
  wood: "assets/resources/wood.png",
  clay: "assets/resources/clay.png",
  iron: "assets/resources/iron.png",
  crop: "assets/resources/crop.png",
  upkeep: "assets/resources/cropconsumption.png"
};

const STAT_ICON_FILES = {
  attack: "assets/misc/atk.png",
  defense: "assets/misc/def-inf.png",
  cavalry: "assets/misc/def-cav.png"
};

const TRIBE_ICON_FILES = {
  romans: "assets/tribes/general/romans.png",
  teutons: "assets/tribes/general/teutons.png",
  gauls: "assets/tribes/general/gauls.png",
  huns: "assets/tribes/general/huns.png",
  egyptians: "assets/tribes/general/egypcians.png",
  spartans: "assets/tribes/general/spartans.png",
  vikings: "assets/tribes/general/vikings.png"
};

const TROOP_ICON_FILES = {
  "gauls:Phalanx": "assets/tribes/gauls/phallanx.png",
  "gauls:Swordsman": "assets/tribes/gauls/swordsman.png",
  "gauls:Pathfinder": "assets/tribes/gauls/pathfinder.png",
  "gauls:Theutates Thunder": "assets/tribes/gauls/tt.png",
  "gauls:Druidrider": "assets/tribes/gauls/druid.png",
  "gauls:Haeduan": "assets/tribes/gauls/haeduan.png",
  "gauls:Ram": "assets/tribes/general/ram.png",
  "gauls:Trebuchet": "assets/tribes/general/catapult.png",
  "gauls:Chieftain": "assets/tribes/gauls/chieftain.png",
  "gauls:Settler": "assets/tribes/general/settler.png",
  "romans:Legionnaire": "assets/tribes/romans/legionaire.png",
  "romans:Praetorian": "assets/tribes/romans/pretorian.png",
  "romans:Imperian": "assets/tribes/romans/imperian.png",
  "romans:Equites Legati": "assets/tribes/romans/equiteslegati.png",
  "romans:Equites Imperatoris": "assets/tribes/romans/equitesimperatoris.png",
  "romans:Equites Caesaris": "assets/tribes/romans/equitescaesaris.png",
  "romans:Battering Ram": "assets/tribes/general/ram.png",
  "romans:Fire Catapult": "assets/tribes/general/catapult.png",
  "romans:Senator": "assets/tribes/romans/senator (2).png",
  "romans:Settler": "assets/tribes/general/settler.png",
  "teutons:Clubswinger": "assets/tribes/teutons/club.png",
  "teutons:Spearman": "assets/tribes/teutons/spear.png",
  "teutons:Axeman": "assets/tribes/teutons/axe.png",
  "teutons:Scout": "assets/tribes/teutons/scout.png",
  "teutons:Paladin": "assets/tribes/teutons/paladin.png",
  "teutons:Teutonic Knight": "assets/tribes/teutons/tk.png",
  "teutons:Ram": "assets/tribes/general/ram.png",
  "teutons:Catapult": "assets/tribes/general/catapult.png",
  "teutons:Chief": "assets/tribes/teutons/chief.png",
  "teutons:Settler": "assets/tribes/general/settler.png",
  "huns:Mercenary": "assets/tribes/huns/mercenary.png",
  "huns:Bowman": "assets/tribes/huns/bowman.png",
  "huns:Spotter": "assets/tribes/huns/spotter.png",
  "huns:Steppe Rider": "assets/tribes/huns/stepperider.png",
  "huns:Marksman": "assets/tribes/huns/marksman.png",
  "huns:Marauder": "assets/tribes/huns/marauder.png",
  "huns:Ram": "assets/tribes/general/ram.png",
  "huns:Catapult": "assets/tribes/general/catapult.png",
  "huns:Logades": "assets/tribes/huns/logades.png",
  "huns:Settler": "assets/tribes/general/settler.png",
  "egyptians:Slave Militia": "assets/tribes/egyptians/slave.png",
  "egyptians:Ash Warden": "assets/tribes/egyptians/ashwarden.png",
  "egyptians:Khopesh Warrior": "assets/tribes/egyptians/khopesh.png",
  "egyptians:Sopdu Explorer": "assets/tribes/egyptians/sopduexplorer.png",
  "egyptians:Anhur Guard": "assets/tribes/egyptians/anhurguard.png",
  "egyptians:Resheph Chariot": "assets/tribes/egyptians/reshephchariot.png",
  "egyptians:Ram": "assets/tribes/general/ram.png",
  "egyptians:Stone Catapult": "assets/tribes/general/catapult.png",
  "egyptians:Nomarch": "assets/tribes/egyptians/nomarch.png",
  "egyptians:Settler": "assets/tribes/general/settler.png",
  "spartans:Ram": "assets/tribes/spartans/ram.png",
  "spartans:Ballista": "assets/tribes/spartans/catapult.png",
  "spartans:Ephor": "assets/tribes/spartans/ephor.png",
  "spartans:Settler": "assets/tribes/spartans/settler.png",
  "vikings:Ram": "assets/tribes/general/ram.png",
  "vikings:Catapult": "assets/tribes/general/catapult.png"
};

const els = {
  profileCard: document.querySelector("#profileCard"),
  avatarInitial: document.querySelector("#avatarInitial"),
  avatarName: document.querySelector("#avatarName"),
  avatarMeta: document.querySelector("#avatarMeta"),
  profileServer: document.querySelector("#profileServer"),
  profileVillageCount: document.querySelector("#profileVillageCount"),
  sidebarVillageCount: document.querySelector("#sidebarVillageCount"),
  sidebarVillageOverview: document.querySelector("#sidebarVillageOverview"),
  avatarSelect: document.querySelector("#avatarSelect"),
  newAvatarButton: document.querySelector("#newAvatarButton"),
  editAvatarButton: document.querySelector("#editAvatarButton"),
  avatarDropdownButton: document.querySelector("#avatarDropdownButton"),
  pageTitle: document.querySelector("#pageTitle"),
  summaryStrip: document.querySelector("#summaryStrip"),
  roleFilters: document.querySelector("#roleFilters"),
  troopTribeFilter: document.querySelector("#troopTribeFilter"),
  troopSearchInput: document.querySelector("#troopSearchInput"),
  quantityInput: document.querySelector("#quantityInput"),
  smithyLevelInput: document.querySelector("#smithyLevelInput"),
  availableWoodIcon: document.querySelector("#availableWoodIcon"),
  availableClayIcon: document.querySelector("#availableClayIcon"),
  availableIronIcon: document.querySelector("#availableIronIcon"),
  availableCropIcon: document.querySelector("#availableCropIcon"),
  availableWoodInput: document.querySelector("#availableWoodInput"),
  availableClayInput: document.querySelector("#availableClayInput"),
  availableIronInput: document.querySelector("#availableIronInput"),
  availableCropInput: document.querySelector("#availableCropInput"),
  troopTable: document.querySelector("#troopTable"),
  buildingCategoryFilters: document.querySelector("#buildingCategoryFilters"),
  buildingSearchInput: document.querySelector("#buildingSearchInput"),
  fromLevelInput: document.querySelector("#fromLevelInput"),
  toLevelInput: document.querySelector("#toLevelInput"),
  buildingGrid: document.querySelector("#buildingGrid"),
  plannerUnit: document.querySelector("#plannerUnit"),
  plannerQuantity: document.querySelector("#plannerQuantity"),
  plannerBuildingLevel: document.querySelector("#plannerBuildingLevel"),
  trainingResult: document.querySelector("#trainingResult"),
  fromX: document.querySelector("#fromX"),
  fromY: document.querySelector("#fromY"),
  toX: document.querySelector("#toX"),
  toY: document.querySelector("#toY"),
  travelUnit: document.querySelector("#travelUnit"),
  travelResult: document.querySelector("#travelResult"),
  plannerBuilding: document.querySelector("#plannerBuilding"),
  plannerFromLevel: document.querySelector("#plannerFromLevel"),
  plannerToLevel: document.querySelector("#plannerToLevel"),
  buildingResult: document.querySelector("#buildingResult"),
  hubForm: document.querySelector("#hubForm"),
  hubVillageSelect: document.querySelector("#hubVillageSelect"),
  hubNameInput: document.querySelector("#hubNameInput"),
  hubList: document.querySelector("#hubList"),
  hubFlowDetails: document.querySelector("#hubFlowDetails"),
  routeForm: document.querySelector("#routeForm"),
  routeHubSelect: document.querySelector("#routeHubSelect"),
  routeFromVillage: document.querySelector("#routeFromVillage"),
  routeToVillage: document.querySelector("#routeToVillage"),
  routeTargetStatus: document.querySelector("#routeTargetStatus"),
  routeWoodInput: document.querySelector("#routeWoodInput"),
  routeClayInput: document.querySelector("#routeClayInput"),
  routeIronInput: document.querySelector("#routeIronInput"),
  routeCropInput: document.querySelector("#routeCropInput"),
  routeTripsInput: document.querySelector("#routeTripsInput"),
  routeLabelInput: document.querySelector("#routeLabelInput"),
  routeTimeInput: document.querySelector("#routeTimeInput"),
  routeRepeatEvery: document.querySelector("#routeRepeatEvery"),
  routeMerchantInfo: document.querySelector("#routeMerchantInfo"),
  routeTotalStatus: document.querySelector("#routeTotalStatus"),
  routeMerchantStatus: document.querySelector("#routeMerchantStatus"),
  routeResourceWarning: document.querySelector("#routeResourceWarning"),
  routeTravelPreview: document.querySelector("#routeTravelPreview"),
  routeSummary: document.querySelector("#routeSummary"),
  routeCount: document.querySelector("#routeCount"),
  routeList: document.querySelector("#routeList"),
  openTravianPasteDialogButton: document.querySelector("#openTravianPasteDialogButton"),
  resetVillagesButton: document.querySelector("#resetVillagesButton"),
  travianPagePasteStatus: document.querySelector("#travianPagePasteStatus"),
  travianPasteDialog: document.querySelector("#travianPasteDialog"),
  travianPasteForm: document.querySelector("#travianPasteForm"),
  travianPasteDialogStatus: document.querySelector("#travianPasteDialogStatus"),
  closeTravianPasteDialog: document.querySelector("#closeTravianPasteDialog"),
  travianTroopsPasteInput: document.querySelector("#travianTroopsPasteInput"),
  travianProductionPasteInput: document.querySelector("#travianProductionPasteInput"),
  travianVillageOverviewPasteInput: document.querySelector("#travianVillageOverviewPasteInput"),
  travianTroopsPasteSource: document.querySelector("#travianTroopsPasteSource"),
  travianProductionPasteSource: document.querySelector("#travianProductionPasteSource"),
  travianVillageOverviewPasteSource: document.querySelector("#travianVillageOverviewPasteSource"),
  travianImageInput: document.querySelector("#travianImageInput"),
  travianImageStatus: document.querySelector("#travianImageStatus"),
  importTravianPasteButton: document.querySelector("#importTravianPasteButton"),
  clearTravianPasteButton: document.querySelector("#clearTravianPasteButton"),
  villageList: document.querySelector("#villageList"),
  tribeCards: document.querySelector("#tribeCards"),
  sourceNotes: document.querySelector("#sourceNotes"),
  avatarDialog: document.querySelector("#avatarDialog"),
  avatarForm: document.querySelector("#avatarForm"),
  avatarDialogTitle: document.querySelector("#avatarDialogTitle"),
  closeAvatarDialog: document.querySelector("#closeAvatarDialog"),
  avatarNameInput: document.querySelector("#avatarNameInput"),
  serverPresetInput: document.querySelector("#serverPresetInput"),
  serverNameInput: document.querySelector("#serverNameInput"),
  serverUrlInput: document.querySelector("#serverUrlInput"),
  serverLookupButton: document.querySelector("#serverLookupButton"),
  serverLookupStatus: document.querySelector("#serverLookupStatus"),
  serverSpeedInput: document.querySelector("#serverSpeedInput"),
  serverVersionInput: document.querySelector("#serverVersionInput"),
  serverTribeCountInput: document.querySelector("#serverTribeCountInput"),
  avatarTribeInput: document.querySelector("#avatarTribeInput"),
  tribeUnlockedInput: document.querySelector("#tribeUnlockedInput"),
  deleteAvatarButton: document.querySelector("#deleteAvatarButton")
};

const tabTitles = {
  dashboard: "Dashboard",
  planning: "Planning",
  routes: "Trading Routes",
  calculators: "Calculators",
  knowledge: "Knowledge Center"
};

const ICONS = {
  wood: `<g stroke="#7a4518" stroke-width="1" stroke-linejoin="round">
    <rect x="3.5" y="12.2" width="14.5" height="4.4" rx="1.6" fill="#c57921" transform="rotate(-24 10.8 14.4)"/>
    <rect x="6.2" y="7.9" width="14" height="4.3" rx="1.5" fill="#e19a36" transform="rotate(-24 13.2 10)"/>
    <circle cx="5.8" cy="16.5" r="2" fill="#ffd36b"/>
    <circle cx="8.4" cy="11.6" r="1.9" fill="#ffe08d"/>
    <path d="M5.1 16.4h1.4M7.8 11.4h1.3" stroke="#8d551e"/>
  </g>`,
  clay: `<g stroke="#8b4b31" stroke-width=".9" stroke-linejoin="round">
    <path d="M4 12.3l5.2-3 5.4 2.2-5.3 3.3z" fill="#dd8150"/>
    <path d="M9.3 14.8l5.3-3.3 5.3 2.1-5.3 3.3z" fill="#c6643f"/>
    <path d="M4 12.3v3.1l5.3 2.4v-3z" fill="#b95737"/>
    <path d="M9.3 14.8v3l5.3 2.4v-3.3z" fill="#a84c32"/>
    <path d="M14.6 16.9l5.3-3.3v3.1l-5.3 3.5z" fill="#d57848"/>
    <path d="M8 12.8l5.3 2.3M11.8 13.3l5.3 2.2"/>
  </g>`,
  iron: `<g stroke="#59616c" stroke-width=".9" stroke-linejoin="round">
    <path d="M4.4 14.8l3.8-6.5 6.7-2 4.9 5.1-3.4 6.7-7.6 1.3z" fill="#9aa5b4"/>
    <path d="M8.2 8.3l3.8 5.2 2.9-7.2z" fill="#c8d0d8"/>
    <path d="M12 13.5l7.8-2.1-3.4 6.7z" fill="#75808e"/>
    <path d="M4.4 14.8l7.6-1.3-3.2 5.9z" fill="#6f7883"/>
    <path d="M7.2 15.1l2.3-.4M14.5 9.3l2.1 2"/>
  </g>`,
  crop: `<g stroke="#a36d08" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12.2 20.5V7.5" stroke-width="1.4"/>
    <path d="M11.9 7.6c-1.9-.5-3.1-2.1-3.4-4.6 2.5.5 3.6 2 3.4 4.6z" fill="#ffd447"/>
    <path d="M12.5 8.8c2-.3 3.5-1.7 4.2-4.1-2.6.1-4 1.4-4.2 4.1z" fill="#f7bf1d"/>
    <path d="M11.9 11.7c-2-.3-3.5-1.7-4.2-4.1 2.6.1 4 1.4 4.2 4.1z" fill="#ffdc52"/>
    <path d="M12.5 13.4c2-.3 3.5-1.7 4.2-4.1-2.6.1-4 1.4-4.2 4.1z" fill="#edb21b"/>
    <path d="M11.9 16.3c-2-.3-3.5-1.7-4.2-4.1 2.6.1 4 1.4 4.2 4.1z" fill="#f5c02c"/>
    <path d="M12.5 18c1.7-.4 3-1.6 3.7-3.7-2.2.1-3.5 1.2-3.7 3.7z" fill="#e0a716"/>
  </g>`,
  attack: `<g stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.8 18.6l13-13 1.7 1.7-13 13z" fill="#9db8d7" stroke="#557291" stroke-width=".9"/>
    <path d="M5.3 5.4l13.1 13.1-1.7 1.7L3.6 7.1z" fill="#8fb1d7" stroke="#557291" stroke-width=".9"/>
    <path d="M6 15l3 3M15 6l3 3M8.1 5.4L5.3 8.2M18.6 15.9l-2.7 2.8" stroke="#b4832b" stroke-width="2.2"/>
    <path d="M6 15l3 3M15 6l3 3" stroke="#6b4b19" stroke-width=".8"/>
  </g>`,
  defense: `<g stroke="#704112" stroke-width="1" stroke-linejoin="round">
    <path d="M12 3.3l7 2.7v5.4c0 4.4-2.7 7.3-7 9.2-4.3-1.9-7-4.8-7-9.2V6z" fill="#b66a1c"/>
    <path d="M12 5.2l4.9 1.8v4.1c0 3.2-1.8 5.4-4.9 7-3.1-1.6-4.9-3.8-4.9-7V7z" fill="#e1a23d"/>
    <path d="M12 5.2v12.9" stroke="#8b4c16"/>
    <path d="M8.4 9.8h7.2" stroke="#ffe09a"/>
  </g>`,
  cavalry: `<g stroke="#704112" stroke-width="1" stroke-linejoin="round">
    <path d="M12 3.4l7 2.6v5.4c0 4.4-2.7 7.3-7 9.1-4.3-1.8-7-4.7-7-9.1V6z" fill="#bd731f"/>
    <path d="M12 5.2l4.9 1.8v4c0 3.2-1.8 5.4-4.9 7-3.1-1.6-4.9-3.8-4.9-7V7z" fill="#f0b44a"/>
    <path d="M9 13.7c1.2-3.9 5.5-5.7 5.4-2.6 1 .4 1.4 1.1 1 2.2l-1.7-.7-.9 2.9-1.3-1.2-2.5 1.5z" fill="#6c4a24" stroke="#4a321b"/>
    <path d="M10.1 9.4l2 .6" stroke="#4a321b"/>
  </g>`,
  speed: `<g stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 15.5h6.3M4 18.5h4.8M5.7 12.4h9.4" stroke="#6e8dad" stroke-width="2"/>
    <path d="M12.8 6.1l6.8 5.4-6.8 5.4 1.4-4.1H8.8l1.7-2.6h3.7z" fill="#d5e5f3" stroke="#557291" stroke-width="1"/>
  </g>`,
  carry: `<g stroke="#7c5619" stroke-width="1" stroke-linejoin="round">
    <path d="M6.5 9h11l1.6 10.5H4.9z" fill="#d7952f"/>
    <path d="M8.6 9c0-2.4 1.4-4 3.4-4s3.4 1.6 3.4 4" fill="none" stroke="#6d4b17" stroke-width="1.5"/>
    <path d="M6.9 12.6h10.2M8 16h8" stroke="#ffe0a0"/>
  </g>`,
  upkeep: `<g stroke="#9c6a0d" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 18h14l-1.8 2H6.8z" fill="#d59425"/>
    <path d="M7 17c.5-3 2.4-4.7 5-4.7s4.5 1.7 5 4.7z" fill="#f3c747"/>
    <path d="M12 13V5" stroke-width="1.3"/>
    <path d="M12 5c-1.7.2-2.8 1.3-3.1 3.4 1.7-.2 2.8-1.3 3.1-3.4zM12.3 8.6c1.8-.1 3-1.2 3.4-3.2-1.9.1-3 1.1-3.4 3.2z" fill="#ffd84d"/>
  </g>`,
  training: `<g stroke="#6c4a1c" stroke-width="1" stroke-linejoin="round">
    <circle cx="12" cy="12" r="8" fill="#e3c777"/>
    <path d="M12 7v5l3.6 2.2" fill="none" stroke="#5b3d18" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M7.5 4.9l-1.8-2M16.5 4.9l1.8-2" stroke="#8a611f" stroke-linecap="round"/>
  </g>`,
  scout: `<g stroke="#5b3816" stroke-width="1" stroke-linejoin="round">
    <path d="M3.4 12s3.4-5.5 8.6-5.5 8.6 5.5 8.6 5.5-3.4 5.5-8.6 5.5S3.4 12 3.4 12z" fill="#d99931"/>
    <circle cx="12" cy="12" r="3.5" fill="#76501f"/>
    <circle cx="12" cy="12" r="1.5" fill="#ffe0a2"/>
  </g>`,
  siege: `<g stroke="#65451d" stroke-width="1" stroke-linejoin="round">
    <path d="M5 17.5h14v2H5z" fill="#8b5a24"/>
    <path d="M7.2 17.5l2.1-7h5.4l2.1 7z" fill="#b77a30"/>
    <path d="M9.1 10.6l6.8-4 2.1 2.7-7 4.2z" fill="#d1d5d9" stroke="#6d7885"/>
    <circle cx="8" cy="19.4" r="1.5" fill="#4a3218"/>
    <circle cx="16" cy="19.4" r="1.5" fill="#4a3218"/>
  </g>`,
  administrator: `<g stroke="#6a4218" stroke-width="1" stroke-linejoin="round">
    <path d="M6.8 20V4.2" stroke-width="2" stroke-linecap="round"/>
    <path d="M7.4 5.2h10.7l-2.1 4 2.1 4H7.4z" fill="#c94132"/>
    <path d="M8.7 7h6.8M8.7 10.8h6.5" stroke="#ffd0a4"/>
  </g>`,
  settler: `<g stroke="#704317" stroke-width="1" stroke-linejoin="round">
    <path d="M4 12l8-7 8 7-1.7 1.6L12 8.1l-6.3 5.5z" fill="#b96e28"/>
    <path d="M6.2 12.6v7h11.6v-7L12 7.8z" fill="#e6b56c"/>
    <path d="M10 19.6v-5h4v5M8.2 13h2.1M13.9 13h2" fill="none"/>
  </g>`,
  hybrid: `<g stroke-linecap="round" stroke-linejoin="round">
    <path d="M5.2 18.7L17.6 6.3l1.6 1.6L6.8 20.3z" fill="#9db8d7" stroke="#557291" stroke-width=".9"/>
    <path d="M6 8l5-2 5 2v3.7c0 3-1.7 5-5 6.6-3.3-1.6-5-3.6-5-6.6z" fill="#df9a32" stroke="#704112" stroke-width="1"/>
  </g>`,
  building: `<g stroke="#6f4219" stroke-width="1" stroke-linejoin="round">
    <path d="M4 20h16" stroke-width="1.6"/>
    <path d="M6 20V9l6-4 6 4v11z" fill="#d49a56"/>
    <path d="M10 20v-5h4v5M8.2 11h2.4M13.4 11h2.4" fill="none"/>
  </g>`,
  resource: `<g stroke="#6c471d" stroke-width="1" stroke-linejoin="round">
    <path d="M12 3.5l8 4.4-8 4.4-8-4.4z" fill="#d8a13c"/>
    <path d="M4 11.7l8 4.5 8-4.5v3.8L12 20 4 15.5z" fill="#b77729"/>
    <path d="M4 11.7l8 4.5 8-4.5" fill="none"/>
  </g>`,
  economy: `<g stroke="#71521a" stroke-width="1" stroke-linejoin="round">
    <circle cx="8.3" cy="12" r="4.2" fill="#f1c756"/>
    <circle cx="15.7" cy="12" r="4.2" fill="#d69b2e"/>
    <path d="M8.3 9.4v5.2M6.4 12h3.8M15.7 9.4v5.2M13.8 12h3.8" stroke="#704817"/>
  </g>`,
  storage: `<g stroke="#6a4218" stroke-width="1" stroke-linejoin="round">
    <path d="M5.2 9.2h13.6v10.5H5.2z" fill="#c9873b"/>
    <path d="M7.4 9.2V5.6h9.2v3.6" fill="#e0aa58"/>
    <path d="M7.8 12.4h8.4M7.8 15.8h8.4" stroke="#ffe0a0"/>
  </g>`,
  culture: `<g stroke="#6b4217" stroke-width="1" stroke-linejoin="round">
    <path d="M5 20h14" stroke-width="1.6"/>
    <path d="M7 20V8.4l5-3.6 5 3.6V20z" fill="#d9aa5c"/>
    <path d="M9 11.2h6M9 14.4h6M10.2 20v-3.4h3.6V20" fill="none"/>
  </g>`,
  diplomacy: `<g stroke="#6d4118" stroke-width="1" stroke-linejoin="round">
    <path d="M5.6 20V4.2" stroke-width="2" stroke-linecap="round"/>
    <path d="M6.5 5.1h11.2l-2.3 4 2.3 4H6.5z" fill="#5f8f68"/>
    <path d="M8 7h6.5M8 10.7h6.8" stroke="#d8f0d0"/>
  </g>`,
  hero: `<g stroke="#704112" stroke-width="1" stroke-linejoin="round">
    <path d="M12 3.2l2.6 5.2 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z" fill="#f0c743"/>
    <path d="M12 6.1l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" fill="#ffe68a" stroke="#a66f10"/>
  </g>`,
  artifact: `<g stroke="#56405f" stroke-width="1" stroke-linejoin="round">
    <path d="M12 3l7 7-7 11-7-11z" fill="#8d6dad"/>
    <path d="M5 10h14M12 3v18" stroke="#d9c5eb"/>
    <path d="M8.5 10l3.5-7 3.5 7-3.5 11z" fill="#b69ad0" opacity=".75"/>
  </g>`,
  all: `<g stroke="#6d4d1f" stroke-width="1.4" stroke-linecap="round">
    <circle cx="7" cy="7" r="2.3" fill="#d99a32"/>
    <circle cx="17" cy="7" r="2.3" fill="#8fa3b8"/>
    <circle cx="7" cy="17" r="2.3" fill="#b9583a"/>
    <circle cx="17" cy="17" r="2.3" fill="#e6bd33"/>
  </g>`
};

init();

function init() {
  state.db = loadDb();
  populateSelects();
  renderStaticIcons();
  applyAvatarToState();
  renderSegmentedControls();
  bindEvents();
  render();
  if (!activeAvatar()) {
    openAvatarDialog();
  }
}

function renderStaticIcons() {
  els.availableWoodIcon.innerHTML = icon("wood");
  els.availableClayIcon.innerHTML = icon("clay");
  els.availableIronIcon.innerHTML = icon("iron");
  els.availableCropIcon.innerHTML = icon("crop");
}

function populateSelects() {
  els.serverPresetInput.innerHTML = SERVER_PRESETS.map((server) => option(server.id, server.name)).join("");
  renderAvatarTribeOptions();

  els.plannerUnit.innerHTML = TROOPS.map((unit, index) => option(index, `${tribeName(unit.tribe)} - ${unit.name}`)).join("");
  els.travelUnit.innerHTML = TROOPS.map((unit, index) => option(index, `${tribeName(unit.tribe)} - ${unit.name} (${unit.speed})`)).join("");
  els.plannerBuilding.innerHTML = BUILDINGS.map((building, index) => option(index, building.name)).join("");
  els.troopTribeFilter.innerHTML = [
    option("all", "All tribes"),
    ...TRIBES.map((tribe) => option(tribe.id, tribe.name))
  ].join("");
  els.smithyLevelInput.innerHTML = Array.from({ length: 21 }, (_, level) => option(level, `Level ${level}`)).join("");
}

function renderSegmentedControls() {
  const roles = ["all", ...new Set(TROOPS.map((unit) => unit.role))];
  els.roleFilters.innerHTML = roles.map((role) => filterButton(role, roleLabel(role), state.role === role, roleIcon(role))).join("");

  const categories = ["all", ...new Set(BUILDINGS.map((building) => building.category))];
  els.buildingCategoryFilters.innerHTML = categories
    .map((category) => filterButton(category, titleCase(category), state.buildingCategory === category, categoryIcon(category)))
    .join("");
}

function bindEvents() {
  els.avatarSelect.addEventListener("change", (event) => {
    state.db.activeAvatarId = event.target.value;
    saveDb();
    applyAvatarToState();
    render();
  });

  els.newAvatarButton.addEventListener("click", () => openAvatarDialog());
  els.editAvatarButton.addEventListener("click", () => openAvatarDialog(activeAvatar()?.id));
  els.avatarDropdownButton.addEventListener("click", () => openAvatarSwitcher());
  els.closeAvatarDialog.addEventListener("click", () => {
    if (activeAvatar()) {
      els.avatarDialog.close();
    }
  });
  els.avatarDialog.addEventListener("cancel", (event) => {
    if (!activeAvatar()) {
      event.preventDefault();
    }
  });

  els.serverPresetInput.addEventListener("change", applyServerPreset);
  els.serverLookupButton.addEventListener("click", lookupServerFromForm);
  els.serverUrlInput.addEventListener("blur", lookupServerFromForm);
  els.serverUrlInput.addEventListener("input", () => {
    els.serverLookupStatus.textContent = "Server will be read from this link.";
  });
  els.serverTribeCountInput.addEventListener("change", renderAvatarTribeOptions);
  els.serverVersionInput.addEventListener("change", () => {
    if (els.serverPresetInput.value === "custom") {
      const version = els.serverVersionInput.value;
      els.tribeUnlockedInput.checked = version === "special" || version === "northern";
    }
  });
  els.avatarForm.addEventListener("submit", saveAvatarFromForm);
  els.deleteAvatarButton.addEventListener("click", deleteEditingAvatar);
  els.openTravianPasteDialogButton.addEventListener("click", openTravianPasteDialog);
  els.resetVillagesButton.addEventListener("click", resetActiveAvatarVillages);
  els.closeTravianPasteDialog.addEventListener("click", () => els.travianPasteDialog.close());
  els.clearTravianPasteButton.addEventListener("click", () => {
    els.travianTroopsPasteInput.value = "";
    els.travianProductionPasteInput.value = "";
    els.travianVillageOverviewPasteInput.value = "";
    clearTravianOcrState();
    setTravianPasteStatus("");
  });
  els.importTravianPasteButton.addEventListener("click", importPastedTravianPages);
  els.travianImageInput.addEventListener("change", storeTravianImageSelection);
  els.hubForm.addEventListener("submit", addTradingHub);
  els.hubList.addEventListener("click", handleHubListClick);
  els.routeForm.addEventListener("submit", addTradingRoute);
  els.routeForm.addEventListener("input", updateRouteFormPreview);
  els.routeForm.addEventListener("change", updateRouteFormPreview);
  els.routeList.addEventListener("click", handleRouteListClick);
  els.routeList.addEventListener("change", handleRouteListChange);

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("is-visible"));
      document.querySelector(`#${state.tab}Panel`).classList.add("is-visible");
      render();
    });
  });

  document.querySelectorAll("[data-planning-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.planningView = button.dataset.planningView;
      renderPlanning();
    });
  });

  els.quantityInput.addEventListener("input", (event) => {
    state.quantity = Math.max(1, Number(event.target.value) || 1);
    renderTroops();
  });

  els.smithyLevelInput.addEventListener("change", (event) => {
    state.smithyLevel = clamp(Number(event.target.value) || 0, 0, 20);
    renderTroops();
  });

  els.troopTribeFilter.addEventListener("change", (event) => {
    state.tribe = event.target.value;
    renderTroops();
  });

  els.troopSearchInput.addEventListener("input", (event) => {
    state.troopQuery = event.target.value.trim().toLowerCase();
    renderTroops();
  });

  els.buildingSearchInput.addEventListener("input", (event) => {
    state.buildingQuery = event.target.value.trim().toLowerCase();
    renderBuildings();
  });

  [
    ["wood", els.availableWoodInput],
    ["clay", els.availableClayInput],
    ["iron", els.availableIronInput],
    ["crop", els.availableCropInput]
  ].forEach(([resource, input]) => {
    input.addEventListener("input", () => {
      state.availableResources[resource] = Math.max(0, Number(input.value) || 0);
      renderTroops();
    });
  });

  els.roleFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    state.role = button.dataset.value;
    renderSegmentedControls();
    renderTroops();
  });

  els.buildingCategoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    state.buildingCategory = button.dataset.value;
    renderSegmentedControls();
    renderBuildings();
  });

  [
    els.fromLevelInput,
    els.toLevelInput,
    els.plannerUnit,
    els.plannerQuantity,
    els.plannerBuildingLevel,
    els.fromX,
    els.fromY,
    els.toX,
    els.toY,
    els.travelUnit,
    els.plannerBuilding,
    els.plannerFromLevel,
    els.plannerToLevel
  ].forEach((input) => input.addEventListener("input", renderCalculators));
}

function render() {
  els.pageTitle.textContent = tabTitles[state.tab];
  renderProfile();
  renderSummary();
  renderDashboard();
  renderPlanning();
  renderTroops();
  renderBuildings();
  renderRoutes();
  renderCalculators();
  renderKnowledge();
}

function renderSummary() {
  if (state.tab === "dashboard") {
    els.summaryStrip.hidden = true;
    els.summaryStrip.innerHTML = "";
    return;
  }

  els.summaryStrip.hidden = false;
  const avatar = activeAvatar();
  const units = filteredTroops({ ignoreRole: true });
  const buildings = filteredBuildings();
  const fastest = units.reduce((best, unit) => (unit.speed > (best?.speed ?? -1) ? unit : best), null);
  const bestAttack = units
    .filter((unit) => unit.attack > 0 && unit.cost.total)
    .sort((a, b) => b.attack / b.cost.total - a.attack / a.cost.total)[0];
  const bestDefense = units
    .filter((unit) => unit.cost.total)
    .sort((a, b) => (b.defInf + b.defCav) / b.cost.total - (a.defInf + a.defCav) / a.cost.total)[0];

  els.summaryStrip.innerHTML = [
    metric("Avatar", avatar ? avatar.name : "None"),
    metric("Server", avatar ? avatarServer(avatar).name : "-"),
    metric("Villages", avatar ? avatar.villages.length : 0),
    metric("Units", units.length),
    metric("Atk/resource", bestAttack ? bestAttack.name : "-"),
    metric("Def/resource", bestDefense ? bestDefense.name : "-")
  ].join("");
}

function renderPlanning() {
  document.querySelectorAll("[data-planning-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.planningView === state.planningView);
  });

  document.querySelectorAll(".planning-view").forEach((view) => {
    view.classList.remove("is-visible");
  });
  document.querySelector(`#planning${titleCase(state.planningView)}View`)?.classList.add("is-visible");
}

function renderProfile() {
  const avatars = state.db.avatars;
  const avatar = activeAvatar();

  els.avatarSelect.innerHTML = avatars.length
    ? avatars.map((item) => option(item.id, item.name)).join("")
    : option("", "No avatars yet");
  els.avatarSelect.value = avatar?.id ?? "";
  els.editAvatarButton.disabled = !avatar;
  els.avatarDropdownButton.hidden = avatars.length < 2;

  if (!avatar) {
    els.avatarInitial.classList.remove("has-image");
    els.avatarInitial.textContent = "?";
    els.avatarName.textContent = "No avatar";
    els.avatarMeta.textContent = "Create an avatar to begin.";
    els.profileServer.textContent = "-";
    els.profileVillageCount.textContent = "0";
    renderSidebarVillages(null);
    return;
  }

  const server = avatarServer(avatar);
  els.avatarInitial.classList.toggle("has-image", Boolean(TRIBE_ICON_FILES[avatar.tribe]));
  els.avatarInitial.innerHTML = TRIBE_ICON_FILES[avatar.tribe]
    ? imageIcon(TRIBE_ICON_FILES[avatar.tribe], `tribe-${avatar.tribe}`, " avatar-tribe-icon")
    : escapeHtml(avatar.name.slice(0, 2).toUpperCase());
  els.avatarName.textContent = avatar.name;
  els.avatarMeta.textContent = "";
  els.profileServer.textContent = server.name;
  els.profileVillageCount.textContent = avatar.villages.length;
  renderSidebarVillages(avatar);
}

function renderSidebarVillages(avatar) {
  if (!avatar || !avatar.villages.length) {
    els.sidebarVillageCount.textContent = "0";
    els.sidebarVillageOverview.innerHTML = `<div class="sidebar-empty">No villages yet.</div>`;
    return;
  }

  const villages = sortedVillages(avatar);
  els.sidebarVillageCount.textContent = villages.length;
  els.sidebarVillageOverview.innerHTML = villages.map((village) => `
    <div class="sidebar-village-row">
      <strong>${escapeHtml(village.name)}</strong>
      <span>${formatNumber(village.population || 0)} pop</span>
      <small>(${Number(village.x) || 0} | ${Number(village.y) || 0})</small>
    </div>
  `).join("");
}

function sortedVillages(avatar) {
  return [...(avatar?.villages || [])].sort((left, right) => {
    const popDiff = Number(right.population || 0) - Number(left.population || 0);
    return popDiff || String(left.name || "").localeCompare(String(right.name || ""));
  });
}

function renderDashboard() {
  const avatar = activeAvatar();
  renderTravianPagePastePanel(avatar);

  if (!avatar) {
    els.villageList.innerHTML = `<div class="empty">No avatar yet.</div>`;
    return;
  }

  if (!avatar.villages.length) {
    els.villageList.innerHTML = `<div class="empty">No villages registered yet.</div>`;
    return;
  }

  els.villageList.innerHTML = `
    <div class="village-list-head">
      <h3>Village Command</h3>
      <span>${villageCommandTotals(avatar)}</span>
    </div>
    <div class="dashboard-subtabs" aria-label="Village command views">
      <button class="${state.dashboardView === "villages" ? "is-active" : ""}" data-dashboard-view="villages" type="button">Villages</button>
      <button class="${state.dashboardView === "troops" ? "is-active" : ""}" data-dashboard-view="troops" type="button">Troops</button>
      <button class="${state.dashboardView === "production" ? "is-active" : ""}" data-dashboard-view="production" type="button">Production</button>
    </div>
    ${villageCommandTable(avatar, state.dashboardView)}
  `;

  els.villageList.querySelectorAll("[data-dashboard-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.dashboardView = button.dataset.dashboardView;
      renderDashboard();
    });
  });

  els.villageList.querySelectorAll("[data-village-id]").forEach((button) => {
    button.addEventListener("click", () => removeVillage(button.dataset.villageId));
  });

  els.villageList.querySelectorAll("[data-village-type]").forEach((select) => {
    select.addEventListener("change", () => updateVillageMetadata(select.dataset.villageType, { type: select.value }));
  });

  els.villageList.querySelectorAll("[data-village-oasis-slot]").forEach((select) => {
    select.addEventListener("change", () => {
      const villageId = select.dataset.villageOasisSlot;
      const selected = [...els.villageList.querySelectorAll(`[data-village-oasis-slot="${villageId}"]`)]
        .map((item) => item.value)
        .filter(Boolean);
      updateVillageMetadata(villageId, { oases: selected });
    });
  });

}

function renderTravianPagePastePanel(avatar) {
  els.openTravianPasteDialogButton.disabled = !avatar;
  els.resetVillagesButton.disabled = !avatar;
  els.travianTroopsPasteInput.disabled = !avatar;
  els.travianProductionPasteInput.disabled = !avatar;
  els.travianVillageOverviewPasteInput.disabled = !avatar;
  els.travianImageInput.disabled = !avatar;
  els.importTravianPasteButton.disabled = !avatar;
  els.clearTravianPasteButton.disabled = !avatar;
  if (!avatar) {
    setTravianPasteStatus("Create an avatar first.");
  } else if (!els.travianPagePasteStatus.textContent) {
    setTravianPasteStatus("");
  }
}

function setTravianPasteStatus(message) {
  els.travianPagePasteStatus.textContent = message;
  els.travianPagePasteStatus.hidden = !message;
  els.travianPasteDialogStatus.textContent = message;
  els.travianPasteDialogStatus.hidden = !message;
}

function villageCommandTotals(avatar) {
  const villages = avatar?.villages || [];
  const population = villages.reduce((sum, village) => sum + Math.max(0, Number(village.population || 0)), 0);
  const production = villages.reduce((sum, village) => {
    const current = villageProduction(village);
    return sum + current.wood + current.clay + current.iron + villageCropNet(village);
  }, 0);
  return `${villages.length} villages / ${formatNumber(population)} pop / ${formatNumber(villageArmyTotal(avatar))} troops / ${formatNumber(production)} prod/h`;
}

function villageCommandTable(avatar, view) {
  const units = villageTroopUnits(avatar);
  if (view === "troops") return villageTroopsTable(avatar, units);
  if (view === "production") return villageProductionTable(avatar);
  return villageOverviewTable(avatar);
}

function villageOverviewTable(avatar) {
  return `
    <div class="village-command-wrap">
      <table class="village-command-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pop</th>
            <th>Coordinates</th>
            <th>Type</th>
            <th>O1</th>
            <th>O2</th>
            <th>O3</th>
          </tr>
        </thead>
        <tbody>
          ${sortedVillages(avatar).map((village) => villageOverviewRow(village)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function villageTroopsTable(avatar, units) {
  return `
    <div class="village-command-wrap">
      <table class="village-command-table">
        <thead>
          <tr>
            <th>Name</th>
            ${units.map((unit) => `<th title="${escapeHtml(unit.name)}">${troopIcon(unit)}</th>`).join("")}
            <th title="OFF strength">${icon("attack")}</th>
            <th title="DEF strength">${icon("defense")}</th>
          </tr>
        </thead>
        <tbody>
          ${sortedVillages(avatar).map((village) => villageTroopsRow(avatar, village, units)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function villageProductionTable(avatar) {
  return `
    <div class="village-command-wrap">
      <table class="village-command-table">
        <thead>
          <tr>
            <th>Name</th>
            <th title="Wood">${icon("wood")}</th>
            <th title="Clay">${icon("clay")}</th>
            <th title="Iron">${icon("iron")}</th>
            <th title="Crop">${icon("crop")}</th>
            <th title="Population crop consumption">${icon("upkeep")}</th>
            <th title="Troop crop consumption">${icon("upkeep")}</th>
            <th title="Crop net">${icon("crop")}</th>
          </tr>
        </thead>
        <tbody>
          ${sortedVillages(avatar).map((village) => villageProductionRow(avatar, village)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function villageOverviewRow(village) {
  return `
    <tr>
      <th scope="row" class="village-name-cell">${escapeHtml(village.name)}</th>
      <td class="number-cell">${formatNumber(village.population || 0)}</td>
      <td class="coordinate-cell">(${Number(village.x) || 0} | ${Number(village.y) || 0})</td>
      <td>
        <select class="table-select type-select" data-village-type="${village.id}">
          ${villageTypeOptions(village.type)}
        </select>
      </td>
      ${[0, 1, 2].map((slot) => `
        <td class="oasis-cell">
          <div class="oasis-select-shell">
            <span class="oasis-select-icons">${selectedOasisIcons(village.oases?.[slot] || "")}</span>
            <select class="table-select oasis-select" data-village-oasis-slot="${village.id}" data-oasis-slot="${slot}" aria-label="Oasis ${slot + 1}">
              ${oasisSelectOptions(village.oases?.[slot] || "")}
            </select>
          </div>
        </td>
      `).join("")}
    </tr>
  `;
}

function villageTroopsRow(avatar, village, units) {
  const summary = villageTroopSummary(avatar, village);
  const counts = villageTroopCounts(village);
  return `
    <tr>
      <th scope="row" class="village-name-cell">${escapeHtml(village.name)}</th>
      ${units.map((unit) => `
        <td class="number-cell">${formatNumber(counts[troopKey(unit)] || 0)}</td>
      `).join("")}
      <td class="strength-cell">${formatNumber(summary.attack)}</td>
      <td class="strength-cell" title="${formatNumber(summary.defInf)} infantry / ${formatNumber(summary.defCav)} cavalry">${formatNumber(summary.defInf + summary.defCav)}</td>
    </tr>
  `;
}

function villageProductionRow(avatar, village) {
  const production = villageProduction(village);
  const summary = villageTroopSummary(avatar, village);
  const popUse = villagePopulationCropUse(village);
  const cropNet = villageCropNet(village, summary);
  return `
    <tr>
      <th scope="row" class="village-name-cell">${escapeHtml(village.name)}</th>
      ${["wood", "clay", "iron", "crop"].map((resource) => `
        <td class="number-cell">${formatNumber(production[resource] || 0)}</td>
      `).join("")}
      <td class="number-cell">${formatNumber(popUse)}</td>
      <td class="number-cell">${formatNumber(summary.upkeep)}</td>
      <td class="number-cell ${cropNet < 0 ? "negative-number" : ""}">${formatNumber(cropNet)}</td>
    </tr>
  `;
}

function villageProduction(village) {
  const production = village.production || {};
  const resources = village.resources || {};
  return {
    wood: Math.max(0, Number(production.wood ?? resources.wood ?? 0)),
    clay: Math.max(0, Number(production.clay ?? resources.clay ?? 0)),
    iron: Math.max(0, Number(production.iron ?? resources.iron ?? 0)),
    crop: Math.max(0, Number(production.crop ?? resources.crop ?? 0))
  };
}

function villageCropNet(village, summary = null) {
  if (village.cropNetOverride !== undefined && village.cropNetOverride !== null) {
    return Number(village.cropNetOverride) || 0;
  }
  const production = villageProduction(village);
  const troopSummary = summary || villageTroopSummary(activeAvatar(), village);
  return production.crop - troopSummary.upkeep - villagePopulationCropUse(village);
}

function villagePopulationCropUse(village) {
  return Math.max(0, Number(village.population || 0));
}

function villageTroopUnits(avatar) {
  return TROOPS.filter((unit) => unit.tribe === avatar.tribe);
}

function villageResourceShowcase(village) {
  const resources = village.resources;
  if (!resources) return "";

  const total = ["wood", "clay", "iron", "crop"].reduce((sum, resource) => sum + Number(resources[resource] || 0), 0);

  return `
    <div class="village-resource-showcase">
      <span>${icon("wood")}${formatNumber(resources.wood || 0)}</span>
      <span>${icon("clay")}${formatNumber(resources.clay || 0)}</span>
      <span>${icon("iron")}${formatNumber(resources.iron || 0)}</span>
      <span>${icon("crop")}${formatNumber(resources.crop || 0)}</span>
      <strong>Total ${formatNumber(total)}</strong>
    </div>
  `;
}

function villageResourceEditor(village) {
  const resources = village.resources || {};
  return `
    <div class="resource-editor">
      ${["wood", "clay", "iron", "crop"].map((resource) => `
        <label>
          <span>${icon(resource)}${titleCase(resource)}</span>
          <input data-village-resource="${village.id}" data-resource-key="${resource}" type="number" min="0" step="1" value="${Math.max(0, Number(resources[resource] || 0))}" />
        </label>
      `).join("")}
    </div>
  `;
}

function troopKey(unit) {
  return `${unit.tribe}:${unit.name}`;
}

function villageTroopCounts(village) {
  return village.troops && typeof village.troops === "object" ? village.troops : {};
}

function villageTroopSummary(avatar, village) {
  const counts = villageTroopCounts(village);
  return villageTroopUnits(avatar).reduce((summary, unit) => {
    const count = Math.max(0, Number(counts[troopKey(unit)] || 0));
    if (!count) return summary;

    summary.total += count;
    summary.upkeep += count * unit.upkeep;
    summary.attack += count * unit.attack;
    summary.defInf += count * unit.defInf;
    summary.defCav += count * unit.defCav;
    summary.carry += count * unit.carry;
    summary.activeUnits += 1;
    return summary;
  }, { total: 0, upkeep: 0, attack: 0, defInf: 0, defCav: 0, carry: 0, activeUnits: 0 });
}

function villageArmyTotal(avatar) {
  if (!avatar) return 0;
  return avatar.villages.reduce((sum, village) => sum + villageTroopSummary(avatar, village).total, 0);
}

function villageTroopShowcase(avatar, village) {
  const summary = villageTroopSummary(avatar, village);
  const topUnits = villageTroopUnits(avatar)
    .map((unit) => ({ unit, count: Math.max(0, Number(villageTroopCounts(village)[troopKey(unit)] || 0)) }))
    .filter((item) => item.count > 0)
    .sort((left, right) => right.count - left.count)
    .slice(0, 4);

  return `
    <div class="village-troop-showcase">
      <div class="troop-summary-grid">
        ${troopSummaryMetric("Troops", formatNumber(summary.total), "all")}
        ${troopSummaryMetric("Upkeep", formatNumber(summary.upkeep), "upkeep")}
        ${troopSummaryMetric("Attack", formatNumber(summary.attack), "attack")}
        ${troopSummaryMetric("Defense", `${formatNumber(summary.defInf)} / ${formatNumber(summary.defCav)}`, "defense")}
      </div>
      <div class="top-troops">
        ${topUnits.length
          ? topUnits.map(({ unit, count }) => `<span>${troopIcon(unit)}<b>${formatNumber(count)}</b> ${escapeHtml(unit.name)}</span>`).join("")
          : `<span class="empty-inline">No troops recorded.</span>`}
      </div>
    </div>
  `;
}

function troopSummaryMetric(label, value, iconName) {
  return `
    <div>
      <span>${icon(iconName)}${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function villageTroopEditor(avatar, village) {
  const counts = villageTroopCounts(village);
  return `
    <div class="troop-editor">
      ${villageTroopUnits(avatar).map((unit) => `
        <label>
          <span>${troopIcon(unit)}${escapeHtml(unit.name)}</span>
          <input data-village-troop="${village.id}" data-troop-key="${escapeHtml(troopKey(unit))}" type="number" min="0" step="1" value="${Math.max(0, Number(counts[troopKey(unit)] || 0))}" />
        </label>
      `).join("")}
    </div>
  `;
}

function parseTravianOverviewPaste(rawText) {
  const text = normalizeTravianPasteText(rawText);
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const coordinates = parseVillageCoordinates(lines);
  const populations = parseVillagePopulations(lines);
  const troopTable = parseTroopsInVillagesTable(lines);
  const mobileTroopTable = parseMobileTeutonTroopScreenshot(lines);
  const productionTable = parseProductionOverviewTable(lines);
  const mobileProductionTable = parseMobileResourceProductionScreenshot(lines);
  const profileVillageTable = parseProfileVillageOverviewTable(lines);
  const mobileVillageTable = parseMobileVillageOverviewScreenshot(lines);
  const villagesByName = new Map();

  [...troopTable.villages, ...mobileTroopTable.villages, ...productionTable.villages, ...mobileProductionTable.villages, ...profileVillageTable.villages, ...mobileVillageTable.villages].forEach((village) => {
    const key = normalizeVillageNameForPaste(village.name);
    const existing = villagesByName.get(key) || { name: village.name };
    villagesByName.set(key, { ...existing, ...village });
  });

  return {
    headers: troopTable.headers.length ? troopTable.headers : mobileTroopTable.headers,
    syncVillages: Boolean(troopTable.villages.length || productionTable.villages.length || profileVillageTable.villages.length),
    villages: [...villagesByName.values()].map((village) => {
      const key = normalizeVillageNameForPaste(village.name);
      return {
        ...village,
        population: populations.get(key) ?? village.population,
        coords: village.coords || coordinates.get(key) || null
      };
    })
  };
}

function mergeParsedTravianPastes(...parts) {
  const headers = [];
  const villagesByName = new Map();

  parts.forEach((part) => {
    part.headers.forEach((header) => {
      if (!headers.some((existing) => normalizeLookupText(existing) === normalizeLookupText(header))) {
        headers.push(header);
      }
    });

    part.villages.forEach((village) => {
      const key = normalizeVillageNameForPaste(village.name);
      const existing = villagesByName.get(key) || { name: village.name };
      villagesByName.set(key, {
        ...existing,
        ...village,
        coords: village.coords || existing.coords || null,
        troopCounts: village.troopCounts || existing.troopCounts,
        production: village.production || existing.production,
        cropNetOverride: village.cropNetOverride ?? existing.cropNetOverride,
        population: village.population ?? existing.population,
        isCapital: village.isCapital ?? existing.isCapital
      });
    });
  });

  return { headers, syncVillages: parts.some((part) => part.syncVillages), villages: [...villagesByName.values()] };
}

function parseTroopsInVillagesTable(lines) {
  const headerIndex = lines.findIndex((line) => {
    const columns = splitTravianTableLine(line);
    return normalizeLookupText(columns[0]) === "village" && columns.slice(1).filter((column) => troopHeaderUnit(column)).length >= 3;
  });

  if (headerIndex < 0) {
    return { headers: [], villages: [] };
  }

  const headers = splitTravianTableLine(lines[headerIndex]).slice(1);
  const villages = [];

  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const columns = splitTravianTableLine(line);
    if (!columns.length) continue;
    if (/^sum$/i.test(columns[0])) break;
    if (columns.length < headers.length + 1) continue;

    const name = columns[0].trim();
    const troopCounts = {};
    headers.forEach((header, headerIndex) => {
      const value = cleanInteger(columns[headerIndex + 1]);
      troopCounts[header] = value || 0;
    });
    villages.push({ name, troopCounts });
  }

  return { headers, villages };
}

function parseMobileTeutonTroopScreenshot(lines) {
  const villages = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const coords = parseTravianCoords(line);
    if (!coords) continue;

    const name = mobileVillageNameFromHeader(line);
    if (!looksLikeVillageName(name)) continue;

    const values = [];
    for (let next = index + 1; next < lines.length && values.length < TEUTON_TROOP_HEADERS.length; next += 1) {
      const nextLine = lines[next];
      if (parseTravianCoords(nextLine) || /^total\b/i.test(normalizeLookupText(nextLine))) break;
      values.push(...extractCompactNumbers(nextLine));
    }

    if (values.length < TEUTON_TROOP_HEADERS.length) continue;

    const troopCounts = {};
    TEUTON_TROOP_HEADERS.forEach((header, troopIndex) => {
      troopCounts[header] = cleanCompactNumber(values[troopIndex]);
    });
    villages.push({ name, coords, troopCounts });
  }

  return { headers: TEUTON_TROOP_HEADERS, villages };
}

function parseMobileVillageOverviewScreenshot(lines) {
  const context = normalizeLookupText(lines.slice(0, 12).join(" "));
  if (!context.includes("villages with") && !context.includes("player info")) {
    return { villages: [] };
  }

  const villages = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const coords = parseTravianCoords(line);
    if (!coords) continue;

    const name = mobileVillageNameFromHeader(line);
    if (!looksLikeVillageName(name)) continue;

    let population = null;
    let isCapital = false;

    for (let next = index + 1; next < Math.min(lines.length, index + 5); next += 1) {
      const nextLine = lines[next];
      if (parseTravianCoords(nextLine)) break;
      if (/^capital$/i.test(normalizeLookupText(nextLine))) {
        isCapital = true;
        continue;
      }
      const match = normalizeTravianPasteText(nextLine).match(/\b\d{2,6}\b(?!\s*k)/i);
      if (match) {
        population = cleanInteger(match[0]);
        break;
      }
    }

    if (population !== null) {
      villages.push({ name, coords, population, isCapital });
    }
  }

  return { villages };
}

function mobileVillageNameFromHeader(line) {
  return normalizeTravianPasteText(line)
    .replace(/\((-?\d+)\s*[|lI]\s*(-?\d+)\)/, "")
    .replace(/^[^A-Za-z\u00c0-\u024f]+/u, "")
    .trim();
}

function extractCompactNumbers(line) {
  return normalizeTravianPasteText(line).match(/\b\d+(?:[.,]\d+)?\s*k?\b/gi) || [];
}

function cleanCompactNumber(value) {
  const text = normalizeTravianPasteText(value).toLowerCase().replace(/\s+/g, "");
  const multiplier = text.endsWith("k") ? 1000 : 1;
  const number = Number(text.replace("k", "").replace(",", "."));
  return Number.isFinite(number) ? Math.round(number * multiplier) : 0;
}

function parseProductionOverviewTable(lines) {
  const headerIndex = lines.findIndex((line, index) => {
    const columns = splitTravianTableLine(line);
    if (normalizeLookupText(columns[0]) !== "village") return false;
    const sectionText = normalizeLookupText(lines.slice(Math.max(0, index - 10), index + 1).join(" "));
    if (sectionText.includes("resources") && sectionText.includes("production")) return true;

    const nextRowColumns = splitTravianTableLine(lines[index + 1] || "");
    return nextRowColumns.length === 5 && nextRowColumns.slice(1, 5).every((column) => cleanInteger(column) > 0);
  });

  if (headerIndex < 0) {
    return { villages: [] };
  }

  const villages = [];

  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    const columns = splitTravianTableLine(lines[index]);
    if (!columns.length) continue;
    if (/^sum:?/i.test(columns[0])) break;
    if (columns.length !== 5) continue;

    villages.push({
      name: columns[0].trim(),
      production: {
        wood: cleanInteger(columns[1]),
        clay: cleanInteger(columns[2]),
        iron: cleanInteger(columns[3]),
        crop: cleanInteger(columns[4])
      }
    });
  }

  return { villages };
}

function parseMobileResourceProductionScreenshot(lines) {
  const villages = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const coords = parseTravianCoords(line);
    if (!coords) continue;

    const name = mobileVillageNameFromHeader(line);
    if (!looksLikeVillageName(name)) continue;

    const values = [];
    for (let next = index + 1; next < lines.length && values.length < 4; next += 1) {
      const nextLine = lines[next];
      if (parseTravianCoords(nextLine)) break;
      values.push(...extractHourlyProductionNumbers(nextLine));
    }

    if (values.length < 4) continue;

    const wood = cleanSignedInteger(values[0]);
    const clay = cleanSignedInteger(values[1]);
    const iron = cleanSignedInteger(values[2]);
    const cropNet = cleanSignedInteger(values[3]);
    villages.push({
      name,
      coords,
      production: { wood, clay, iron, crop: cropNet },
      cropNetOverride: cropNet
    });
  }

  return { villages };
}

function extractHourlyProductionNumbers(line) {
  return normalizeTravianPasteText(line).match(/[+\-−]?\s*\d[\d.,]*\s*\/\s*h/gi) || [];
}

function cleanSignedInteger(value) {
  const text = normalizeTravianPasteText(value).replace(/\/\s*h/gi, "").replace(/\s+/g, "");
  const sign = text.trim().startsWith("-") ? -1 : 1;
  const number = Number(text.replace(/[^\d]/g, ""));
  return Number.isFinite(number) ? sign * number : 0;
}

function parseProfileVillageOverviewTable(lines) {
  const headerIndex = lines.findIndex((line) => {
    const normalized = normalizeLookupText(line);
    return normalized.includes("village name") && normalized.includes("coordinates");
  });

  if (headerIndex < 0) {
    return { villages: [] };
  }

  const villages = [];
  let pendingVillage = null;

  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const normalized = normalizeLookupText(line);
    if (/^(villages|village groups|task overview|homepage)$/i.test(normalized)) break;

    const coords = parseTravianCoords(line);
    if (pendingVillage && !coords && normalized && !/^\(?capital\)?$/i.test(normalized) && !looksLikeVillageName(line)) break;
    if (pendingVillage && coords) {
      pendingVillage.coords = coords;
      pendingVillage.population = cleanProfilePopulation(line);
      villages.push(pendingVillage);
      pendingVillage = null;
      continue;
    }

    if (pendingVillage && /^\(?capital\)?$/i.test(normalized)) {
      pendingVillage.isCapital = true;
      continue;
    }

    if (coords) {
      const inlineName = line.replace(/\(-?\d+\s*\|\s*-?\d+\)/, "").replace(/\d+/g, "").trim();
      if (looksLikeVillageName(inlineName)) {
        villages.push({
          name: inlineName,
          coords,
          population: cleanProfilePopulation(line)
        });
      }
      continue;
    }

    if (looksLikeVillageName(line)) {
      pendingVillage = { name: line, isCapital: false };
    }
  }

  return { villages };
}

function cleanProfilePopulation(value) {
  const beforeCoords = normalizeTravianPasteText(value).split("(")[0];
  return cleanInteger(beforeCoords);
}

function splitTravianTableLine(line) {
  if (line.includes("\t")) {
    return line.split("\t").map((column) => column.trim()).filter((column) => column !== "");
  }

  return line.split(/\s{2,}/).map((column) => column.trim()).filter(Boolean);
}

function parseVillageCoordinates(lines) {
  const coordinates = new Map();
  lines.forEach((line, index) => {
    const coords = parseTravianCoords(line);
    if (!coords) return;

    const inlineName = line.replace(/\(-?\d+\s*\|\s*-?\d+\)/, "").trim();
    const name = looksLikeVillageName(inlineName) ? inlineName : previousVillageNameLine(lines, index);
    if (name) {
      coordinates.set(normalizeVillageNameForPaste(name), coords);
    }
  });
  return coordinates;
}

function parseVillagePopulations(lines) {
  const populations = new Map();
  lines.forEach((line, index) => {
    if (!/^population:/i.test(line)) return;
    const name = previousVillageNameLine(lines, index);
    if (!name) return;
    populations.set(normalizeVillageNameForPaste(name), cleanInteger(line));
  });
  return populations;
}

function previousVillageNameLine(lines, coordIndex) {
  for (let index = coordIndex - 1; index >= Math.max(0, coordIndex - 3); index -= 1) {
    const candidate = lines[index]?.trim();
    if (!candidate || parseTravianCoords(candidate)) continue;
    if (!looksLikeVillageName(candidate)) continue;
    return candidate;
  }
  return "";
}

function looksLikeVillageName(value) {
  const candidate = String(value || "").trim();
  if (!candidate) return false;
  if (/^(today|yesterday|village|villages|village groups|task overview|homepage|overview|resources|troops|sum)$/i.test(candidate)) return false;
  if (/joined|invited|founded|alliance|server time|population|loyalty/i.test(candidate)) return false;
  if (/^\d/.test(candidate)) return false;
  return true;
}

function parseTravianCoords(value) {
  const match = normalizeTravianPasteText(value).match(/\((-?\d+)\s*[|lI]\s*(-?\d+)\)/);
  return match ? { x: Number(match[1]), y: Number(match[2]) } : null;
}

function applyTravianOverviewPaste(avatar, parsed, tribeId) {
  const unitsByHeader = new Map(TROOPS
    .filter((unit) => unit.tribe === tribeId)
    .map((unit) => [normalizeLookupText(unit.name), unit]));
  let added = 0;
  let updated = 0;
  let totalTroops = 0;
  let productionUpdated = 0;
  const pastedKeys = new Set();

  parsed.villages.forEach((pastedVillage) => {
    pastedVillageKeys(pastedVillage).forEach((key) => pastedKeys.add(key));
    const result = upsertPastedVillage(avatar, pastedVillage);
    if (result.wasAdded) added += 1;
    else updated += 1;

    const village = result.item;
    village.troops = village.troops && typeof village.troops === "object" ? village.troops : {};
    if (pastedVillage.troopCounts) {
      Object.entries(pastedVillage.troopCounts).forEach(([header, count]) => {
        const unit = unitsByHeader.get(normalizeLookupText(header));
        if (!unit) return;
        const key = troopKey(unit);
        if (count > 0) {
          village.troops[key] = count;
          totalTroops += count;
        } else {
          delete village.troops[key];
        }
      });
    }
    if (pastedVillage.production) {
      village.production = { ...pastedVillage.production };
      village.resources = { ...pastedVillage.production };
      productionUpdated += 1;
      if (pastedVillage.cropNetOverride === undefined) {
        delete village.cropNetOverride;
      }
    }
    if (pastedVillage.cropNetOverride !== undefined) {
      village.cropNetOverride = Number(pastedVillage.cropNetOverride) || 0;
    }
    if (pastedVillage.population !== undefined) {
      village.population = Math.max(0, Number(pastedVillage.population) || 0);
    }
    if (pastedVillage.isCapital !== undefined) {
      village.isCapital = Boolean(pastedVillage.isCapital);
    }
    village.lastManualPasteAt = new Date().toISOString();
  });

  const beforeDelete = avatar.villages.length;
  if (parsed.syncVillages) {
    avatar.villages = avatar.villages.filter((village) => existingVillageKeys(village).some((key) => pastedKeys.has(key)));
  }
  const deleted = beforeDelete - avatar.villages.length;

  return { added, updated, deleted, totalTroops, productionUpdated };
}

function pastedVillageKeys(village) {
  return [
    village.coords ? `coords:${village.coords.x}:${village.coords.y}` : "",
    `name:${normalizeVillageNameForPaste(village.name)}`
  ].filter(Boolean);
}

function existingVillageKeys(village) {
  const hasCoords = village.x !== null && village.x !== undefined && village.y !== null && village.y !== undefined;
  return [
    hasCoords ? `coords:${Number(village.x) || 0}:${Number(village.y) || 0}` : "",
    `name:${normalizeVillageNameForPaste(village.name)}`
  ].filter(Boolean);
}

function upsertPastedVillage(avatar, pastedVillage) {
  const nameKey = normalizeVillageNameForPaste(pastedVillage.name);
  let village = pastedVillage.coords ? villageByCoords(avatar, pastedVillage.coords.x, pastedVillage.coords.y) : null;
  if (!village) {
    village = avatar.villages.find((item) => normalizeVillageNameForPaste(item.name) === nameKey);
  }

  if (village) {
    village.name = pastedVillage.name || village.name;
    if (pastedVillage.coords) {
      village.x = pastedVillage.coords.x;
      village.y = pastedVillage.coords.y;
    }
    village.troops = village.troops || {};
    village.type = village.type || "";
    village.oases = normalizeOases(village.oases);
    village.resources = village.resources || { wood: 0, clay: 0, iron: 0, crop: 0 };
    village.production = village.production || { ...village.resources };
    return { item: village, wasAdded: false };
  }

  village = {
    id: createId("village"),
    name: pastedVillage.name,
    x: pastedVillage.coords?.x ?? 0,
    y: pastedVillage.coords?.y ?? 0,
    isCapital: false,
    type: "",
    oases: [],
    resources: { wood: 0, clay: 0, iron: 0, crop: 0 },
    production: { wood: 0, clay: 0, iron: 0, crop: 0 },
    population: Math.max(0, Number(pastedVillage.population || 0)),
    troops: {},
    createdAt: new Date().toISOString(),
    source: "travian-page-paste"
  };
  avatar.villages.push(village);
  return { item: village, wasAdded: true };
}

function detectTribeFromTroopHeaders(headers) {
  let best = { tribe: "", matches: 0 };
  TRIBES.forEach((tribe) => {
    const unitNames = new Set(TROOPS.filter((unit) => unit.tribe === tribe.id).map((unit) => normalizeLookupText(unit.name)));
    const matches = headers.filter((header) => unitNames.has(normalizeLookupText(header))).length;
    if (matches > best.matches) {
      best = { tribe: tribe.id, matches };
    }
  });
  return best.matches >= 3 ? best.tribe : "";
}

function troopHeaderUnit(header) {
  const normalized = normalizeLookupText(header);
  return TROOPS.find((unit) => normalizeLookupText(unit.name) === normalized) || null;
}

function avatarCanUseTribe(avatar, tribeId) {
  const server = avatarServer(avatar);
  const allowed = TRIBE_BY_COUNT[server.tribeCount] || TRIBE_BY_COUNT[3];
  return allowed.includes(tribeId);
}

function normalizeTravianPasteText(value) {
  return String(value || "")
    .replace(/[\u202a-\u202e\u2066-\u2069\u200e\u200f]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[−–—]/g, "-");
}

function normalizeVillageNameForPaste(value) {
  return normalizeLookupText(String(value || "").replace(/^[^\p{L}\p{N}]+/u, ""));
}

function cleanInteger(value) {
  const number = Number(String(value || "").replace(/[^\d]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function normalizeLookupText(value) {
  return normalizeName(value)
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\u00c0-\u024f]+/g, " ")
    .trim();
}

function normalizeTravianPasteText(value) {
  return String(value || "")
    .replace(/[\u202a-\u202e\u2066-\u2069\u200e\u200f]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-");
}

function normalizeLookupText(value) {
  return normalizeName(value)
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9\u00c0-\u024f]+/g, " ")
    .trim();
}

function openTravianPasteDialog() {
  const avatar = activeAvatar();
  if (!avatar) {
    openAvatarDialog();
    return;
  }

  configureTravianPasteDialog(avatar);
  if (typeof els.travianPasteDialog.showModal === "function") {
    els.travianPasteDialog.showModal();
  } else {
    els.travianPasteDialog.setAttribute("open", "");
  }
  (avatar.villages.length ? els.travianTroopsPasteInput : els.travianVillageOverviewPasteInput).focus();
}

function configureTravianPasteDialog(avatar) {
  const firstImport = !avatar.villages.length;
  els.travianPasteDialog.querySelector("h2").textContent = firstImport ? "Update villages" : "Update villages and troops";
  els.importTravianPasteButton.textContent = firstImport ? "Update villages" : "Update villages and troops";
  els.travianTroopsPasteSource.hidden = firstImport;
  els.travianProductionPasteSource.hidden = firstImport;
  els.travianVillageOverviewPasteSource.hidden = false;
  setTravianPasteStatus(firstImport ? "First import: paste your Travian profile page or upload village overview screenshots." : "");
}

function storeTravianImageSelection(event) {
  const input = event.currentTarget;
  const files = [...(input.files || [])];
  if (!files.length) return;

  state.ocrFiles.shared = files;
  els.travianImageStatus.textContent = `${files.length} image${files.length === 1 ? "" : "s"} selected`;
  setTravianPasteStatus("OCR will run when you update.");
}

async function readSelectedTravianImages() {
  if (!window.Tesseract?.recognize) {
    if (state.ocrFiles.shared.length) {
      throw new Error("OCR is not available. Check internet connection or paste the text instead.");
    }
    return;
  }

  const files = state.ocrFiles.shared;
  if (!files.length) return;

  els.importTravianPasteButton.disabled = true;
  setTravianPasteStatus("Reading selected images...");

  const chunks = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    setTravianPasteStatus(`Reading image ${index + 1} of ${files.length}: ${file.name}`);
    const result = await window.Tesseract.recognize(file, "eng");
    const text = result?.data?.text?.trim() || "";
    if (text) chunks.push(text);
  }

  if (chunks.length) {
    state.ocrText.shared = state.ocrText.shared
      ? `${state.ocrText.shared}\n\n${chunks.join("\n\n")}`
      : chunks.join("\n\n");
  }

  setTravianPasteStatus("Images read. Updating villages and troops...");
}

async function importPastedTravianPages() {
  const avatar = activeAvatar();
  if (!avatar) {
    openAvatarDialog();
    return;
  }

  els.importTravianPasteButton.disabled = true;
  try {
    await readSelectedTravianImages();
  } catch (error) {
    console.error(error);
    setTravianPasteStatus(error.message || "Could not read selected images.");
    els.importTravianPasteButton.disabled = !activeAvatar();
    return;
  }

  const firstImport = !avatar.villages.length;
  const parsed = firstImport
    ? parseTravianOverviewPaste(combinedPasteText("travianVillageOverviewPasteInput", { includeSharedOcr: true }))
    : mergeParsedTravianPastes(
      parseTravianOverviewPaste(combinedPasteText("travianTroopsPasteInput", { includeSharedOcr: true })),
      parseTravianOverviewPaste(combinedPasteText("travianProductionPasteInput", { includeSharedOcr: true })),
      parseTravianOverviewPaste(combinedPasteText("travianVillageOverviewPasteInput", { includeSharedOcr: true }))
    );
  if (!parsed.villages.length) {
    setTravianPasteStatus(firstImport
      ? "Could not find villages in the profile page or screenshots."
      : "Could not find troops, production, or village overview tables in the pasted pages.");
    els.importTravianPasteButton.disabled = !activeAvatar();
    return;
  }

  const detectedTribe = detectTribeFromTroopHeaders(parsed.headers);
  if (detectedTribe && detectedTribe !== avatar.tribe && avatarCanUseTribe(avatar, detectedTribe)) {
    avatar.tribe = detectedTribe;
    state.tribe = detectedTribe;
  }

  const result = applyTravianOverviewPaste(avatar, parsed, detectedTribe || avatar.tribe);
  recordAvatarSnapshot(avatar, "travian-paste-update");
  saveDb();
  clearTravianOcrState();
  applyAvatarToState();
  render();
  els.travianPasteDialog.close();
  setTravianPasteStatus(`Updated ${result.updated}, added ${result.added}, and deleted ${result.deleted} villages. Imported ${formatNumber(result.totalTroops)} troops and ${result.productionUpdated} production rows.`);
}

function clearTravianOcrState() {
  state.ocrText.shared = "";
  state.ocrFiles.shared = [];
  els.travianImageInput.value = "";
  els.travianImageStatus.textContent = "";
}

function combinedPasteText(inputId, options = {}) {
  const input = document.querySelector(`#${inputId}`);
  return [input?.value || "", options.includeSharedOcr ? state.ocrText.shared : ""]
    .filter((value) => value.trim())
    .join("\n\n");
}

function recordAvatarSnapshot(avatar, source) {
  const createdAt = new Date().toISOString();
  avatar.snapshots = Array.isArray(avatar.snapshots) ? avatar.snapshots : [];
  avatar.snapshots.push({
    id: createId("snapshot"),
    source,
    createdAt,
    date: createdAt.slice(0, 10),
    villages: avatar.villages.map((village) => {
      const summary = villageTroopSummary(avatar, village);
      return {
        id: village.id,
        name: village.name,
        x: Number(village.x) || 0,
        y: Number(village.y) || 0,
        population: Math.max(0, Number(village.population || 0)),
        type: village.type || "",
        oases: normalizeOases(village.oases),
        production: villageProduction(village),
        cropNetOverride: village.cropNetOverride ?? null,
        cropNet: villageCropNet(village, summary),
        troops: { ...villageTroopCounts(village) },
        totals: {
          troops: summary.total,
          upkeep: summary.upkeep,
          attack: summary.attack,
          defense: summary.defInf + summary.defCav,
          defInf: summary.defInf,
          defCav: summary.defCav
        }
      };
    })
  });
}

function renderTroops() {
  els.troopTribeFilter.value = state.tribe;
  els.troopSearchInput.value = state.troopQuery;
  els.smithyLevelInput.value = state.smithyLevel;
  const rows = filteredTroops();

  if (!rows.length) {
    els.troopTable.innerHTML = `<tr><td colspan="12" class="empty">No units match this filter.</td></tr>`;
    return;
  }

  els.troopTable.innerHTML = rows.map((unit) => {
    const planned = multiplyCost(unit.cost, state.quantity);
    const levelSeconds = trainingSeconds(unit, state.buildingLevel, serverRules(avatarServer(activeAvatar())).timeFactor);
    const trainable = trainableCount(unit.cost, state.availableResources);
    const upgraded = smithyStats(unit, state.smithyLevel);

    return `
      <tr>
        <td>
          <strong class="unit-name">${troopIcon(unit)}${unit.name}</strong>
          <span>${tribeName(unit.tribe)} / ${unit.requirement}</span>
        </td>
        <td><span class="pill ${unit.role}">${icon(roleIcon(unit.role))}${roleLabel(unit.role)}</span></td>
        <td>
          ${costSummary(unit.cost)}
          <span class="quantity-cost">${state.quantity}x: ${compactCost(planned)}</span>
          <span class="trainable-count">Can train: <b>${trainable === null ? "-" : formatNumber(trainable)}</b></span>
        </td>
        <td><span class="smithy-level-pill">Lvl ${state.smithyLevel}</span></td>
        <td><span class="table-icon-value stat-value">${icon("attack")}${formatNumber(upgraded.attack)}</span></td>
        <td><span class="table-icon-value stat-value">${icon("defense")}${formatNumber(upgraded.defInf)}</span></td>
        <td><span class="table-icon-value stat-value">${icon("cavalry")}${formatNumber(upgraded.defCav)}</span></td>
        <td><span class="table-icon-value">${icon("speed")}${unit.speed}</span></td>
        <td><span class="table-icon-value">${icon("carry")}${unit.carry}</span></td>
        <td><span class="table-icon-value">${icon("upkeep")}${unit.upkeep}</span></td>
        <td>
          <strong class="table-icon-value">${icon("training")}${formatDuration(levelSeconds)}</strong>
          <span>base ${unit.trainTime}</span>
        </td>
        <td>${efficiencySummary(unit)}</td>
      </tr>
    `;
  }).join("");
}

function renderBuildings() {
  els.buildingSearchInput.value = state.buildingQuery;
  const from = clamp(Number(els.fromLevelInput.value) || 0, 0, 19);
  const to = clamp(Number(els.toLevelInput.value) || 1, 1, 20);
  const rows = filteredBuildings();

  if (!rows.length) {
    els.buildingGrid.innerHTML = `<div class="empty">No buildings match this filter.</div>`;
    return;
  }

  els.buildingGrid.innerHTML = rows.map((building) => {
    const cappedTo = Math.min(to, building.maxLevel);
    const cappedFrom = Math.min(from, cappedTo - 1);
    const total = buildingRangeCost(building, cappedFrom, cappedTo);

    return `
      <article class="building-card">
        <div class="building-card-head">
          <div>
            <span class="pill neutral">${icon(categoryIcon(building.category))}${titleCase(building.category)}</span>
            <h3>${building.name}</h3>
          </div>
          <strong>${building.effect}</strong>
        </div>
        <p>${building.notes}</p>
        <dl>
          <div><dt>Level 1</dt><dd>${costSummary(building.cost)}</dd></div>
          <div><dt>${cappedFrom} -> ${cappedTo}</dt><dd>${compactCost(total)}</dd></div>
          <div><dt>Factor</dt><dd>${building.factor}x / lvl</dd></div>
          <div><dt>Max</dt><dd>${building.maxLevel}</dd></div>
        </dl>
      </article>
    `;
  }).join("");
}

function renderRoutes() {
  const avatar = activeAvatar();
  if (!avatar) {
    [els.routeForm, els.hubForm].forEach((form) => form.querySelectorAll("input, select, button").forEach((input) => {
      input.disabled = true;
    }));
    els.hubList.innerHTML = `<div class="empty">No avatar yet.</div>`;
    els.hubFlowDetails.innerHTML = "";
    els.routeSummary.innerHTML = `<div>${resultMetric("Status", "Create an avatar first.")}</div>`;
    els.routeCount.textContent = "0 routes";
    els.routeList.innerHTML = `<div class="empty">No avatar yet.</div>`;
    return;
  }

  ensureAvatarCollections(avatar);
  const villages = sortedVillages(avatar);
  const canCreateRoute = villages.length >= 2;
  els.routeForm.querySelectorAll("input, select, button").forEach((input) => {
    input.disabled = !canCreateRoute;
  });
  els.hubForm.querySelectorAll("input, select, button").forEach((input) => {
    input.disabled = !villages.length;
  });

  const options = villages.map((village) => option(village.id, villageOptionLabel(village))).join("");
  const previousFrom = els.routeFromVillage.value;
  const previousTo = els.routeToVillage.value;
  const previousHubVillage = els.hubVillageSelect.value;
  els.routeFromVillage.innerHTML = options || option("", "Add villages first");
  els.routeToVillage.innerHTML = options || option("", "Add villages first");
  els.hubVillageSelect.innerHTML = options || option("", "Add villages first");
  els.routeFromVillage.value = villages.some((village) => village.id === previousFrom) ? previousFrom : villages[0]?.id || "";
  els.routeToVillage.value = villages.some((village) => village.id === previousTo) ? previousTo : villages[1]?.id || villages[0]?.id || "";
  els.hubVillageSelect.value = villages.some((village) => village.id === previousHubVillage) ? previousHubVillage : villages[0]?.id || "";

  renderHubOptions(avatar);
  renderHubList(avatar);
  renderHubFlowDetails(avatar);
  updateRouteFormPreview();
  renderRouteSummary(avatar);
  renderRouteList(avatar);
}

function renderHubOptions(avatar) {
  const hubs = tradingHubs(avatar);
  const previous = els.routeHubSelect.value;
  els.routeHubSelect.innerHTML = [
    option("", "No hub / direct route"),
    ...hubs.map((hub) => option(hub.id, hubLabel(avatar, hub)))
  ].join("");
  els.routeHubSelect.value = hubs.some((hub) => hub.id === previous) ? previous : "";
}

function renderHubList(avatar) {
  const hubs = tradingHubs(avatar);
  if (!hubs.length) {
    els.hubList.innerHTML = `<div class="empty route-empty">No hubs created yet.</div>`;
    els.hubFlowDetails.innerHTML = "";
    return;
  }

  els.hubList.innerHTML = hubs.map((hub) => `
    <div class="hub-row">
      <span>${escapeHtml(hubLabel(avatar, hub))}</span>
      <button class="icon-button" data-hub-delete="${hub.id}" type="button" aria-label="Delete hub" title="Delete hub">x</button>
    </div>
  `).join("");
}

function renderHubFlowDetails(avatar) {
  const hubs = tradingHubs(avatar);
  if (!hubs.length) {
    els.hubFlowDetails.innerHTML = "";
    return;
  }

  const routes = activeTradingRoutes(avatar);
  els.hubFlowDetails.innerHTML = hubs.map((hub) => hubFlowDetail(avatar, hub, routes)).join("");
}

function hubFlowDetail(avatar, hub, routes) {
  const imports = routes.filter((route) => route.toVillageId === hub.villageId);
  const exports = routes.filter((route) => route.fromVillageId === hub.villageId);
  const importTotals = sumRouteResources(imports);
  const exportTotals = sumRouteResources(exports);
  const netTotals = subtractResources(importTotals, exportTotals);

  return `
    <section class="hub-flow-card">
      <div class="hub-flow-head">
        <h4>${escapeHtml(hubLabel(avatar, hub))}</h4>
        <span>${formatNumber(imports.length)} imports / ${formatNumber(exports.length)} exports</span>
      </div>
      <div class="hub-flow-panels">
        <div class="hub-flow-panel">
          <h5>Imports</h5>
          ${hubFlowRows(avatar, imports, "fromVillageId")}
        </div>
        <div class="hub-flow-panel">
          <h5>Exports</h5>
          ${hubFlowRows(avatar, exports, "toVillageId")}
        </div>
      </div>
      <div class="hub-flow-totals">
        <div><span>In</span>${hubResourceSummary(importTotals)}</div>
        <div><span>Out</span>${hubResourceSummary(exportTotals)}</div>
        <div><span>Net</span>${hubResourceSummary(netTotals, true)}</div>
      </div>
    </section>
  `;
}

function hubFlowRows(avatar, routes, villageKey) {
  if (!routes.length) {
    return `<div class="hub-flow-empty">No routes yet.</div>`;
  }

  return `
    <div class="hub-flow-rows">
      ${routes.map((route) => {
        const village = avatar.villages.find((item) => item.id === route[villageKey]);
        const resources = scaledRouteResources(route);
        return `
          <div class="hub-flow-row">
            <strong>${escapeHtml(village?.name || "Missing village")}</strong>
            ${hubResourceSummary(resources)}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function sumRouteResources(routes) {
  return routes.reduce((totals, route) => addResources(totals, scaledRouteResources(route)), emptyResources());
}

function scaledRouteResources(route) {
  const resources = normalizeRouteResources(route.resources);
  const trips = Math.max(1, Number(route.tripsPerDay || 1));
  return {
    wood: resources.wood * trips,
    clay: resources.clay * trips,
    iron: resources.iron * trips,
    crop: resources.crop * trips
  };
}

function emptyResources() {
  return { wood: 0, clay: 0, iron: 0, crop: 0 };
}

function addResources(left, right) {
  return {
    wood: left.wood + right.wood,
    clay: left.clay + right.clay,
    iron: left.iron + right.iron,
    crop: left.crop + right.crop
  };
}

function subtractResources(left, right) {
  return {
    wood: left.wood - right.wood,
    clay: left.clay - right.clay,
    iron: left.iron - right.iron,
    crop: left.crop - right.crop
  };
}

function hubResourceSummary(resources, showSign = false) {
  const values = normalizeDisplayResources(resources);
  return `
    <div class="hub-resource-summary">
      ${["wood", "clay", "iron", "crop"].map((resource) => {
        const value = values[resource];
        const sign = showSign && value > 0 ? "+" : "";
        const tone = value < 0 ? " is-negative" : value > 0 ? " is-positive" : "";
        return `<span class="${tone.trim()}">${icon(resource)}${sign}${formatNumber(value)}</span>`;
      }).join("")}
    </div>
  `;
}

function normalizeDisplayResources(resources = {}) {
  return {
    wood: Math.round(Number(resources.wood) || 0),
    clay: Math.round(Number(resources.clay) || 0),
    iron: Math.round(Number(resources.iron) || 0),
    crop: Math.round(Number(resources.crop) || 0)
  };
}

function renderRouteSummary(avatar) {
  const merchant = merchantProfile(avatar);
  const routes = activeTradingRoutes(avatar);
  const daily = routes.reduce((total, route) => total + routeTotal(route) * Math.max(1, Number(route.tripsPerDay || 1)), 0);
  const merchants = routes.reduce((total, route) => total + merchantLoads(route, merchant.capacity) * Math.max(1, Number(route.tripsPerDay || 1)), 0);
  const longest = routes.reduce((best, route) => {
    const metrics = routeMetrics(avatar, route);
    return metrics && metrics.oneWaySeconds > (best?.oneWaySeconds || 0) ? metrics : best;
  }, null);

  els.routeSummary.innerHTML = [
    `<div>${resultMetric("Merchant", `${formatNumber(merchant.capacity)} cap / ${merchant.speed} fields/h`)}</div>`,
    `<div>${resultMetric("Active routes", routes.length)}</div>`,
    `<div>${resultMetric("Daily resources", formatNumber(daily))}</div>`,
    `<div>${resultMetric("Merchant loads/day", formatNumber(merchants))}</div>`,
    `<div>${resultMetric("Longest one-way", longest ? formatDuration(longest.oneWaySeconds) : "-")}</div>`
  ].join("") + routeHubPlan(avatar);
}

function renderRouteList(avatar) {
  const routes = tradingRoutes(avatar);
  els.routeCount.textContent = `${routes.length} ${routes.length === 1 ? "route" : "routes"}`;

  if (!routes.length) {
    els.routeList.innerHTML = `<div class="empty">No trading routes planned yet.</div>`;
    return;
  }

  els.routeList.innerHTML = `
    <div class="route-table-wrap">
      <table class="route-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Hub</th>
            <th>Shipment</th>
            <th>Trips/day</th>
            <th>Merchants</th>
            <th>Send / delivery</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${routes.map((route) => routeRow(avatar, route)).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function routeRow(avatar, route) {
  const metrics = routeMetrics(avatar, route);
  const resources = normalizeRouteResources(route.resources);
  const merchant = merchantProfile(avatar);
  const trips = Math.max(1, Number(route.tripsPerDay || 1));
  const missing = !metrics;
  const hub = route.hubId ? tradingHubs(avatar).find((item) => item.id === route.hubId) : null;
  const timing = routeTimingLabel(route, metrics);

  return `
    <tr class="${route.enabled === false ? "is-muted" : ""}">
      <td>
        <strong>${escapeHtml(route.label || "Trading route")}</strong>
        <span>${escapeHtml(metrics?.fromName || "Missing village")} -> ${escapeHtml(metrics?.toName || "Missing village")}</span>
      </td>
      <td>
        <strong>${hub ? escapeHtml(hub.name || "Trading hub") : "-"}</strong>
        <span>${hub ? escapeHtml(routeHubDirection(avatar, route, hub)) : "Direct"}</span>
      </td>
      <td>${routeResourceSummary(resources)}</td>
      <td>
        <input class="table-number-input" data-route-trips="${route.id}" type="number" min="1" step="1" value="${trips}" />
        <span>${formatNumber(routeTotal(route) * trips)} res/day</span>
      </td>
      <td>
        <strong>${formatNumber(merchantLoads(route, merchant.capacity))}</strong>
        <span>${formatNumber(merchantLoads(route, merchant.capacity) * trips)} loads/day</span>
      </td>
      <td>
        <strong>${missing ? "-" : `${metrics.distance.toFixed(2)} fields`}</strong>
        <span>${missing ? "Check villages" : `${formatDuration(metrics.oneWaySeconds)} one-way`}</span>
        <span>${escapeHtml(timing)}</span>
      </td>
      <td>
        <label class="route-toggle">
          <input data-route-enabled="${route.id}" type="checkbox"${route.enabled !== false ? " checked" : ""} />
          <span>${route.enabled !== false ? "Active" : "Paused"}</span>
        </label>
      </td>
      <td><button class="danger-button route-delete-button" data-route-delete="${route.id}" type="button">Delete</button></td>
    </tr>
  `;
}

function updateRouteFormPreview() {
  const avatar = activeAvatar();
  if (!avatar || !els.routeForm) return;
  const merchant = merchantProfile(avatar);
  const resources = {
    wood: Math.max(0, Math.floor(Number(els.routeWoodInput.value) || 0)),
    clay: Math.max(0, Math.floor(Number(els.routeClayInput.value) || 0)),
    iron: Math.max(0, Math.floor(Number(els.routeIronInput.value) || 0)),
    crop: Math.max(0, Math.floor(Number(els.routeCropInput.value) || 0))
  };
  const total = resources.wood + resources.clay + resources.iron + resources.crop;
  const merchantLimit = 20;
  const capacityTotal = merchant.capacity * merchantLimit;
  const merchantsNeeded = total > 0 ? Math.ceil(total / merchant.capacity) : 0;
  const deliveryCount = Math.max(1, Number(selectedRadioValue("routeDeliveryCount")) || 1);
  const repeatEvery = els.routeRepeatEvery.value;
  const tripsPerDay = routeTripsPerDay(deliveryCount, repeatEvery);
  const previewRoute = {
    fromVillageId: els.routeFromVillage.value,
    toVillageId: els.routeToVillage.value,
    timingMode: selectedRadioValue("routeTimingChoice") || "send",
    clockTime: els.routeTimeInput.value,
    resources
  };
  const metrics = routeMetrics(avatar, previewRoute);
  const hasTarget = Boolean(previewRoute.toVillageId);
  const sameVillage = previewRoute.fromVillageId && previewRoute.fromVillageId === previewRoute.toVillageId;

  els.routeTripsInput.value = tripsPerDay;
  els.routeMerchantInfo.innerHTML = `Each of your merchants can carry <strong>${formatNumber(merchant.capacity)}</strong> resources.`;
  els.routeTotalStatus.textContent = `Total: ${formatNumber(total)} / ${formatNumber(capacityTotal)}`;
  els.routeMerchantStatus.textContent = `Merchants: ${formatNumber(merchantsNeeded)} / ${merchantLimit}`;
  els.routeResourceWarning.hidden = total > 0;
  els.routeTargetStatus.hidden = hasTarget && !sameVillage;
  els.routeTargetStatus.textContent = sameVillage ? "Please select another target." : "Please select a target.";
  els.routeTravelPreview.textContent = metrics
    ? `Travel time: ${formatDuration(metrics.oneWaySeconds)} / ${routeTimingLabel(previewRoute, metrics)}`
    : "Travel time: -";
}

function addTradingRoute(event) {
  event.preventDefault();
  const avatar = activeAvatar();
  if (!avatar) return;
  ensureAvatarCollections(avatar);
  const timingMode = selectedRadioValue("routeTimingChoice") || "send";
  const deliveryCount = Math.max(1, Number(selectedRadioValue("routeDeliveryCount")) || 1);
  const repeatEvery = els.routeRepeatEvery.value;
  const tripsPerDay = routeTripsPerDay(deliveryCount, repeatEvery);
  const fromVillage = avatar.villages.find((village) => village.id === els.routeFromVillage.value);
  const toVillage = avatar.villages.find((village) => village.id === els.routeToVillage.value);

  const route = {
    id: createId("route"),
    label: els.routeLabelInput.value.trim() || (toVillage ? `Trade to ${toVillage.name}` : "Trading route"),
    hubId: els.routeHubSelect.value,
    fromVillageId: els.routeFromVillage.value,
    toVillageId: els.routeToVillage.value,
    resources: {
      wood: Math.max(0, Math.floor(Number(els.routeWoodInput.value) || 0)),
      clay: Math.max(0, Math.floor(Number(els.routeClayInput.value) || 0)),
      iron: Math.max(0, Math.floor(Number(els.routeIronInput.value) || 0)),
      crop: Math.max(0, Math.floor(Number(els.routeCropInput.value) || 0))
    },
    tripsPerDay,
    deliveryCount,
    repeatEvery,
    timingMode,
    clockTime: els.routeTimeInput.value,
    enabled: true,
    createdAt: new Date().toISOString()
  };

  if (!route.fromVillageId || !route.toVillageId || route.fromVillageId === route.toVillageId || routeTotal(route) <= 0) {
    updateRouteFormPreview();
    return;
  }

  avatar.tradingRoutes.push(route);
  saveDb();
  els.routeLabelInput.value = "";
  ["routeWoodInput", "routeClayInput", "routeIronInput", "routeCropInput"].forEach((key) => {
    els[key].value = "0";
  });
  els.routeTripsInput.value = "1";
  els.routeTimeInput.value = "";
  els.routeRepeatEvery.value = "24";
  setRadioValue("routeDeliveryCount", "1");
  setRadioValue("routeTimingChoice", "send");
  renderRoutes();
}

function addTradingHub(event) {
  event.preventDefault();
  const avatar = activeAvatar();
  if (!avatar) return;
  ensureAvatarCollections(avatar);

  const villageId = els.hubVillageSelect.value;
  if (!villageId) return;
  const village = avatar.villages.find((item) => item.id === villageId);
  if (!village) return;
  const existing = tradingHubs(avatar).find((hub) => hub.villageId === villageId);
  if (existing) {
    els.routeHubSelect.value = existing.id;
    return;
  }

  avatar.tradingHubs.push({
    id: createId("hub"),
    villageId,
    name: els.hubNameInput.value.trim() || `${village.name} hub`,
    createdAt: new Date().toISOString()
  });
  els.hubNameInput.value = "";
  saveDb();
  renderRoutes();
}

function handleHubListClick(event) {
  const deleteButton = event.target.closest("[data-hub-delete]");
  if (!deleteButton) return;
  const avatar = activeAvatar();
  if (!avatar) return;
  const hubId = deleteButton.dataset.hubDelete;
  avatar.tradingHubs = tradingHubs(avatar).filter((hub) => hub.id !== hubId);
  tradingRoutes(avatar).forEach((route) => {
    if (route.hubId === hubId) {
      route.hubId = "";
    }
  });
  saveDb();
  renderRoutes();
}

function handleRouteListClick(event) {
  const deleteButton = event.target.closest("[data-route-delete]");
  if (!deleteButton) return;
  const avatar = activeAvatar();
  if (!avatar) return;
  avatar.tradingRoutes = tradingRoutes(avatar).filter((route) => route.id !== deleteButton.dataset.routeDelete);
  saveDb();
  renderRoutes();
}

function handleRouteListChange(event) {
  const avatar = activeAvatar();
  if (!avatar) return;
  const routeId = event.target.dataset.routeEnabled || event.target.dataset.routeTrips;
  if (!routeId) return;
  const route = tradingRoutes(avatar).find((item) => item.id === routeId);
  if (!route) return;

  if (event.target.dataset.routeEnabled) {
    route.enabled = event.target.checked;
  }
  if (event.target.dataset.routeTrips) {
    route.tripsPerDay = Math.max(1, Math.floor(Number(event.target.value) || 1));
  }

  saveDb();
  renderRoutes();
}

function tradingRoutes(avatar) {
  ensureAvatarCollections(avatar);
  return avatar.tradingRoutes;
}

function tradingHubs(avatar) {
  ensureAvatarCollections(avatar);
  return avatar.tradingHubs;
}

function activeTradingRoutes(avatar) {
  return tradingRoutes(avatar).filter((route) => route.enabled !== false);
}

function routeHubPlan(avatar) {
  const hubs = tradingHubs(avatar);
  if (!hubs.length) return "";

  const activeRoutes = activeTradingRoutes(avatar);
  const merchant = merchantProfile(avatar);
  return `
    <div class="hub-plan-list">
      ${hubs.map((hub) => hubPlanCard(avatar, hub, activeRoutes, merchant)).join("")}
    </div>
  `;
}

function hubPlanCard(avatar, hub, routes, merchant) {
  const hubRoutes = routes.filter((route) => route.hubId === hub.id);
  const inbound = hubRoutes.filter((route) => routeHubDirection(avatar, route, hub) === "Inbound");
  const outbound = hubRoutes.filter((route) => routeHubDirection(avatar, route, hub) === "Outbound");
  const totalDaily = hubRoutes.reduce((sum, route) => sum + routeTotal(route) * Math.max(1, Number(route.tripsPerDay || 1)), 0);
  const loadsDaily = hubRoutes.reduce((sum, route) => sum + merchantLoads(route, merchant.capacity) * Math.max(1, Number(route.tripsPerDay || 1)), 0);
  const longest = hubRoutes.reduce((best, route) => {
    const metrics = routeMetrics(avatar, route);
    return metrics && metrics.oneWaySeconds > (best?.oneWaySeconds || 0) ? metrics : best;
  }, null);

  return `
    <section class="hub-plan-card">
      <strong>${escapeHtml(hubLabel(avatar, hub))}</strong>
      <span>${formatNumber(inbound.length)} inbound / ${formatNumber(outbound.length)} outbound / ${formatNumber(hubRoutes.length)} routes</span>
      <span>${formatNumber(totalDaily)} res/day / ${formatNumber(loadsDaily)} merchant loads/day</span>
      <span>Longest delivery ${longest ? formatDuration(longest.oneWaySeconds) : "-"}</span>
    </section>
  `;
}

function routeMetrics(avatar, route) {
  const from = avatar.villages.find((village) => village.id === route.fromVillageId);
  const to = avatar.villages.find((village) => village.id === route.toVillageId);
  if (!from || !to) return null;

  const merchant = merchantProfile(avatar);
  const distance = Math.hypot(Number(to.x || 0) - Number(from.x || 0), Number(to.y || 0) - Number(from.y || 0));
  const speed = merchant.speed * serverRules(avatarServer(avatar)).movementFactor;

  return {
    fromName: from.name,
    toName: to.name,
    distance,
    oneWaySeconds: speed > 0 ? distance / speed * 3600 : 0
  };
}

function routeTimingLabel(route, metrics) {
  if (!metrics || !route.clockTime || route.timingMode === "none") {
    return metrics ? "No fixed clock time" : "";
  }

  const minutes = parseClockMinutes(route.clockTime);
  if (minutes === null) return "No fixed clock time";
  const travelMinutes = Math.round(metrics.oneWaySeconds / 60);
  const send = route.timingMode === "delivery" ? minutes - travelMinutes : minutes;
  const delivery = route.timingMode === "delivery" ? minutes : minutes + travelMinutes;
  return `Send ${formatClockMinutes(send)} / delivery ${formatClockMinutes(delivery)}`;
}

function routeHubDirection(avatar, route, hub) {
  if (route.toVillageId === hub.villageId) return "Inbound";
  if (route.fromVillageId === hub.villageId) return "Outbound";
  return "Linked";
}

function hubLabel(avatar, hub) {
  const village = avatar.villages.find((item) => item.id === hub.villageId);
  return `${hub.name || "Trading hub"}${village ? ` - ${village.name}` : ""}`;
}

function merchantProfile(avatar) {
  return MERCHANTS[avatar?.tribe] || MERCHANTS.romans;
}

function merchantLoads(route, capacity) {
  return Math.max(1, Math.ceil(routeTotal(route) / Math.max(1, capacity)));
}

function routeTotal(route) {
  const resources = normalizeRouteResources(route.resources);
  return resources.wood + resources.clay + resources.iron + resources.crop;
}

function normalizeRouteResources(resources = {}) {
  return {
    wood: Math.max(0, Math.floor(Number(resources.wood) || 0)),
    clay: Math.max(0, Math.floor(Number(resources.clay) || 0)),
    iron: Math.max(0, Math.floor(Number(resources.iron) || 0)),
    crop: Math.max(0, Math.floor(Number(resources.crop) || 0))
  };
}

function routeResourceSummary(resources) {
  return `
    <div class="route-resource-summary">
      <span>${icon("wood")}${formatNumber(resources.wood)}</span>
      <span>${icon("clay")}${formatNumber(resources.clay)}</span>
      <span>${icon("iron")}${formatNumber(resources.iron)}</span>
      <span>${icon("crop")}${formatNumber(resources.crop)}</span>
    </div>
  `;
}

function villageOptionLabel(village) {
  return `${village.name} (${Number(village.x) || 0} | ${Number(village.y) || 0})`;
}

function selectedRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function setRadioValue(name, value) {
  const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (input) {
    input.checked = true;
  }
}

function routeTripsPerDay(deliveryCount, repeatEvery) {
  if (repeatEvery === "once") return Math.max(1, deliveryCount);
  const hours = Math.max(1, Number(repeatEvery) || 24);
  return Math.max(1, Math.round(24 / hours) * Math.max(1, deliveryCount));
}

function parseClockMinutes(value) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function formatClockMinutes(value) {
  const day = 24 * 60;
  const normalized = ((Math.round(value) % day) + day) % day;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function renderCalculators() {
  renderTrainingCalculator();
  renderTravelCalculator();
  renderBuildingCalculator();
}

function renderTrainingCalculator() {
  const unit = TROOPS[Number(els.plannerUnit.value) || 0];
  const quantity = Math.max(1, Number(els.plannerQuantity.value) || 1);
  const level = clamp(Number(els.plannerBuildingLevel.value) || 1, 1, 20);
  const rules = serverRules(avatarServer(activeAvatar()));
  const totalCost = multiplyCost(unit.cost, quantity);
  const totalSeconds = trainingSeconds(unit, level, rules.timeFactor) * quantity;

  els.trainingResult.innerHTML = `
    <div>${resultMetric("Total cost", compactCost(totalCost))}</div>
    <div>${resultMetric("Total upkeep", formatNumber(unit.upkeep * quantity))} crop/hour</div>
    <div>${resultMetric("Queue time", formatDuration(totalSeconds))}</div>
    <div>${resultMetric("Combat", `${formatNumber(unit.attack * quantity)} atk / ${formatNumber(unit.defInf * quantity)} inf / ${formatNumber(unit.defCav * quantity)} cav`)}</div>
  `;
}

function renderTravelCalculator() {
  const unit = TROOPS[Number(els.travelUnit.value) || 0];
  const rules = serverRules(avatarServer(activeAvatar()));
  const fromX = Number(els.fromX.value) || 0;
  const fromY = Number(els.fromY.value) || 0;
  const toX = Number(els.toX.value) || 0;
  const toY = Number(els.toY.value) || 0;
  const distance = Math.hypot(toX - fromX, toY - fromY);
  const effectiveSpeed = unit.speed * rules.movementFactor;
  const hours = distance / effectiveSpeed;

  els.travelResult.innerHTML = `
    <div>${resultMetric("Distance", distance.toFixed(2))} fields</div>
    <div>${resultMetric("Unit speed", `${effectiveSpeed}`)} fields/hour</div>
    <div>${resultMetric("One-way time", formatDuration(hours * 3600))}</div>
    <div>${resultMetric("Return trip", formatDuration(hours * 7200))}</div>
  `;
}

function renderBuildingCalculator() {
  const building = BUILDINGS[Number(els.plannerBuilding.value) || 0];
  const from = clamp(Number(els.plannerFromLevel.value) || 0, 0, building.maxLevel - 1);
  const to = clamp(Number(els.plannerToLevel.value) || 1, 1, building.maxLevel);
  const total = buildingRangeCost(building, Math.min(from, to - 1), to);
  const finalLevel = buildingLevelCost(building, to);

  els.buildingResult.innerHTML = `
    <div>${resultMetric("Range cost", compactCost(total))}</div>
    <div>${resultMetric(`Level ${to}`, costSummary(finalLevel))}</div>
    <div>${resultMetric("Category", titleCase(building.category))}</div>
    <div>${resultMetric("Max level", building.maxLevel)}</div>
  `;
}

function renderKnowledge() {
  const tribes = TRIBES.filter((tribe) => state.tribe === "all" || tribe.id === state.tribe)
    .filter((tribe) => !state.query || textMatches(tribe, state.query));

  els.tribeCards.innerHTML = tribes.map((tribe) => `
    <article class="tribe-card">
      <div class="tribe-card-head">
        <span class="tribe-badge">${tribe.name.slice(0, 2).toUpperCase()}</span>
        <div>
          <h3>${tribe.name}</h3>
          <p>${tribe.style}</p>
        </div>
      </div>
      <dl>
        <div><dt>Available</dt><dd>${tribe.availability}</dd></div>
        <div><dt>Merchant</dt><dd>${tribe.merchant}</dd></div>
        <div><dt>Hero</dt><dd>${tribe.hero}</dd></div>
      </dl>
      <div class="tag-list">${tribe.specials.map((item) => `<span>${item}</span>`).join("")}</div>
      <div class="split-notes">
        <div><strong>Strengths</strong><p>${tribe.strengths.join(", ")}</p></div>
        <div><strong>Watchouts</strong><p>${tribe.weaknesses.join(", ")}</p></div>
      </div>
    </article>
  `).join("");

  els.sourceNotes.innerHTML = DATA_SOURCES.map((source) => `
    <li>
      <a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>
      <span>${source.note}</span>
    </li>
  `).join("");
}

function loadDb() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed && Array.isArray(parsed.avatars)) {
      parsed.avatars.forEach(ensureAvatarCollections);
      return parsed;
    }
  } catch {
    // Start clean if old local data is malformed.
  }

  return { version: 1, activeAvatarId: null, avatars: [] };
}

function saveDb() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.db));
}

function activeAvatar() {
  return state.db.avatars.find((avatar) => avatar.id === state.db.activeAvatarId) ?? state.db.avatars[0] ?? null;
}

function ensureAvatarCollections(avatar) {
  if (!avatar) return;
  if (!Array.isArray(avatar.villages)) {
    avatar.villages = [];
  }
  if (!Array.isArray(avatar.tradingHubs)) {
    avatar.tradingHubs = [];
  }
  if (!Array.isArray(avatar.tradingRoutes)) {
    avatar.tradingRoutes = [];
  }
  avatar.tradingRoutes.forEach((route) => {
    if (!("hubId" in route)) route.hubId = "";
    if (!("timingMode" in route)) route.timingMode = "none";
    if (!("clockTime" in route)) route.clockTime = "";
    if (!("deliveryCount" in route)) route.deliveryCount = 1;
    if (!("repeatEvery" in route)) route.repeatEvery = "24";
  });
}

function applyAvatarToState() {
  const avatar = activeAvatar();
  if (!avatar) {
    state.tribe = "all";
    state.speed = 1;
    return;
  }

  if (state.db.activeAvatarId !== avatar.id) {
    state.db.activeAvatarId = avatar.id;
    saveDb();
  }

  const server = avatarServer(avatar);
  state.tribe = avatar.tribe;
  state.speed = server.speed;

  if (els.troopTribeFilter) {
    els.troopTribeFilter.value = avatar.tribe;
  }
}

function openAvatarDialog(avatarId = null) {
  const avatar = state.db.avatars.find((item) => item.id === avatarId) ?? null;
  state.editingAvatarId = avatar?.id ?? null;
  els.avatarDialogTitle.textContent = avatar ? "Edit avatar" : "Register avatar";
  els.deleteAvatarButton.hidden = !avatar;

  if (avatar) {
    const server = avatarServer(avatar);
    els.avatarNameInput.value = avatar.name;
    els.serverPresetInput.value = "custom";
    els.serverNameInput.value = server.name;
    els.serverUrlInput.value = server.url || "";
    els.serverSpeedInput.value = server.speed;
    els.serverVersionInput.value = server.version;
    els.serverTribeCountInput.value = server.tribeCount;
    els.tribeUnlockedInput.checked = avatar.tribeUnlocked;
    els.serverLookupStatus.textContent = `Server resolved as ${server.name}.`;
    setAvatarFormLocked(true);
    renderAvatarTribeOptions(avatar.tribe);
    els.avatarTribeInput.disabled = !avatar.tribeUnlocked;
  } else {
    els.avatarForm.reset();
    els.serverPresetInput.value = "custom";
    applyServerPreset();
    els.serverNameInput.value = "";
    els.serverLookupStatus.textContent = "Paste a Travian gameworld link.";
    setAvatarFormLocked(false);
    els.avatarTribeInput.disabled = false;
  }

  if (!els.avatarDialog.open) {
    els.avatarDialog.showModal();
  }
}

function setAvatarFormLocked(locked) {
  [
    els.avatarNameInput,
    els.serverPresetInput,
    els.serverNameInput,
    els.serverUrlInput,
    els.serverLookupButton,
    els.serverSpeedInput,
    els.serverVersionInput,
    els.serverTribeCountInput
  ].forEach((input) => {
    input.disabled = locked;
  });
}

function applyServerPreset() {
  const preset = SERVER_PRESETS.find((server) => server.id === els.serverPresetInput.value) ?? SERVER_PRESETS[0];
  els.serverSpeedInput.value = preset.speed;
  els.serverVersionInput.value = preset.version;
  els.serverTribeCountInput.value = preset.tribeCount;
  els.tribeUnlockedInput.checked = preset.tribeUnlocked;
  renderAvatarTribeOptions();
}

async function lookupServerFromForm() {
  const rawUrl = els.serverUrlInput.value.trim();
  if (!rawUrl) {
    els.serverLookupStatus.textContent = "Paste a Travian gameworld link.";
    return null;
  }

  els.serverLookupStatus.textContent = "Looking up server...";

  try {
    const server = await resolveTravianServer(rawUrl);
    fillServerFields(server);
    els.serverLookupStatus.textContent = `Server found: ${server.name}.`;
    return server;
  } catch (error) {
    els.serverLookupStatus.textContent = error.message;
    return null;
  }
}

async function resolveTravianServer(rawUrl) {
  const server = resolveTravianServerUrl(rawUrl);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(server.url, { cache: "no-store", signal: controller.signal });
    clearTimeout(timer);

    if (response.ok) {
      const html = await response.text();
      const pageName = extractServerNameFromHtml(html);
      if (pageName) {
        server.name = pageName;
      }
    }
  } catch {
    // Static local files often cannot read cross-origin Travian HTML, so the URL parser is the fallback.
  }

  return server;
}

function resolveTravianServerUrl(rawUrl) {
  const normalized = normalizeTravianUrl(rawUrl);
  const url = new URL(normalized);
  const host = url.hostname.toLowerCase();

  if (!host.endsWith(".travian.com")) {
    throw new Error("That does not look like a Travian gameworld link.");
  }

  const parts = host.split(".");
  const travianIndex = parts.lastIndexOf("travian");
  const gameParts = parts.slice(0, travianIndex);
  const speedPart = gameParts.find((part) => /^x\d+$/i.test(part));
  const speed = speedPart ? Number(speedPart.slice(1)) : 1;
  const worldPart = gameParts[0] || "";
  const worldNumber = worldPart.match(/\d+/)?.[0] || "";
  const regionPart = speedPart
    ? gameParts[gameParts.indexOf(speedPart) + 1]
    : gameParts[1] || gameParts[0] || "international";
  const region = cleanRegion(regionPart);
  const version = inferServerVersion(gameParts, region);
  const tribeCount = inferTribeCount(gameParts, region, version);
  const name = worldNumber ? `${region} ${worldNumber}` : `${region} x${speed}`;

  return {
    url: normalized,
    name,
    speed,
    version,
    versionLabel: versionLabel(version),
    tribeCount,
    tribeUnlocked: version === "special" || version === "northern"
  };
}

function normalizeTravianUrl(rawUrl) {
  const value = rawUrl.trim();
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const url = new URL(withProtocol);
  url.hash = "";
  url.search = "";
  if (!url.pathname || url.pathname === "/") {
    url.pathname = "/";
  }
  return url.toString();
}

function extractServerNameFromHtml(html) {
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]
    || html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]
    || "";
  const cleaned = decodeHtml(title).replace(/\s+-\s+Travian.*$/i, "").trim();
  if (!cleaned || /travian|javascript|browser/i.test(cleaned)) {
    return "";
  }
  return cleaned;
}

function fillServerFields(server) {
  els.serverNameInput.value = server.name;
  els.serverUrlInput.value = server.url;
  els.serverSpeedInput.value = server.speed;
  els.serverVersionInput.value = server.version;
  els.serverTribeCountInput.value = server.tribeCount;
  els.tribeUnlockedInput.checked = server.tribeUnlocked;
  renderAvatarTribeOptions(els.avatarTribeInput.value);
}

function renderAvatarTribeOptions(selected = null) {
  const count = Number(els.serverTribeCountInput.value || 3);
  const allowed = TRIBE_BY_COUNT[count] ?? TRIBE_BY_COUNT[3];
  els.avatarTribeInput.innerHTML = allowed.map((tribeId) => option(tribeId, tribeName(tribeId))).join("");
  els.avatarTribeInput.value = selected && allowed.includes(selected) ? selected : allowed[0];
}

function openAvatarSwitcher() {
  if (state.db.avatars.length < 2) return;

  if (typeof els.avatarSelect.showPicker === "function") {
    els.avatarSelect.showPicker();
    return;
  }

  els.avatarSelect.focus();
}

async function saveAvatarFromForm(event) {
  event.preventDefault();
  const editing = state.db.avatars.find((avatar) => avatar.id === state.editingAvatarId);

  if (editing) {
    if (editing.tribeUnlocked) {
      editing.tribe = els.avatarTribeInput.value;
    }
    saveDb();
    applyAvatarToState();
    els.avatarDialog.close();
    render();
    return;
  }

  const server = await lookupServerFromForm();
  if (!server) {
    return;
  }

  const avatar = {
    id: createId("avatar"),
    name: els.avatarNameInput.value.trim(),
    tribe: els.avatarTribeInput.value,
    tribeUnlocked: server.tribeUnlocked,
    createdAt: new Date().toISOString(),
    server: {
      url: server.url
    },
    villages: [],
    tradingHubs: [],
    tradingRoutes: []
  };

  state.db.avatars.push(avatar);
  state.db.activeAvatarId = avatar.id;
  saveDb();
  applyAvatarToState();
  els.avatarDialog.close();
  render();
}

function deleteEditingAvatar() {
  if (!state.editingAvatarId) return;
  const avatar = state.db.avatars.find((item) => item.id === state.editingAvatarId);
  if (!avatar) return;

  const confirmed = window.confirm(`Delete avatar "${avatar.name}" and its villages from this browser?`);
  if (!confirmed) return;

  state.db.avatars = state.db.avatars.filter((item) => item.id !== avatar.id);
  state.db.activeAvatarId = state.db.avatars[0]?.id ?? null;
  saveDb();
  applyAvatarToState();
  els.avatarDialog.close();
  render();
  if (!activeAvatar()) {
    openAvatarDialog();
  }
}

function removeVillage(villageId) {
  const avatar = activeAvatar();
  if (!avatar) return;
  avatar.villages = avatar.villages.filter((village) => village.id !== villageId);
  const deletedHubIds = tradingHubs(avatar).filter((hub) => hub.villageId === villageId).map((hub) => hub.id);
  avatar.tradingHubs = tradingHubs(avatar).filter((hub) => hub.villageId !== villageId);
  avatar.tradingRoutes = tradingRoutes(avatar).filter((route) => {
    return route.fromVillageId !== villageId && route.toVillageId !== villageId && !deletedHubIds.includes(route.hubId);
  });
  saveDb();
  render();
}

function resetActiveAvatarVillages() {
  const avatar = activeAvatar();
  if (!avatar) return;
  const confirmed = window.confirm(`Reset all villages, troops, production, oases, and snapshots for "${avatar.name}"?`);
  if (!confirmed) return;

  avatar.villages = [];
  avatar.tradingHubs = [];
  avatar.tradingRoutes = [];
  avatar.snapshots = [];
  clearTravianOcrState();
  saveDb();
  render();
  setTravianPasteStatus("Village data reset.");
}

function updateVillageMetadata(villageId, changes) {
  const avatar = activeAvatar();
  const village = avatar?.villages.find((item) => item.id === villageId);
  if (!village) return;

  if ("type" in changes) {
    village.type = changes.type;
  }
  if ("population" in changes) {
    village.population = Math.max(0, Math.floor(Number(changes.population) || 0));
  }
  if ("oases" in changes) {
    village.oases = normalizeOases(changes.oases);
  }

  saveDb();
  render();
}

function updateVillageTroops(villageId, troopKeyValue, rawValue) {
  const avatar = activeAvatar();
  const village = avatar?.villages.find((item) => item.id === villageId);
  if (!village) return;

  const value = Math.max(0, Math.floor(Number(rawValue) || 0));
  village.troops = village.troops && typeof village.troops === "object" ? village.troops : {};

  if (value > 0) {
    village.troops[troopKeyValue] = value;
  } else {
    delete village.troops[troopKeyValue];
  }

  saveDb();
  render();
}

function updateVillageResources(villageId, resource, rawValue) {
  const avatar = activeAvatar();
  const village = avatar?.villages.find((item) => item.id === villageId);
  if (!village || !["wood", "clay", "iron", "crop"].includes(resource)) return;

  const value = Math.max(0, Math.floor(Number(rawValue) || 0));
  village.resources = village.resources && typeof village.resources === "object"
    ? village.resources
    : { wood: 0, clay: 0, iron: 0, crop: 0 };
  village.production = village.production && typeof village.production === "object"
    ? village.production
    : { ...village.resources };
  village.resources[resource] = value;
  village.production[resource] = value;

  saveDb();
  render();
}

function serverRules(server) {
  const speed = Number(server?.speed || 1);
  return {
    timeFactor: speed,
    productionFactor: speed,
    movementFactor: speed === 10 ? 4 : speed >= 2 ? 2 : 1
  };
}

function avatarServer(avatar) {
  if (!avatar) {
    return resolveTravianServerUrl("https://ts1.x1.international.travian.com/");
  }

  try {
    const server = resolveTravianServerUrl(avatar.server?.url || avatar.serverUrl || "");
    return {
      ...server,
      name: server.name || avatar.server?.name || "Travian server"
    };
  } catch {
    return {
      url: avatar.server?.url || "",
      name: avatar.server?.name || "Travian server",
      speed: Number(avatar.server?.speed || 1),
      version: avatar.server?.version || "regular",
      versionLabel: avatar.server?.versionLabel || "Regular / WW",
      tribeCount: Number(avatar.server?.tribeCount || 3),
      tribeUnlocked: Boolean(avatar.tribeUnlocked)
    };
  }
}

function versionLabel(version) {
  const labels = {
    regular: "Regular / WW",
    "five-tribe": "5 tribe",
    special: "Special / Community Week",
    northern: "Northern Legends"
  };
  return labels[version] ?? titleCase(version);
}

function cleanRegion(value) {
  const labels = {
    com: "International",
    international: "International",
    america: "America",
    europe: "Europe",
    asia: "Asia",
    arabics: "Arabics",
    arabic: "Arabics",
    pt: "Portuguese",
    br: "Brazil",
    es: "Spanish",
    fr: "France",
    de: "Germany",
    it: "Italy",
    tr: "Turkey"
  };
  return labels[value] || titleCase(String(value || "international").replace(/-/g, " "));
}

function inferServerVersion(gameParts, region) {
  const text = `${gameParts.join(" ")} ${region}`.toLowerCase();
  if (/northern|nys|vik/.test(text)) return "northern";
  if (/cw|community|special|dote|ttq|tournament|annual/.test(text)) return "special";
  if (/international/.test(text)) return "five-tribe";
  return "regular";
}

function inferTribeCount(gameParts, region, version) {
  const text = `${gameParts.join(" ")} ${region}`.toLowerCase();
  if (version === "northern" || version === "special") return 6;
  if (/international|ttq/.test(text)) return 5;
  return 3;
}

function decodeHtml(value) {
  const textarea = document.createElement?.("textarea");
  if (!textarea) return value;
  textarea.innerHTML = value;
  return textarea.value;
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

function formatSnapshotDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function filteredTroops({ ignoreRole = false } = {}) {
  return TROOPS.filter((unit) => state.tribe === "all" || unit.tribe === state.tribe)
    .filter((unit) => ignoreRole || state.role === "all" || unit.role === state.role)
    .filter((unit) => !state.troopQuery || textMatches(unit, state.troopQuery));
}

function filteredBuildings() {
  return BUILDINGS.filter((building) => state.buildingCategory === "all" || building.category === state.buildingCategory)
    .filter((building) => !state.buildingQuery || textMatches(building, state.buildingQuery));
}

function textMatches(item, query) {
  return JSON.stringify(item).toLowerCase().includes(query);
}

function option(value, label) {
  return `<option value="${value}">${label}</option>`;
}

function villageTypeOptions(selected = "") {
  return VILLAGE_TYPES
    .map((type) => `<option value="${type.id}"${type.id === selected ? " selected" : ""}>${type.label}</option>`)
    .join("");
}

function oasisPicker(selected = [], villageId = "") {
  const selectedSet = new Set(normalizeOases(selected));
  const data = villageId ? ` data-village-oasis="${villageId}"` : "";
  return OASIS_BONUSES.map((bonus) => `
    <label class="oasis-option">
      <input type="checkbox" value="${bonus.id}"${data}${selectedSet.has(bonus.id) ? " checked" : ""} />
      <span>${oasisIcons(bonus)}${escapeHtml(bonus.label)}</span>
    </label>
  `).join("");
}

function oasisSelectOptions(selected = "") {
  return [
    `<option value="" title="None">-</option>`,
    ...OASIS_BONUSES.map((bonus) => `<option value="${bonus.id}" title="${escapeHtml(bonus.label)}"${bonus.id === selected ? " selected" : ""}>${escapeHtml(oasisOptionIconLabel(bonus))}</option>`)
  ].join("");
}

function oasisOptionIconLabel(bonus) {
  const resourceIcons = {
    wood: "🪵",
    clay: "🧱",
    iron: "⚙",
    crop: "🌾"
  };
  return bonus.resources.map((resource) => resourceIcons[resource] || resource.slice(0, 1).toUpperCase()).join("");
}

function normalizeOases(oases = []) {
  if (!Array.isArray(oases)) return [];
  const valid = new Set(OASIS_BONUSES.map((bonus) => bonus.id));
  return [...new Set(oases)].filter((oasis) => valid.has(oasis));
}

function oasisBadges(oases = []) {
  const normalized = normalizeOases(oases);
  if (!normalized.length) return "";

  return normalized.map((oasisId) => {
    const bonus = OASIS_BONUSES.find((item) => item.id === oasisId);
    if (!bonus) return "";
    return `<span class="oasis-badge">${oasisIcons(bonus)}${escapeHtml(bonus.label)}</span>`;
  }).join("");
}

function oasisIcons(bonus) {
  return oasisIconResources(bonus).map((resource) => icon(resource)).join("");
}

function oasisSelectOptions(selected = "") {
  return [
    `<option value="" title="None">-</option>`,
    ...OASIS_BONUSES.map((bonus) => `<option value="${bonus.id}" title="${escapeHtml(bonus.label)}"${bonus.id === selected ? " selected" : ""}>${escapeHtml(oasisOptionTextLabel(bonus))}</option>`)
  ].join("");
}

function oasisOptionTextLabel(bonus) {
  const resourceLabels = { wood: "W", clay: "C", iron: "I", crop: "Cr" };
  return `${bonus.resources.map((resource) => resourceLabels[resource] || resource.slice(0, 1).toUpperCase()).join("+")} ${bonus.percent}%`;
}

function selectedOasisIcons(oasisId) {
  const bonus = OASIS_BONUSES.find((item) => item.id === oasisId);
  return bonus ? oasisIcons(bonus) : "";
}

function oasisIconResources(bonus) {
  if (bonus.percent === 50 && bonus.resources.length === 1) {
    return [bonus.resources[0], bonus.resources[0]];
  }
  return bonus.resources;
}

function villageLabel(village) {
  const parts = [village.isCapital ? "Capital" : "Village"];
  if (village.population !== null && village.population !== undefined) {
    parts.push(`${formatNumber(village.population)} pop`);
  }
  return parts.join(" / ");
}

function villageByCoords(avatar, x, y) {
  return avatar?.villages.find((village) => Number(village.x) === Number(x) && Number(village.y) === Number(y)) || null;
}

function filterButton(value, label, active, iconName = "all") {
  return `<button class="${active ? "is-active" : ""}" data-value="${value}" type="button">${icon(iconName)}${label}</button>`;
}

function metric(label, value) {
  return `<div class="summary-metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function icon(name) {
  if (RESOURCE_ICON_FILES[name]) {
    return imageIcon(RESOURCE_ICON_FILES[name], name);
  }
  if (STAT_ICON_FILES[name]) {
    return imageIcon(STAT_ICON_FILES[name], name);
  }
  const path = ICONS[name] || ICONS.all;
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
}

function troopIcon(unit) {
  const src = TROOP_ICON_FILES[troopKey(unit)];
  const extraClass = [
    unit.building === "Stable" ? "icon-mounted" : "",
    unit.tribe === "teutons" && ["Scout", "Catapult"].includes(unit.name) ? "icon-teuton-small" : ""
  ].filter(Boolean).map((className) => ` ${className}`).join("");
  return src ? imageIcon(src, `troop-${unit.tribe}`, extraClass) : icon(roleIcon(unit.role));
}

function imageIcon(src, name, extraClass = "") {
  return `<img class="icon icon-img icon-${escapeHtml(name)}${extraClass}" src="${escapeHtml(src)}" alt="" aria-hidden="true" />`;
}

function tribeIcon(tribeId) {
  if (TRIBE_ICON_FILES[tribeId]) {
    return imageIcon(TRIBE_ICON_FILES[tribeId], `tribe-${tribeId}`, " tribe-icon-img");
  }

  const marks = {
    romans: '<path d="M6 19V9l6-4 6 4v10z" fill="#b84236"/><path d="M8 9h8v9H8z" fill="#e0b66a"/><path d="M8 9l4-5 4 5" fill="#c94132"/><path d="M9 12h6M9 15h6" stroke="#6d2f26" stroke-width="1.4"/>',
    teutons: '<path d="M7 19V9l5-5 5 5v10z" fill="#6b6252"/><path d="M9 9h6v9H9z" fill="#d0c4ad"/><path d="M5 8l4 3M19 8l-4 3" stroke="#d9d2c3" stroke-width="2"/><path d="M10 13h4" stroke="#3c3831" stroke-width="1.5"/>',
    gauls: '<path d="M6 19V9l6-4 6 4v10z" fill="#2f7a58"/><path d="M8 10h8v8H8z" fill="#d4bd74"/><path d="M7 8c-3-2-2-5 1-5 2 0 3 2 4 4M17 8c3-2 2-5-1-5-2 0-3 2-4 4" stroke="#d8d1b3" stroke-width="1.6" fill="none"/>',
    huns: '<path d="M6 19V9l6-5 6 5v10z" fill="#8b5b27"/><path d="M8 10h8v8H8z" fill="#d9b36a"/><path d="M12 4v14M8 8l8 8M16 8l-8 8" stroke="#4d3217" stroke-width="1.3"/>',
    egyptians: '<path d="M6 19V9l6-6 6 6v10z" fill="#c49a2c"/><path d="M8 10h8v8H8z" fill="#f0d36c"/><path d="M8 9h8l-2-4h-4z" fill="#2f5775"/><path d="M10 13h4M12 10v8" stroke="#7d5d16" stroke-width="1.4"/>',
    spartans: '<path d="M6 19V8l6-4 6 4v11z" fill="#8b3331"/><path d="M8 9h8v9H8z" fill="#d9a84c"/><path d="M8 7h8M10 5h4" stroke="#f2d079" stroke-width="2"/><path d="M12 10v7" stroke="#6d251f" stroke-width="1.5"/>',
    vikings: '<path d="M6 19V9l6-5 6 5v10z" fill="#416d8a"/><path d="M8 10h8v8H8z" fill="#c6d5df"/><path d="M8 8c-3-1-4-4-1-5 2 1 3 3 4 5M16 8c3-1 4-4 1-5-2 1-3 3-4 5" stroke="#e7ecef" stroke-width="1.6" fill="none"/><path d="M10 14h4" stroke="#2c4f65" stroke-width="1.5"/>'
  };

  return `<span class="tribe-icon tribe-icon-${tribeId}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${marks[tribeId] || marks.romans}</svg></span>`;
}

function resultMetric(label, value) {
  return `<span>${label}</span><strong>${value}</strong>`;
}

function tribeName(id) {
  return TRIBES.find((tribe) => tribe.id === id)?.name ?? id;
}

function roleLabel(role) {
  const labels = {
    all: "All",
    offense: "Offense",
    defense: "Defense",
    hybrid: "Hybrid",
    scout: "Scout",
    siege: "Siege",
    administrator: "Admin",
    settler: "Settler"
  };
  return labels[role] ?? titleCase(role);
}

function roleIcon(role) {
  const icons = {
    all: "all",
    offense: "attack",
    defense: "defense",
    hybrid: "hybrid",
    scout: "scout",
    siege: "siege",
    administrator: "administrator",
    settler: "settler"
  };
  return icons[role] || "all";
}

function categoryIcon(category) {
  const icons = {
    all: "all",
    resource: "resource",
    infrastructure: "building",
    storage: "storage",
    defense: "defense",
    military: "attack",
    economy: "economy",
    diplomacy: "diplomacy",
    expansion: "settler",
    culture: "culture",
    hero: "hero",
    artifact: "artifact",
    "resource bonus": "crop"
  };
  return icons[category] || "building";
}

function titleCase(value) {
  return String(value)
    .split(/[\s-]/)
    .map((part) => part ? part[0].toUpperCase() + part.slice(1) : part)
    .join(" ");
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return Math.round(value).toLocaleString("en-US");
}

function costSummary(cost) {
  if (!cost) return "-";
  const hasSplit = [cost.wood, cost.clay, cost.iron, cost.crop].every((value) => value !== null);
  if (!hasSplit) return `<strong>${formatNumber(cost.total)}</strong><span>total only</span>`;

  return `
    <div class="cost-grid">
      <span class="resource wood">${icon("wood")}${formatNumber(cost.wood)}</span>
      <span class="resource clay">${icon("clay")}${formatNumber(cost.clay)}</span>
      <span class="resource iron">${icon("iron")}${formatNumber(cost.iron)}</span>
      <span class="resource crop">${icon("crop")}${formatNumber(cost.crop)}</span>
      <strong class="resource-total">Total ${formatNumber(cost.total)}</strong>
    </div>
  `;
}

function compactCost(cost) {
  const hasSplit = [cost.wood, cost.clay, cost.iron, cost.crop].every((value) => value !== null && value !== undefined);
  if (!hasSplit) return `${formatNumber(cost.total)} total`;
  return `${icon("wood")}${formatNumber(cost.wood)} / ${icon("clay")}${formatNumber(cost.clay)} / ${icon("iron")}${formatNumber(cost.iron)} / ${icon("crop")}${formatNumber(cost.crop)} / Total ${formatNumber(cost.total)}`;
}

function multiplyCost(cost, quantity) {
  return {
    wood: cost.wood === null ? null : cost.wood * quantity,
    clay: cost.clay === null ? null : cost.clay * quantity,
    iron: cost.iron === null ? null : cost.iron * quantity,
    crop: cost.crop === null ? null : cost.crop * quantity,
    total: cost.total === null ? null : cost.total * quantity
  };
}

function trainableCount(cost, available) {
  const resources = ["wood", "clay", "iron", "crop"];
  const hasAnyResource = resources.some((resource) => Number(available[resource]) > 0);
  const hasSplit = resources.every((resource) => cost[resource] !== null && cost[resource] !== undefined);
  if (!hasAnyResource || !hasSplit) return null;

  return Math.min(...resources.map((resource) => {
    if (cost[resource] <= 0) return Number.POSITIVE_INFINITY;
    return Math.floor(Number(available[resource] || 0) / cost[resource]);
  }));
}

function efficiencySummary(unit) {
  if (!unit.cost.total) return "-";
  const attackPerResource = unit.attack / unit.cost.total;
  const defensePerResource = (unit.defInf + unit.defCav) / unit.cost.total;
  const raidScore = unit.carry * unit.speed;

  return `
    <span>${icon("attack")}${attackPerResource.toFixed(3)} atk/res</span>
    <span>${icon("defense")}${defensePerResource.toFixed(3)} def/res</span>
    <span>${icon("carry")}${formatNumber(raidScore)} raid score</span>
  `;
}

function trainingSeconds(unit, buildingLevel, speed) {
  const base = parseTime(unit.trainTime);
  const levelMultiplier = Math.pow(0.9, buildingLevel - 1);
  return base * levelMultiplier / speed;
}

function smithyStats(unit, level) {
  const multiplier = Math.pow(1.015, clamp(Number(level) || 0, 0, 20));
  return {
    attack: Math.round(unit.attack * multiplier),
    defInf: Math.round(unit.defInf * multiplier),
    defCav: Math.round(unit.defCav * multiplier)
  };
}

function parseTime(value) {
  const parts = value.split(":").map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function formatDuration(totalSeconds) {
  if (!Number.isFinite(totalSeconds)) return "-";
  const seconds = Math.max(0, Math.round(totalSeconds));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const clock = [hours, minutes, secs].map((value) => String(value).padStart(2, "0")).join(":");
  return days ? `${days}d ${clock}` : clock;
}

function buildingLevelCost(building, level) {
  const multiplier = Math.pow(building.factor, level - 1);
  return {
    wood: roundTravian(building.cost.wood * multiplier),
    clay: roundTravian(building.cost.clay * multiplier),
    iron: roundTravian(building.cost.iron * multiplier),
    crop: roundTravian(building.cost.crop * multiplier),
    total: 0
  };
}

function buildingRangeCost(building, from, to) {
  const total = { wood: 0, clay: 0, iron: 0, crop: 0, total: 0 };
  for (let level = from + 1; level <= to; level += 1) {
    const cost = buildingLevelCost(building, level);
    total.wood += cost.wood;
    total.clay += cost.clay;
    total.iron += cost.iron;
    total.crop += cost.crop;
  }
  total.total = total.wood + total.clay + total.iron + total.crop;
  return total;
}

function roundTravian(value) {
  return Math.max(0, Math.round(value / 5) * 5);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
