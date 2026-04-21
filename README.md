# Anime Catalog

A web app that lets you browse, search, and filter 178 anime titles pulled from MyAnimeList. Built as part of the Snap Engineering Academy 2026 Stage 2 assessment.

## What It Does

- **Search** — Type any title and results filter in real time
- **Genre Filter** — Click a genre to narrow down the list
- **Sort** — Sort by rating, year, episode count, or title
- **178 Real Titles** — All data pulled from MyAnimeList via the Jikan API

## File Structure

```
.
├── index.html      # Main page layout and card template
├── style.css       # All the styling
├── scripts.js      # Anime data + search/filter/sort logic
└── README.md       # You're here
```

## How to Run It Locally

```bash
# Start a local server
python3 -m http.server 5500
```

Then open `http://localhost:5500` in your browser. That's it.

## How the Filtering Works

All three filters (search, genre, sort) run through a single `applyFilters()` function so they all work together at the same time.

1. **Search** — `Array.filter()` with `.toLowerCase()` for case-insensitive matching
2. **Genre Filter** — `Array.filter()` + `Array.includes()` to check genre arrays
3. **Sort** — `Array.sort()` with custom comparators depending on what's selected

## Data

Everything comes from the [Jikan REST API](https://jikan.moe/), which is a free wrapper around MyAnimeList. Cover images are served from the MyAnimeList CDN.

## Score Badge Colors

| Color | Score Range |
|-------|-------------|
| Gold | ≥ 9.0 |
| Green | ≥ 8.7 |
| Blue | < 8.7 |

## Tech Stack

Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no dependencies.

## Browser Support

Works in Chrome, Firefox, Safari, and Edge.
