# Junior Fixture Website Starter

This folder contains a simple static website starter for turning the St. George's junior fixture into an editable web page.

## Why this approach

- No build tools are required.
- Most yearly edits happen in one file: [site-content.js](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/site-content.js)
- Photos can be replaced without changing layout code.
- The structure is good for phones, tablets, and desktops.

## Files

- [index.html](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/index.html): page structure
- [styles.css](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/styles.css): design and responsive layout
- [app.js](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/app.js): renders the content
- [site-content.js](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/site-content.js): main content you update each year
- [tmp-preview/Junior Fixture 2025 version 2.pdf.png](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/tmp-preview/Junior Fixture 2025 version 2.pdf.png): temporary cover image pulled from the 2025 PDF

## Recommended editing workflow for 2026

1. Open [site-content.js](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/site-content.js).
2. Change `seasonYear`, `hero`, and the top summary text.
3. Replace the placeholder section titles with the exact headers from the 2025 booklet.
4. Paste in each section's updated 2026 text.
5. Replace the hero image path with a new photo when ready.

## How to preview locally

You can open [index.html](/Users/arnepeterson/Dropbox/Projects/Junior Fixture 2025/index.html) in a browser directly, or we can add a tiny local web server if you want a cleaner preview workflow.

## Good next step

Once you confirm this direction, the next improvement should be a full content migration:

- copy the exact section headers from the PDF
- move the real text into the content file
- add real photo placements
- optionally split longer sections into separate pages
