const fs = require("fs");
const path = require("path");

const dirs = [
  "backend",
  "backend/controllers",
  "backend/models",
  "backend/routes",
  "backend/middlewares",
  "backend/utils",
  "backend/config",
  "frontend/src",
  "frontend/src/components",
  "frontend/src/pages",
  "frontend/src/context",
  "frontend/src/services",
  "frontend/src/hooks",
  "frontend/public",
];

const baseDir = __dirname;

dirs.forEach((dir) => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

console.log("✓ Directory structure created successfully");
