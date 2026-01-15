import fs from "fs";
import path from "path";

const ROOT = path.resolve("packages/ui/src/components");
const OUT = path.resolve("packages/ui/package.exports.json");

function walk(dir, prefix = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const exports = {};

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const name = entry.name;
        const indexFile = path.join(dir, name, "index.ts");

        if (fs.existsSync(indexFile)) {
            const exportPath = `./${prefix}${name}`;
            const filePath = `./src/components/${prefix}${name}/index.ts`;

            exports[exportPath] = {
                import: filePath,
                types: filePath,
            };
        }
    }

    return exports;
}

const exportsMap = {
    ...walk(path.join(ROOT, "atoms"), "atoms/"),
    ...walk(path.join(ROOT, "molecules"), "molecules/"),
    ...walk(path.join(ROOT, "organisms"), "organisms/"),
};

fs.writeFileSync(OUT, JSON.stringify(exportsMap, null, 2));
console.log("✔ UI exports generated");
