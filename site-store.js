const fs = require("fs");
const path = require("path");

const dataFile = process.env.DATA_FILE || path.join(__dirname, "data.json");
const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, "uploads");

const INITIAL_DATA = {
  events: [
    {
      id: "ev-1",
      image: "",
      day: "SUNDAY",
      date: "DOMINGO 8 FEBRERO",
      details: "ENTRADA LIBRE TODA LA NOCHE\nHAPPY HOUR DE 22H A 00H",
      musicBy: "DJ MARTINEZ",
      themeColor: "#ff2d2d"
    },
    {
      id: "ev-2",
      image: "",
      day: "SATURDAY",
      date: "SABADO 7 FEBRERO",
      details: "ENTRADA LIBRE TODA LA NOCHE\nHAPPY HOUR DE 21H A 23H\nCOPAS 7,5 EUR",
      musicBy: "DJ MARTINEZ",
      themeColor: "#4f72ff"
    },
    {
      id: "ev-3",
      image: "",
      day: "FRIDAY",
      date: "VIERNES 6 FEBRERO",
      details: "ENTRADA LIBRE TODA LA NOCHE\nHAPPY HOUR DE 21H A 23H\nCOPAS 7 EUR",
      musicBy: "DJ MARTINEZ",
      themeColor: "#00f5ff"
    }
  ],
  carta: {
    drinks: []
  },
  photos: [],
  settings: {
    tiktok: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    phone: ""
  }
};

function ensureParentDirectory(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function ensureStorage() {
  ensureParentDirectory(dataFile);

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(INITIAL_DATA, null, 2), "utf8");
  }
}

function asString(value, maxLength = 4000) {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength);
}

function sanitizeEvent(event, index) {
  const source = event && typeof event === "object" ? event : {};
  return {
    id: asString(source.id, 128) || `ev-${Date.now()}-${index}`,
    image: asString(source.image, 2048),
    day: asString(source.day, 80),
    date: asString(source.date, 160),
    details: asString(source.details, 4000),
    musicBy: asString(source.musicBy, 160),
    themeColor: asString(source.themeColor, 32) || "#ff2d78"
  };
}

function sanitizeDrink(drink, index) {
  const source = drink && typeof drink === "object" ? drink : {};
  return {
    id: asString(source.id, 128) || `drink-${Date.now()}-${index}`,
    name: asString(source.name, 160),
    category: asString(source.category, 120),
    price: asString(source.price, 120),
    tablePrice: asString(source.tablePrice, 120),
    image: asString(source.image, 2048)
  };
}

function sanitizePhoto(photo, index) {
  const source = photo && typeof photo === "object" ? photo : {};
  const type = asString(source.type, 16).toLowerCase() === "video" ? "video" : "image";
  return {
    id: asString(source.id, 128) || `photo-${Date.now()}-${index}`,
    type,
    src: asString(source.src, 2048),
    alt: asString(source.alt, 240)
  };
}

function sanitizeSettings(settings) {
  const source = settings && typeof settings === "object" ? settings : {};
  return {
    tiktok: asString(source.tiktok, 2048),
    instagram: asString(source.instagram, 2048),
    facebook: asString(source.facebook, 2048),
    whatsapp: asString(source.whatsapp, 64),
    phone: asString(source.phone, 64)
  };
}

function normalizeData(input) {
  const source = input && typeof input === "object" ? input : {};
  const events = Array.isArray(source.events) ? source.events.map(sanitizeEvent) : [];
  const drinks = source.carta && Array.isArray(source.carta.drinks) ? source.carta.drinks.map(sanitizeDrink) : [];
  const photos = Array.isArray(source.photos) ? source.photos.map(sanitizePhoto) : [];

  return {
    events,
    carta: {
      drinks
    },
    photos,
    settings: sanitizeSettings(source.settings)
  };
}

function readData() {
  ensureStorage();

  try {
    const raw = fs.readFileSync(dataFile, "utf8");
    return normalizeData(JSON.parse(raw));
  } catch (error) {
    return normalizeData(INITIAL_DATA);
  }
}

function writeData(data) {
  ensureStorage();
  const normalized = normalizeData(data);
  fs.writeFileSync(dataFile, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

module.exports = {
  dataFile,
  uploadsDir,
  ensureStorage,
  readData,
  writeData,
  normalizeData
};
