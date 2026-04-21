# Anime Catalog

A polished anime catalog website showcasing 178 real anime titles from MyAnimeList, built for the Snap Engineering Academy 2026 Stage 2 assessment.

## Features

- **Live Search** — Filter anime by title as you type
- **Genre Filter** — Browse anime by category (Action, Drama, Fantasy, etc.)
- **Sort** — Order by highest rated, newest, most episodes, or alphabetically
- **Real Data** — All anime information sourced from MyAnimeList via Jikan API
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

## Project Structure

```
.
├── index.html      # Page structure and hidden card template
├── style.css       # Styling, dark header, card grid, responsive layout
├── scripts.js      # 178 anime entries + search/filter/sort logic
└── README.md       # This file
```

## Data Sources

- **MyAnimeList** (myanimelist.net) — Anime scores, studios, genres, episode counts, synopses
- **Jikan REST API** (jikan.moe) — Free public API for MyAnimeList data
- **Cover Images** — cdn.myanimelist.net CDN

All 178 entries are real, verified data from MyAnimeList.

## How It Works

### JavaScript Features (3 Data Operations)

1. **Search** — Uses `Array.filter()` with case-insensitive title matching
2. **Genre Filter** — Uses `Array.filter()` with `Array.includes()` to match genres
3. **Sort** — Uses `Array.sort()` with comparators for score, year, episodes, or title

All three filters chain together through the `applyFilters()` function, allowing simultaneous filtering and sorting.

### Card Design

- Cover art image (2:3 aspect ratio)
- Score badge (color-coded: gold ≥9.0, green ≥8.7, blue below)
- Title, genres, studio, year, episode count
- Truncated synopsis
- Hover effect with lift animation

## Local Development

```bash
# Start a local server
python3 -m http.server 5500

# Open in browser
# http://localhost:5500
```

Or use the `.claude/launch.json` configuration with Claude Code preview.

## Responsive Grid

Built with CSS Grid (`repeat(auto-fill, minmax(260px, 1fr))`), automatically reflows for all screen sizes.

## Score Badge Colors

- **Gold** (`#f5c518`) — Score ≥ 9.0
- **Green** (`#4ade80`) — Score ≥ 8.7
- **Blue** (`#60a5fa`) — Score < 8.7

## Technical Stack

- **HTML5** — Semantic markup
- **CSS3** — Flexbox, CSS Grid, responsive design
- **Vanilla JavaScript** — No frameworks or libraries
- **Real Data** — Jikan API, MyAnimeList

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
