use anyhow::Result;
use std::{
    fs,
    path::{Path, PathBuf},
};

pub fn find_dirs_named(root: impl AsRef<Path>, name: &str) -> Result<Vec<PathBuf>> {
    let mut out = Vec::new();
    walk(root.as_ref(), name, &mut out)?;
    Ok(out)
}

fn walk(dir: &Path, name: &str, out: &mut Vec<PathBuf>) -> Result<()> {
    if !dir.is_dir() {
        return Ok(());
    }

    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();

        if path.file_name().and_then(|s| s.to_str()) == Some(name) {
            out.push(path);
            continue;
        }

        if path.is_dir() {
            // skip huge dirs
            let fname = path.file_name().and_then(|s| s.to_str()).unwrap_or("");
            if fname == ".git" || fname == "dist" || fname == ".turbo" || fname == "target" {
                continue;
            }
            walk(&path, name, out)?;
        }
    }

    Ok(())
}
