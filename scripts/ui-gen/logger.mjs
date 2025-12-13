const colors = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    magenta: "\x1b[35m",
};

const PAD = "  ";

function stripAnsi(s) {
    return s.replace(/\x1b\[[0-9;]*m/g, "");
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function iconFor(type) {
    switch (type) {
        case "atoms":
            return "⚛️";
        case "molecules":
            return "🧩";
        case "organisms":
            return "🏗️";
        case "pages":
            return "📄";
        default:
            return "✨";
    }
}

function shortenPath(p, max = 68) {
    if (!p || p.length <= max) return p;
    const head = p.slice(0, Math.floor(max * 0.55));
    const tail = p.slice(-Math.floor(max * 0.35));
    return `${head}${colors.dim}…${colors.reset}${tail}`;
}

function happyBox(lines) {
    const width = Math.max(...lines.map((l) => stripAnsi(l).length)) + 6;

    const top = `${PAD}╭${"─".repeat(width)}╮`;
    const bottom = `${PAD}╰${"─".repeat(width)}╯`;

    const body = lines
        .map((l) => {
            const len = stripAnsi(l).length;
            const padRight = " ".repeat(width - len - 4);
            return `${PAD}│  ${l}${padRight}  │`;
        })
        .join("\n");

    return `${top}\n${body}\n${bottom}`;
}

export async function successMessage({ name, type, path, elapsedMs }) {
    const isTTY = process.stdout.isTTY === true;
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    const craft = iconFor(type);

    if (isTTY) {
        for (let i = 0; i < frames.length; i++) {
            process.stdout.write(
                `\r${PAD}${colors.cyan}${frames[i]}${colors.reset} Crafting ${colors.bold}${name}${colors.reset}…`
            );
            await sleep(35);
        }
        process.stdout.write("\r");
    }

    const header = `${craft}  ${colors.green}${colors.bold}Created successfully${colors.reset}  ${colors.yellow}🎉${colors.reset}`;
    const timeLine =
        typeof elapsedMs === "number"
            ? `${colors.gray}Time${colors.reset}     ${colors.green}${
                  colors.bold
              }${elapsedMs.toFixed(0)}ms${colors.reset}`
            : null;

    const lines = [
        header,
        "",
        `${colors.gray}Name${colors.reset}     ${colors.bold}${name}${colors.reset}`,
        `${colors.gray}Type${colors.reset}     ${type}`,
        `${colors.gray}Path${colors.reset}     ${shortenPath(path)}`,
        ...(timeLine ? [timeLine] : []),
        "",
        `${colors.gray}Next${colors.reset}     ${colors.magenta}open ${type}/${name}${colors.reset}`,
    ];

    console.log(happyBox(lines));
    console.log();
}
