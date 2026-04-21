# Anime Catalog — SEA Stage 2 Project

## Project Overview
A polished anime catalog website for the Snap Engineering Academy 2026 Stage 2 assessment.
**Due: April 21, 2026 at 11:59 PM PST. No extensions.**

## Files
- `index.html` — page structure, hidden card template, controls bar, footer
- `style.css` — dark gradient header, white cards, sticky controls, responsive grid
- `scripts.js` — 178 anime entries + all JavaScript logic

## Data
- **Source:** MyAnimeList (myanimelist.net) via Jikan public REST API (jikan.moe)
- **Images:** cdn.myanimelist.net CDN URLs (format: `https://cdn.myanimelist.net/images/anime/[folder]/[id].jpg`)
- **178 entries** — real scores, studios, genres, episode counts, synopses

## JavaScript Features (3 data operations)
1. **Live Search** — `searchAnime(query)` → `Array.filter()` + `String.toLowerCase().includes()`
2. **Genre Filter** — `filterByGenre(genre)` → `Array.filter()` + `Array.includes()`
3. **Sort** — `sortAnime(data)` → non-mutating `[...data].sort()` with score/year/episodes/title comparators

All three chain together in `applyFilters()` — search → genre → sort → render.

## Key Functions
- `populateGenreFilter()` — builds genre `<select>` using `new Set()` over all entries
- `showCards(data)` — clears container, clones hidden `.card` template for each entry
- `editCardContent(card, anime)` — fills all card fields; applies `.score-gold/green/blue`
- `applyFilters()` — central controller, called by every filter/sort control

## Score Badge Colors
- Gold (`score-gold`): score ≥ 9.0
- Green (`score-green`): score ≥ 8.7
- Blue (`score-blue`): score below 8.7

## CSS Design
- Background: `#f2f4f7`
- Header: `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)`
- Cards: white, `border-radius: 14px`, hover lift `translateY(-5px)`
- Grid: `repeat(auto-fill, minmax(260px, 1fr))`, gap 24px
- Controls: sticky top, `z-index: 100`
- Font: Inter (Google Fonts)

## Local Dev Server
```
python3 -m http.server 5500
```
Or use the `.claude/launch.json` config via Claude Code's preview.

## Submission Checklist
- [ ] Push to GitHub repo
- [ ] Enable GitHub Pages → get live URL
- [ ] Record 3-minute Loom (screen + camera, 3 questions × ~60 sec each)
- [ ] Submit Google Form: Loom link, live URL, GitHub repo link, data source description

## Data Sources (cite in form)
- MyAnimeList — myanimelist.net
- Jikan REST API — jikan.moe
