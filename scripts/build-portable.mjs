import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "public");
const portableDir = path.join(root, "portable");

const copyRecursive = (src, dest) => {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

if (fs.existsSync(portableDir)) {
  try {
    fs.rmSync(portableDir, { recursive: true, force: true });
  } catch (error) {
    console.warn("Portable folder busy; overwriting files in place.");
  }
}
fs.mkdirSync(portableDir, { recursive: true });

copyRecursive(sourceDir, portableDir);

const portableIndex = path.join(portableDir, "index.html");
if (fs.existsSync(portableIndex)) {
  let indexMarkup = fs.readFileSync(portableIndex, "utf8");
  indexMarkup = indexMarkup
    .replace(/\.\/public\//g, "./")
    .replace(/href="\/styles\.css/g, 'href="./styles.css')
    .replace(/src="\/ITChatBuddyAvatar\.mp4/g, 'src="./ITChatBuddyAvatar.mp4')
    .replace(/src="\/ITChatBuddyAvatar\.mov/g, 'src="./ITChatBuddyAvatar.mov');
  fs.writeFileSync(portableIndex, indexMarkup, "utf8");
}

const landingSrc = path.join(root, "tech_support_landing (1).html");
if (fs.existsSync(landingSrc)) {
  let landing = fs.readFileSync(landingSrc, "utf8");
  landing = landing.replace(/\.\/public\//g, "./");
  fs.writeFileSync(path.join(portableDir, "tech_support_landing.html"), landing, "utf8");
}

const readme = `Portable Tech Support Bro
===========================

Files in this folder are ready for offline use.

How to launch:
1. Open index.html in your browser for the standard landing page.
2. Open tech_support_landing.html for the alternative Codex view.

Tips:
- Leave all files together; the app loads fonts, videos, and knowledge base from this same folder.
- For the best experience, open the HTML files in a Chromium-based browser (Edge, Chrome) with local file access enabled.
- To update the offline knowledge base, run \`npm run build-kb\` then \`npm run portable\` from the project root.
`;

const launcher = `@echo off
start "" "%~dp0index.html"
`;

fs.writeFileSync(path.join(portableDir, "Launch Tech Support Bro.bat"), launcher, "utf8");
fs.writeFileSync(path.join(portableDir, "README.txt"), readme, "utf8");

console.log("Portable bundle created in:", portableDir);
