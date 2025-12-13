import path from "node:path";
import { ensureDir, writeFile, resolveTargetDir } from "./fs.mjs";
import {
    vueTemplate,
    typesTemplate,
    variantsTemplate,
    indexTemplate,
} from "./templates.mjs";

export function buildPlan({ type, fileBaseName, skipVariant }) {
    const targetDir = resolveTargetDir({
        type,
        componentDirName: fileBaseName,
    });

    const files = [
        `${fileBaseName}.vue`,
        "types.ts",
        ...(skipVariant ? [] : ["variants.ts"]),
        "index.ts",
    ];

    return { targetDir, files };
}

export function generateComponent({
    type,
    fileBaseName,
    componentName,
    skipVariant,
    force,
}) {
    const { targetDir, files } = buildPlan({ type, fileBaseName, skipVariant });

    ensureDir(targetDir, force);

    writeFile(
        path.join(targetDir, `${fileBaseName}.vue`),
        vueTemplate(componentName, !skipVariant)
    );
    writeFile(path.join(targetDir, "types.ts"), typesTemplate(componentName));

    if (!skipVariant) {
        writeFile(
            path.join(targetDir, "variants.ts"),
            variantsTemplate(componentName)
        );
    }

    writeFile(
        path.join(targetDir, "index.ts"),
        indexTemplate(fileBaseName, componentName)
    );

    return { targetDir, files };
}
