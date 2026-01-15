use anyhow::{bail, Result};
use serde_json::json;
use std::{fs, path::PathBuf};

use crate::app::{AppState, Mode};

const PACKAGE_PREFIX: &str = "@starter";

pub fn begin(app: &mut AppState) {
    app.clear_output_for_action("Create new package");
    app.mode = Mode::PromptPackageName;
    app.input.clear();
    app.log("Type the package name and press Enter.");
}

pub fn submit(app: &mut AppState) -> Result<()> {
    let name = app.input.trim().to_string();
    if name.is_empty() {
        bail!("Package name is required");
    }

    app.set_busy(true);
    app.log(format!("📦 Creating package: {}", name));

    let packages_dir = PathBuf::from("packages");
    let pkg_dir = packages_dir.join(&name);

    if pkg_dir.exists() {
        bail!(format!("Package already exists: packages/{}", name));
    }

    if app.dry_run {
        app.log("🧪 Dry-run enabled: not writing files");
        app.mode = Mode::Menu;
        app.set_busy(false);
        return Ok(());
    }

    fs::create_dir_all(pkg_dir.join("src"))?;

    // package.json
    let package_json = json!({
        "name": format!("{}/{}", PACKAGE_PREFIX, name),
        "version": "0.0.0",
        "private": true,
        "main": "./src/index.ts",
        "types": "./src/index.ts",
        "exports": { ".": "./src/index.ts" },
        "scripts": {
            "dev": "tsc --watch",
            "build": "tsc"
        },
        "devDependencies": {
            "tsconfig": "workspace:*",
            "typescript": "~5.9.3"
        }
    });
    fs::write(
        pkg_dir.join("package.json"),
        serde_json::to_string_pretty(&package_json)?,
    )?;

    // tsconfig.json
    let tsconfig = json!({
        "extends": "tsconfig/base.json",
        "compilerOptions": {
            "outDir": "dist",
            "rootDir": "src"
        },
        "include": ["src"],
        "exclude": ["node_modules", "dist"]
    });
    fs::write(
        pkg_dir.join("tsconfig.json"),
        serde_json::to_string_pretty(&tsconfig)?,
    )?;

    // src/index.ts
    fs::write(
        pkg_dir.join("src/index.ts"),
        format!(
            "export const hello = () => 'Hello from {}/{}';\n",
            PACKAGE_PREFIX, name
        ),
    )?;

    // README.md
    fs::write(
        pkg_dir.join("README.md"),
        format!(
            "# {}/{}\n\nPackage description here.\n",
            PACKAGE_PREFIX, name
        ),
    )?;

    app.log("✅ Package created");
    app.mode = Mode::Menu;
    app.set_busy(false);
    Ok(())
}

pub fn cancel(app: &mut AppState) {
    app.mode = Mode::Menu;
    app.log("↩️  Create package cancelled");
}
