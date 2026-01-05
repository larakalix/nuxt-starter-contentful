#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const PACKAGE_PREFIX = "@starter";

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function createPackage() {
    try {
        const pkgName = await question("Package name: ");

        if (!pkgName) {
            console.error("❌ Package name is required");
            process.exit(1);
        }

        const packagesDir = path.join(process.cwd(), "packages");
        const pkgDir = path.join(packagesDir, pkgName);

        // Check if package already exists
        if (fs.existsSync(pkgDir)) {
            console.error(`❌ Package "${pkgName}" already exists`);
            process.exit(1);
        }

        // Create package directory
        fs.mkdirSync(pkgDir, { recursive: true });

        // Create src directory
        fs.mkdirSync(path.join(pkgDir, "src"), { recursive: true });

        // Create package.json
        const packageJson = {
            name: `${PACKAGE_PREFIX}/${pkgName}`,
            version: "0.0.0",
            private: true,
            main: "./src/index.ts",
            types: "./src/index.ts",
            exports: {
                ".": "./src/index.ts",
            },
            scripts: {
                dev: "tsc --watch",
                build: "tsc",
            },
            devDependencies: {
                tsconfig: "workspace:*",
                typescript: "~5.9.3",
            },
        };

        fs.writeFileSync(
            path.join(pkgDir, "package.json"),
            JSON.stringify(packageJson, null, 2)
        );

        // Create tsconfig.json
        const tsConfig = {
            extends: "tsconfig/base.json",
            compilerOptions: {
                outDir: "dist",
                rootDir: "src",
            },
            include: ["src"],
            exclude: ["node_modules", "dist"],
        };

        fs.writeFileSync(
            path.join(pkgDir, "tsconfig.json"),
            JSON.stringify(tsConfig, null, 2)
        );

        // Create index.ts
        fs.writeFileSync(
            path.join(pkgDir, "src", "index.ts"),
            `export const hello = () => 'Hello from ${PACKAGE_PREFIX}/${pkgName}';\n`
        );

        // Create README.md
        fs.writeFileSync(
            path.join(pkgDir, "README.md"),
            `# ${PACKAGE_PREFIX}/${pkgName}\n\nPackage description here.\n`
        );

        console.log(`\n✅ Package "${pkgName}" created successfully!`);
        console.log(`📁 Location: packages/${pkgName}`);
        console.log(`\nNext steps:`);
        console.log(`  1. Run: pnpm install`);
        console.log(`  2. Start editing: packages/${pkgName}/src/index.ts\n`);
    } catch (error) {
        console.error("❌ Error creating package:", error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
}

createPackage();
