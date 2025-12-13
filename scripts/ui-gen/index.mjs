#!/usr/bin/env node
import { parseArgs, normalizeType } from "./args.mjs";
import { printHelp } from "./help.mjs";
import { toKebabCase, toPascalCase } from "./strings.mjs";
import { buildPlan, generateComponent } from "./generate.mjs";
import { printPlan } from "./plan.mjs";
import { promptMissing, confirmOverwrite } from "./prompt.mjs";
import { exists } from "./fs.mjs";
import { successMessage } from "./logger.mjs";

async function main() {
    try {
        let args = parseArgs(process.argv);

        if (!args.name || !args.type) {
            args = { ...args, ...(await promptMissing(args)) };
        }

        const normalizedType = normalizeType(args.type);
        if (!normalizedType) {
            throw new Error(
                `Invalid --type "${args.type}". Use atom(s), molecule(s), or organism(s).`
            );
        }

        const fileBaseName = toKebabCase(args.name);
        const componentName = toPascalCase(fileBaseName);

        const { targetDir, files } = buildPlan({
            type: normalizedType,
            fileBaseName,
            skipVariant: args.skipVariant,
        });

        const alreadyExists = exists(targetDir);
        const willOverwrite = alreadyExists && !!args.force;

        printPlan({
            type: normalizedType,
            name: fileBaseName,
            targetDir,
            files,
            skipVariant: args.skipVariant,
            willOverwrite,
        });

        if (alreadyExists && !args.force) {
            const ok = await confirmOverwrite(targetDir);
            if (!ok) {
                console.log("\nCanceled.\n");
                return;
            }
            args.force = true;
        }

        const start = process.hrtime.bigint();

        const result = generateComponent({
            type: normalizedType,
            fileBaseName,
            componentName,
            skipVariant: args.skipVariant,
            force: args.force,
        });

        const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;

        await successMessage({
            name: fileBaseName,
            type: normalizedType,
            path: result.targetDir,
            skipVariant: args.skipVariant,
            elapsedMs,
        });
    } catch (err) {
        console.error(
            `❌ ${err instanceof Error ? err.message : String(err)}\n`
        );
        printHelp();
        process.exit(1);
    }
}

main();
