import fs from "node:fs";
import path from "node:path";
import { DEFAULT_PATH } from "./constants.mjs";

export function ensureDir(dir, force) {
    if (fs.existsSync(dir)) {
        if (!force)
            throw new Error(`Directory already exists: ${dir} (use --force)`);
        fs.rmSync(dir, { recursive: true, force: true });
    }
    fs.mkdirSync(dir, { recursive: true });
}

export function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content, "utf8");
}

export function resolveTargetDir({ type, componentDirName }) {
    return path.resolve(process.cwd(), ...DEFAULT_PATH, type, componentDirName);
}

export function exists(p) {
    return fs.existsSync(p);
}
