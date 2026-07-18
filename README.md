<div align="center">

# 🧭 TravelVista USA

### *Real trip reports. Honest guides. Written by travelers, for travelers.*

[![Live Site](https://img.shields.io/badge/live-travel--vista--usa.vercel.app-C33A2C?style=for-the-badge&logo=vercel&logoColor=white)](https://travel-vista-usa.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-zohaib--mzg%2FTravelVista-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zohaib-mzg/TravelVista)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Formspree](https://img.shields.io/badge/Forms-Formspree-8A1F1F?style=for-the-badge)

**[🌐 View Live Demo →](https://travel-vista-usa.vercel.app/)**

</div>

---

## ✨ Overview

**TravelVista USA** is a fully static, hand-crafted travel publication website — a fictional editorial brand covering road trips, national parks, city guides, and coastal escapes across America. Built with plain HTML5, CSS3 and vanilla JavaScript, it ships with **zero build step and zero dependencies**, making it effortless to host, fork, or extend.

The design leans into a warm, editorial "print-meets-web" aesthetic — deep maroon and terracotta tones, serif display type paired with a clean sans body font, and a component system consistent across every page.

---

## 🖼️ Preview

| Home | Blog | Article |
|:---:|:---:|:---:|
| Hero search, stats, featured stories | Filterable journal with live search | Full editorial layout with author box |

> 💡 Visit the [live deployment](https://travel-vista-usa.vercel.app/) for the full interactive experience.

---

## 🚀 Features

- **🎨 Fully responsive design** — breakpoints for desktop, tablet, and mobile with a dedicated slide-in mobile nav
- **🌗 Dark mode toggle** — instant theme switch via CSS custom properties, no page reload
- **📰 9 complete long-form articles** — real editorial content across Road Trips, National Parks, City Guides, Coastal Escapes, Adventure, and Budget Travel
- **🔎 Live blog search & category filtering** — client-side filtering with an empty-state fallback
- **📬 Working contact & guest-post forms** — powered by [Formspree](https://formspree.io), submitted via `fetch()` with no page reload
- **❓ Accordion FAQ** on the Contact page
- **🔖 Bookmark / save article** toggle on blog posts
- **🗺️ Full sitemap** page for quick navigation
- **⚖️ Terms of Use & Privacy Policy** pages included
- **🧩 Reusable component system** — cards, badges, pill buttons, chips, and hero panels shared across every page via a single `style.css`

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 (custom properties, CSS Grid & Flexbox — no framework) |
| Interactivity | Vanilla JavaScript (ES6+, no libraries) |
| Fonts | [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) + [Inter](https://fonts.google.com/specimen/Inter) (body) via Google Fonts |
| Forms | [Formspree](https://formspree.io) |
| Hosting | [Vercel](https://vercel.com) |

No npm, no bundler, no framework — just open `index.html` and it works.

---

## 📁 Project Structure

```
TravelVista/
├── index.html                          # Homepage
├── destinations.html                   # Destination directory + filters
├── categories.html                     # Browse by category
├── blog.html                           # Journal with search & filters
├── about.html                          # Team & brand story
├── contact.html                        # Contact form + FAQ
├── write-for-us.html                   # Guest contributor pitch form
├── sitemap.html                        # Full site index
├── terms.html                          # Terms of Use
├── privacy.html                        # Privacy Policy
│
├── pacific-coast-road-trip.html        ┐
├── national-parks-you-must-visit.html  │
├── weekend-getaways-usa.html           │
├── travel-packing-list.html            │  9 full-length
├── nyc-48-hours.html                   │  article pages
├── gulf-coast-sunsets.html             │
├── backcountry-basics.html             │
├── death-valley-24-hours.html          │
├── budget-southwest-road-trip.html     ┘
│
├── style.css                           # Single global stylesheet
├── script.js                           # Shared site interactivity
└── travelvista-logo.png                # Brand logo asset
```

---

## 🏁 Getting Started

### Run it locally

No build tools required — this is a static site.

```bash
git clone https://github.com/zohaib-mzg/TravelVista.git
cd TravelVista
```

Then either:

- **Open directly** — double-click `index.html`, or
- **Serve locally** (recommended, so relative paths & forms behave exactly like production):

```bash
# Python
python3 -m http.server 5500

# or Node
npx serve .
```

Visit `http://localhost:5500`.

---

## ☁️ Deployment

This project is deployed on **Vercel** as a static site:

🔗 **[https://travel-vista-usa.vercel.app/](https://travel-vista-usa.vercel.app/)**

To deploy your own copy:

1. Push this repo to GitHub
2. Import it into [Vercel](https://vercel.com/new)
3. Framework preset: **Other** (no build command needed)
4. Deploy 🎉

Any static host (Netlify, GitHub Pages, Cloudflare Pages) works identically since there's no build step.

---

## 📬 Forms & Formspree Setup

The **Contact** and **Write For Us** forms submit to Formspree via `fetch()`:

```js
fetch(form.action, {
  method: 'POST',
  body: new FormData(form),
  headers: { Accept: 'application/json' }
});
```

To point the forms at your own Formspree account:

1. Create a form at [formspree.io](https://formspree.io)
2. Copy your endpoint (`https://formspree.io/f/xxxxxxxx`)
3. Replace the `action` attribute on both `<form>` elements in `contact.html` and `write-for-us.html`

---

## 🎨 Customization

| What | Where |
|---|---|
| **Logo** | Swap the `<img>` src in the `.brand-mark` span (header + footer, every page) |
| **Colors / theme** | CSS custom properties at the top of `style.css` (`:root { ... }`) |
| **Fonts** | Google Fonts `<link>` in each page `<head>` |
| **Copy / articles** | Edit the relevant `.html` file directly — no CMS or templating layer |

---

## 📄 License

This project is provided as-is for personal or commercial use. Attribution appreciated but not required.

---

<div align="center">

Made with ☕ and a slightly unhealthy love of road trips.

**[travel-vista-usa.vercel.app](https://travel-vista-usa.vercel.app/)**

</div>
