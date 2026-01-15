use ratatui::{
    layout::{Constraint, Direction, Layout, Margin},
    style::{Color, Modifier, Style},
    widgets::{Block, Borders, List, ListItem, Paragraph, Wrap},
    Frame,
};

use crate::app::{AppState, Mode};

pub fn render(f: &mut Frame, app: &AppState) {
    // main split: sidebar + output
    let chunks = Layout::default()
        .direction(Direction::Horizontal)
        .constraints([Constraint::Length(30), Constraint::Min(20)])
        .split(f.size());

    // Sidebar header
    let sidebar = Block::default().title(" Repo CLI ").borders(Borders::ALL);

    // menu items
    let items: Vec<ListItem> = app
        .menu
        .iter()
        .enumerate()
        .map(|(i, it)| {
            let selected = i == app.selected;
            let style = if selected {
                Style::default()
                    .bg(Color::White)
                    .fg(Color::Black)
                    .add_modifier(Modifier::BOLD)
            } else {
                Style::default().fg(Color::White)
            };
            ListItem::new(it.label).style(style)
        })
        .collect();

    let menu_list = List::new(items).block(sidebar).highlight_symbol("▶ ");

    f.render_widget(menu_list, chunks[0]);

    // Output panel
    let title = format!(
        " {} {} {} ",
        app.spinner_char(),
        app.last_action_title,
        if app.dry_run { "(dry-run)" } else { "" }
    );

    let output_block = Block::default().title(title).borders(Borders::ALL);

    let output_text = app.output.join("\n");

    let output = Paragraph::new(output_text)
        .block(output_block)
        .wrap(Wrap { trim: false });

    f.render_widget(output, chunks[1]);

    // Prompt overlay (package name)
    if matches!(app.mode, Mode::PromptPackageName) {
        let area = centered_rect(60, 25, f.size());
        let overlay = Block::default()
            .title(" Create package ")
            .borders(Borders::ALL)
            .style(Style::default().bg(Color::Black).fg(Color::White));

        let content = format!(
            "Package name:\n\n> {}\n\n[Enter] confirm   [Esc] cancel",
            app.input
        );

        let p = Paragraph::new(content)
            .block(overlay)
            .wrap(Wrap { trim: false });

        f.render_widget(p, area);
    }
}

// helper
fn centered_rect(
    percent_x: u16,
    percent_y: u16,
    r: ratatui::layout::Rect,
) -> ratatui::layout::Rect {
    let popup_layout = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage((100 - percent_y) / 2),
            Constraint::Percentage(percent_y),
            Constraint::Percentage((100 - percent_y) / 2),
        ])
        .split(r);

    Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Percentage((100 - percent_x) / 2),
            Constraint::Percentage(percent_x),
            Constraint::Percentage((100 - percent_x) / 2),
        ])
        .split(popup_layout[1])[1]
}
