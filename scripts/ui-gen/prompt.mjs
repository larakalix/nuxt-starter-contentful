import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { normalizeType } from "./args.mjs";

const colors = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    yellow: "\x1b[33m",
};

const PAD = "  ";

async function askYesNo(rl, question, defaultYes = false) {
    const hint = defaultYes ? "Y/n" : "y/N";
    const ans = (
        await rl.question(
            `${PAD}${question} ${colors.gray}(${hint})${colors.reset} `
        )
    )
        .trim()
        .toLowerCase();

    if (!ans) return defaultYes;
    if (["y", "yes"].includes(ans)) return true;
    if (["n", "no"].includes(ans)) return false;

    return defaultYes;
}

export async function confirmOverwrite(targetDir) {
    const isTTY = process.stdout.isTTY === true;

    if (!isTTY) {
        throw new Error(
            `Target already exists: ${targetDir} (use --force to overwrite)`
        );
    }

    const rl = readline.createInterface({ input, output });

    try {
        console.log(`\n${colors.yellow}⚠ Target already exists${colors.reset}`);
        console.log(`${colors.gray}${targetDir}${colors.reset}\n`);

        return await askYesNo(rl, "Overwrite it?", false);
    } finally {
        rl.close();
    }
}

export async function promptMissing({ name, type, skipVariant }) {
    const rl = readline.createInterface({ input, output });

    try {
        const next = { name, type, skipVariant };

        console.log();
        console.log(
            `${PAD}${colors.cyan}${colors.bold}Create UI Component${colors.reset}`
        );
        console.log(
            `${PAD}${colors.gray}Press Enter to accept defaults.${colors.reset}\n`
        );

        if (!next.name) {
            next.name = (
                await rl.question(
                    `Name ${colors.gray}(e.g. pricing-card)${colors.reset}: `
                )
            ).trim();
        }

        if (!next.type) {
            console.log(`${PAD}Type:`);
            console.log(`${PAD}  ${colors.cyan}1${colors.reset}) Atoms`);
            console.log(`${PAD}  ${colors.cyan}2${colors.reset}) Molecules`);
            console.log(`${PAD}  ${colors.cyan}3${colors.reset}) Organisms`);
            console.log(`${PAD}  ${colors.cyan}4${colors.reset}) Pages`);
            console.log();

            const raw = await rl.question(
                `${PAD}Choose a type ${colors.gray}${colors.reset}: `
            );
            next.type = raw.trim();
        }

        if (skipVariant === false) {
            const include = await askYesNo(rl, `\n${PAD}Include variants.ts?`, true);
            next.skipVariant = !include;
        }

        next.type = normalizeType(next.type) ?? next.type;

        return next;
    } finally {
        rl.close();
    }
}
