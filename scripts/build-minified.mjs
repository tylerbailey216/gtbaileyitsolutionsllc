import { build } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const buildMinified = async () => {
  await build({
    entryPoints: [path.join(root, "public", "app.js")],
    outfile: path.join(root, "public", "app.min.js"),
    minify: true,
    sourcemap: false,
    charset: "ascii",
  });

  await build({
    entryPoints: [path.join(root, "public", "styles.css")],
    outfile: path.join(root, "public", "styles.min.css"),
    minify: true,
    sourcemap: false,
    charset: "ascii",
    loader: { ".css": "css" },
  });
};

buildMinified()
  .then(() => {
    console.log("Minified assets created in public/.");
  })
  .catch((error) => {
    console.error("Minified build failed:", error);
    process.exit(1);
  });
