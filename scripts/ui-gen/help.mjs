export function printHelp() {
    console.log(`
UI Component Generator

Usage:
  pnpm ui:gen <name> --type <atoms|molecules|organisms> [--skip-variant] [--force]

Examples:
  pnpm ui:gen card --type molecules
  pnpm ui:gen author-card --type molecules
  pnpm ui:gen hero --type organisms --skip-variant
`);
    process.exit(0);
}
