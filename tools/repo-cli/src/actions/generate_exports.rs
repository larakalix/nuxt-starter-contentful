use anyhow::{Context, Result};
use serde_json::{json, Value};
use std::{
    fs,
    path::{Path, PathBuf},
};

use crate::app::AppState;

const UI_PKG_JSON: &str = "packages/ui/package.json";
const UI_COMPONENTS_ROOT: &str = "packages/ui/src/components";
const GROUPS: &[&str] = &["atoms", "molecules", "organisms", "pages"];

pub fn run(app: &mut AppState) -> Result<()> {
    app.clear_output_for_action("Generate UI exports");
    app.set_busy(true);

    app.log("🔍 Scanning components...");
    let mut exports_map = serde_json::Map::new();

    // Keep root export always:
    exports_map.insert(
        ".".into(),
        json!({
            "import": "./src/index.ts",
            "types": "./src/index.ts"
        }),
    );

    for group in GROUPS {
        let group_dir = Path::new(UI_COMPONENTS_ROOT).join(group);
        if !group_dir.exists() {
            app.log(format!("⚠️  Missing folder: {}", group_dir.display()));
            continue;
        }

        for entry in
            fs::read_dir(&group_dir).with_context(|| format!("read_dir {}", group_dir.display()))?
        {
            let entry = entry?;
            let path = entry.path();
            if !path.is_dir() {
                continue;
            }

            let name = path
                .file_name()
                .and_then(|s| s.to_str())
                .unwrap_or("")
                .to_string();
            if name.starts_with('.') {
                continue;
            }

            // expect: packages/ui/src/components/<group>/<name>/index.ts
            let index_ts = path.join("index.ts");
            if !index_ts.exists() {
                // not a component folder
                continue;
            }

            let key = format!("./{}/{}", group, name);
            let import_path = format!("./src/components/{}/{}/index.ts", group, name);

            exports_map.insert(
                key,
                json!({
                    "import": import_path,
                    "types": import_path
                }),
            );
        }
    }

    app.log(format!("📝 Updating {}", UI_PKG_JSON));

    if app.dry_run {
        app.log("🧪 Dry-run enabled: not writing package.json");
        app.set_busy(false);
        return Ok(());
    }

    let pkg_path = PathBuf::from(UI_PKG_JSON);
    let raw =
        fs::read_to_string(&pkg_path).with_context(|| format!("read {}", pkg_path.display()))?;
    let mut v: Value = serde_json::from_str(&raw).context("parse package.json")?;

    // merge
    v["exports"] = Value::Object(exports_map);

    let pretty = serde_json::to_string_pretty(&v).context("stringify package.json")?;
    fs::write(&pkg_path, pretty).with_context(|| format!("write {}", pkg_path.display()))?;

    app.log("✅ Exports generated successfully");
    app.set_busy(false);
    Ok(())
}
