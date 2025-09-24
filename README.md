# Omkar Kumar Sharma - Portfolio

Modern glass (glassmorphism) styled civil engineering portfolio built with Bootstrap 5.3, custom animations, and responsive design.

## Features
- Liquid / glass UI with animated color blobs
- Dark / Light theme toggle (persists in localStorage)
- Smooth reveal-on-scroll animations (IntersectionObserver)
- Hero section combining construction context + personal photo
- Sections: About, Skills, Project Highlight, Experience (timeline), Education, Contact
- Accessible, semantic HTML5 structure
- Progressive enhancement (works without JS for core content)

## Structure
index.html - Main page
style.css  - Glassmorphism design system and responsive styles
script.js  - Interactivity (theme, nav state, reveals, form validation)
img/       - Images (construction.jpg, myphoto.jpeg)

## Running Locally
Simply open `index.html` in a modern browser. No build step required.

### Optional: Simple local server (PowerShell)
```
python -m http.server 8000
```
Then visit http://localhost:8000

## Customization Tips
- Update personal data inside the About, Education, and Contact sections.
- Replace placeholder project PDF link or integrate real downloadable asset.
- To add more projects, duplicate the project card structure in the Projects section.
- Adjust colors by editing CSS variables in `:root` and `[data-theme='light']` blocks.

## Deploy
Upload all files to your hosting (Netlify, GitHub Pages, Vercel static, or cPanel). Ensure the `img` folder stays at same relative path.

## Next Improvements (Ideas)
- Add real backend for contact form (Formspree, Netlify Forms, or custom API)
- Add multiple project cards with modal detail views
- Integrate a resume PDF link
- Lazy-load images and add proper `<source>` for responsive sizes
- Add service worker for offline caching

## License
You own the content. Code base can be reused or extended freely.
