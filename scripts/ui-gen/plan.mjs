const colors = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    gray: "\x1b[90m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
};

const PAD = "  ";

function shortenPath(p, max = 72) {
    if (!p || p.length <= max) return p;
    const head = p.slice(0, Math.floor(max * 0.55));
    const tail = p.slice(-Math.floor(max * 0.35));
    return `${head}${colors.gray}…${colors.reset}${tail}`;
}

export function printPlan({
    type,
    name,
    targetDir,
    files,
    skipVariant,
    willOverwrite,
}) {
    console.log();

    console.log(
        `${PAD}${colors.cyan}${colors.bold}Plan${colors.reset} ${colors.gray}${type}/${name}${colors.reset}`
    );
    console.log(
        `${PAD}${colors.gray}→${colors.reset} ${shortenPath(targetDir)}`
    );

    if (willOverwrite) {
        console.log(
            `${PAD}${colors.yellow}⚠ overwrite enabled (--force)${colors.reset}`
        );
    }

    console.log(`\n${PAD}${colors.gray}Files${colors.reset}`);
    for (const f of files) {
        console.log(`${PAD}  ${colors.green}✓${colors.reset} ${f}`);
    }

    console.log(
        `\n${PAD}${colors.gray}Variants${colors.reset} ${
            skipVariant
                ? `${colors.yellow}skipped${colors.reset}`
                : `${colors.green}included${colors.reset}`
        }`
    );

    console.log();
}
