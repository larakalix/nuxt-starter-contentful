import { printHelp } from "./help.mjs";

export function parseArgs(argv) {
    const args = argv.slice(2);

    let name = "";
    let type = "";
    let skipVariant = false;
    let force = false;

    for (let i = 0; i < args.length; i++) {
        const a = args[i];

        if (a === "--help" || a === "-h") {
            printHelp();
            process.exit(0);
        }

        if (!a.startsWith("-") && !name) {
            name = a;
            continue;
        }

        if (a === "--type" || a === "-t") {
            type = args[i + 1] ?? "";
            i++;
            continue;
        }

        if (a === "--skip-variant") {
            skipVariant = true;
            continue;
        }

        if (a === "--force" || a === "-f") {
            force = true;
            continue;
        }
    }

    return { name, type, skipVariant, force };
}

export function normalizeType(v) {
    const t = (v ?? "").trim().toLowerCase();
    if (t === "1" || t === "atom" || t === "atoms") return "atoms";
    if (t === "2" || t === "molecule" || t === "molecules") return "molecules";
    if (t === "3" || t === "organism" || t === "organisms") return "organisms";
    if (t === "4" || t === "page" || t === "pages") return "pages";
    return null;
}
