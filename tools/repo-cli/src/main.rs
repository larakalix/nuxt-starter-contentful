use anyhow::Result;
use crossterm::{
    event::{self, Event, KeyCode},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{backend::CrosstermBackend, Terminal};
use std::io;

mod actions;
mod app;
mod fs;
mod ui;

use app::{AppState, MenuAction, Mode};
use ui::render;

fn main() -> Result<()> {
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let mut app = AppState::new();

    loop {
        app.tick_spinner();
        terminal.draw(|f| render(f, &app))?;

        if event::poll(std::time::Duration::from_millis(50))? {
            if let Event::Key(key) = event::read()? {
                match app.mode {
                    Mode::Menu => match key.code {
                        KeyCode::Up => app.prev(),
                        KeyCode::Down => app.next(),
                        KeyCode::Char('d') => {
                            app.dry_run = !app.dry_run;
                            app.log(format!("🧪 dry-run: {}", app.dry_run));
                        }
                        KeyCode::Enter => match app.selected_action() {
                            MenuAction::GenerateExports => {
                                actions::generate_exports::run(&mut app)?
                            }
                            MenuAction::CreatePackage => actions::create_package::begin(&mut app),
                            MenuAction::CleanNodeModules => {
                                actions::clean_node_modules::run(&mut app)?
                            }
                            MenuAction::Exit => break,
                        },
                        KeyCode::Esc | KeyCode::Char('q') => break,
                        _ => {}
                    },

                    Mode::PromptPackageName => match key.code {
                        KeyCode::Esc => actions::create_package::cancel(&mut app),
                        KeyCode::Enter => {
                            if let Err(e) = actions::create_package::submit(&mut app) {
                                app.set_busy(false);
                                app.log(format!("❌ {}", e));
                            }
                        }
                        KeyCode::Backspace => {
                            app.input.pop();
                        }
                        KeyCode::Char(c) => {
                            app.input.push(c);
                        }
                        _ => {}
                    },
                }
            }
        }
    }

    disable_raw_mode()?;
    execute!(terminal.backend_mut(), LeaveAlternateScreen)?;
    terminal.show_cursor()?;
    Ok(())
}
