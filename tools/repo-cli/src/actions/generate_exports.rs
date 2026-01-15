use anyhow::{Context, Result};
use serde_json::{json, Map, Value};
use std::{
    fs,
    path::{Path, PathBuf},
};

use crate::app::AppState;

const UI_PKG_JSON: &str = "packages/ui/package.json";
const UI_COMPONENTS_ROOT: &str = "packages/ui/src/components";
const GROUPS: &[&str] = &["atoms", "molecules", "organisms", "pages"];

/// Static exports that must ALWAYS exist
fn static_exports() -> Map<String, Value> {
    let mut map = Map::new();

    // Root
    map.insert(
        ".".into(),
        json!({
            "import": "./src/index.ts",
            "types": "./src/index.ts"
        }),
    );
    // utils
    map.insert(
        "./utils".into(),
        json!({
            "import": "./src/lib/index.ts",
            "types": "./src/lib/index.ts"
        }),
    );
    // constants
    map.insert(
        "./constants".into(),
        json!({
            "import": "./src/constants/index.ts",
            "types": "./src/constants/index.ts"
        }),
    );
    // styles (explicit CSS export)
    map.insert(
        "./styles/date-picker".into(),
        json!({
            "default": "./src/components/molecules/date-picker/date-picker.css",
            "types": "./src/components/molecules/date-picker/date-picker.css"
        }),
    );

    map
}

pub fn run(app: &mut AppState) -> Result<()> {
    app.clear_output_for_action("Generate UI exports");
    app.set_busy(true);

    app.log("🔍 Scanning UI components...");

    let mut exports_map = static_exports();

    // ── Dynamic component exports ───────────────────────────────
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

            let name = path.file_name().and_then(|s| s.to_str()).unwrap_or("");

            if name.starts_with('.') {
                continue;
            }

            // Require index.ts to be a valid component
            let index_ts = path.join("index.ts");
            if !index_ts.exists() {
                continue;
            }

            let export_key = format!("./{}/{}", group, name);
            let import_path = format!("./src/components/{}/{}/index.ts", group, name);

            exports_map.insert(
                export_key,
                json!({
                    "import": import_path,
                    "types": import_path
                }),
            );
        }
    }

    app.log(format!("📝 Writing exports to {}", UI_PKG_JSON));

    if app.dry_run {
        app.log("🧪 Dry-run enabled — package.json not modified");
        app.set_busy(false);
        return Ok(());
    }

    // ── Write package.json ─────────────────────────────────────
    let pkg_path = PathBuf::from(UI_PKG_JSON);
    let raw =
        fs::read_to_string(&pkg_path).with_context(|| format!("read {}", pkg_path.display()))?;

    let mut pkg: Value = serde_json::from_str(&raw).context("parse package.json")?;

    pkg["exports"] = Value::Object(exports_map);

    let pretty = serde_json::to_string_pretty(&pkg).context("stringify package.json")?;

    fs::write(&pkg_path, pretty).with_context(|| format!("write {}", pkg_path.display()))?;

    app.log("✅ UI exports generated successfully");
    app.set_busy(false);

    Ok(())
}
