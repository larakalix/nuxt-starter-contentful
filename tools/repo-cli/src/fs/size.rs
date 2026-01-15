use anyhow::Result;
use std::fs;
use std::path::Path;

/// Recursively calculate directory size in bytes
pub fn dir_size(path: &Path) -> Result<u64> {
    let mut size = 0;

    if path.is_file() {
        return Ok(fs::metadata(path)?.len());
    }

    if path.is_dir() {
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let entry_path = entry.path();

            if entry_path.is_dir() {
                size += dir_size(&entry_path)?;
            } else {
                size += fs::metadata(entry_path)?.len();
            }
        }
    }

    Ok(size)
}

/// Human readable formatting (KB / MB / GB)
pub fn format_bytes(bytes: u64) -> String {
    const KB: f64 = 1024.0;
    const MB: f64 = KB * 1024.0;
    const GB: f64 = MB * 1024.0;

    let b = bytes as f64;

    if b >= GB {
        format!("{:.2} GB", b / GB)
    } else if b >= MB {
        format!("{:.2} MB", b / MB)
    } else if b >= KB {
        format!("{:.2} KB", b / KB)
    } else {
        format!("{} B", bytes)
    }
}
