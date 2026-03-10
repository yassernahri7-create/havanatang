const express = require("express");
const path = require("path");

const { parsePort } = require("./server-common");
const { ensureStorage, readData, uploadsDir } = require("./site-store");

const app = express();
const port = parsePort(process.env.PORT, 3000);

ensureStorage();

const PUBLIC_FILES = new Set([
  "/index.html",
  "/style.css",
  "/i18n.js",
  "/bg.png",
  "/club_bg.png"
]);

function sendRootFile(res, relativePath) {
  res.sendFile(path.join(__dirname, relativePath));
}

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "website" });
});

app.get("/api/data", (_req, res) => {
  res.json(readData());
});

app.use("/uploads", express.static(uploadsDir));

app.get("/", (_req, res) => {
  sendRootFile(res, "index.html");
});

app.get("/admin", (_req, res) => {
  res.status(404).type("text/plain").send("Not Found");
});

app.get(/.*/, (req, res, next) => {
  if (!PUBLIC_FILES.has(req.path)) {
    next();
    return;
  }

  sendRootFile(res, req.path.slice(1));
});

app.use((_req, res) => {
  res.status(404).type("text/plain").send("Not Found");
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Havana website server running on 0.0.0.0:${port}`);
});

module.exports = { app, server };
