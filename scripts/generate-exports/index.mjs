import fs from "fs";
import path from "path";

const UI_ROOT = path.resolve("packages/ui/src/components");
const PKG_PATH = path.resolve("packages/ui/package.json");

function getComponentExports(type) {
    const baseDir = path.join(UI_ROOT, type);
    if (!fs.existsSync(baseDir)) return {};

    const entries = fs.readdirSync(baseDir, { withFileTypes: true });
    const exports = {};

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const indexFile = path.join(baseDir, entry.name, "index.ts");
        if (!fs.existsSync(indexFile)) continue;

        const exportKey = `./${type}/${entry.name}`;
        const exportPath = `./src/components/${type}/${entry.name}/index.ts`;

        exports[exportKey] = {
            import: exportPath,
            types: exportPath,
        };
    }

    return exports;
}

const pkg = JSON.parse(fs.readFileSync(PKG_PATH, "utf-8"));

pkg.exports = {
    ".": {
        import: "./src/index.ts",
        types: "./src/index.ts",
    },
    ...getComponentExports("atoms"),
    ...getComponentExports("molecules"),
    ...getComponentExports("organisms"),
};

fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + "\n");

console.log("✔ package.json exports updated");
