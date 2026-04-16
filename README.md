# krown-properties
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a single-file static website for Krown Properties, a residential property developer and investment company based in Auckland, New Zealand. The entire site lives in one file: `krown properties website v2.html`.

There is no build system, package manager, or dev server. Open the file directly in a browser to preview changes.

## Architecture

The site is a single-page application implemented entirely within one HTML file (~3,500 lines), with all CSS, JavaScript, and HTML co-located. It simulates multi-page navigation by toggling a `page-active` CSS class on `div` containers — each "page" is hidden by default and shown by adding `.page-active`.

### Pages (HTML `div` IDs)

| ID | Shown by |
|---|---|
| `#home-page` | `showHome()` |
| `#current-projects-page` | `showCurrentProjects()` |
| `#about-us-page` | `showAboutUs()` |
| `#pm-page` | `showPropertyManagement()` |
| `#project-detail-page` | `showProjectDetail(projectId)` |
| `#reliance-page` | `showReliance()` |
| `#process-page` | `showProcess()` |

### Data

All project data lives in a `PROJECTS` object (starting around line 3174) in the `<script>` block. Project cards on the Current Projects page are rendered dynamically from this object into `#cpProjectsList`.

### Design System

CSS custom properties are defined on `:root`:
- `--main` / `--main-light` — black backgrounds
- `--accent` — gold (`#c8a96e`)
- `--white` — pure white
- `--ease` — shared cubic-bezier easing

Typography: **Cormorant Garamond** (headings) and **Montserrat** (body), loaded via Google Fonts CDN.

### Scroll Animations

Elements with `.reveal` (and variants `.au-reveal`, `.pm-reveal`) animate in via `IntersectionObserver`. Delay classes `.d1`–`.d4` stagger the transitions.

### External Dependencies (CDN only)

- Google Fonts
- Swiper.js v11 (`swiper-bundle.min.css` + `swiper-bundle.min.js`) — used for image carousels in project detail pages

## Adding a New Project

Add an entry to the `PROJECTS` object in the `<script>` block. The `showProjectDetail(projectId)` function reads from this object to populate the detail page. The Current Projects listing auto-renders from the same data.
