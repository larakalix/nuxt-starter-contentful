use std::time::{Duration, Instant};

#[derive(Clone, Copy, Debug)]
pub enum MenuAction {
    GenerateExports,
    CreatePackage,
    CleanNodeModules,
    Exit,
}

pub struct MenuItem {
    pub label: &'static str,
    pub action: MenuAction,
}

pub fn menu_items() -> Vec<MenuItem> {
    vec![
        MenuItem {
            label: "✨ Generate UI exports",
            action: MenuAction::GenerateExports,
        },
        MenuItem {
            label: "📦 Create new package",
            action: MenuAction::CreatePackage,
        },
        MenuItem {
            label: "🧹 Clean node_modules",
            action: MenuAction::CleanNodeModules,
        },
        MenuItem {
            label: "❌ Exit",
            action: MenuAction::Exit,
        },
    ]
}

#[derive(Clone, Copy, Debug)]
pub enum Mode {
    Menu,
    PromptPackageName,
}

pub struct AppState {
    pub menu: Vec<MenuItem>,
    pub selected: usize,

    pub output: Vec<String>,

    pub dry_run: bool,

    // simple spinner
    pub busy: bool,
    pub spinner_i: usize,
    pub last_spinner_tick: Instant,

    // “wizard” input
    pub mode: Mode,
    pub input: String,

    // last action header
    pub last_action_title: String,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            menu: menu_items(),
            selected: 0,
            output: vec![
                "👋 Repo CLI ready".into(),
                "Use ↑/↓ to navigate, Enter to run. Press 'd' to toggle dry-run.".into(),
            ],
            dry_run: false,
            busy: false,
            spinner_i: 0,
            last_spinner_tick: Instant::now(),
            mode: Mode::Menu,
            input: String::new(),
            last_action_title: "Output".into(),
        }
    }

    pub fn next(&mut self) {
        self.selected = (self.selected + 1) % self.menu.len();
    }

    pub fn prev(&mut self) {
        if self.selected == 0 {
            self.selected = self.menu.len() - 1;
        } else {
            self.selected -= 1;
        }
    }

    pub fn selected_action(&self) -> MenuAction {
        self.menu[self.selected].action
    }

    pub fn set_busy(&mut self, busy: bool) {
        self.busy = busy;
        self.last_spinner_tick = Instant::now();
    }

    pub fn tick_spinner(&mut self) {
        if !self.busy {
            return;
        }
        if self.last_spinner_tick.elapsed() >= Duration::from_millis(120) {
            self.spinner_i = (self.spinner_i + 1) % 10;
            self.last_spinner_tick = Instant::now();
        }
    }

    pub fn spinner_char(&self) -> char {
        // simple ASCII spinner so it works everywhere
        const FRAMES: &[char] = &['|', '/', '-', '\\', '|', '/', '-', '\\', '|', '/'];
        if self.busy {
            FRAMES[self.spinner_i]
        } else {
            ' '
        }
    }

    pub fn clear_output_for_action(&mut self, title: impl Into<String>) {
        self.last_action_title = title.into();
        self.output.clear();
    }

    pub fn log(&mut self, msg: impl Into<String>) {
        self.output.push(msg.into());
    }
}
