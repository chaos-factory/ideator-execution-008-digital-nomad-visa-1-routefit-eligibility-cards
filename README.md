# RouteFit - Eligibility Snapshot Cards

[![GitHub Pages](https://github.com/chaos-factory/ideator-exec-008-routefit-eligibility-cards/actions/workflows/pages.yml/badge.svg)](https://github.com/chaos-factory/ideator-exec-008-routefit-eligibility-cards/actions/workflows/pages.yml)

**Live Site:** https://chaos-factory.github.io/ideator-exec-008-routefit-eligibility-cards/

Fast eligibility snapshots for 20+ digital nomad and remote work visa programs. Filter by nationality, work type, income, and dependents to find programs that match your profile.

## Features

- 🌍 20+ programs across 10+ countries
- 🔍 Smart filtering by nationality, work type, income, and dependents
- ✅ Real-time eligibility calculation with Pass/Likely/Check nuance/Not eligible status badges
- 💱 Live ECB currency conversion (24h cached)
- 📊 Export to CSV (PDF coming soon)
- 🔒 Privacy-first: all data stored locally in your browser
- ♿ Accessible with keyboard navigation and ARIA labels
- 📱 Responsive design (3/2/1 column grid)

## Tech Stack

- **Framework:** Vite + React + TypeScript
- **Routing:** React Router (HashRouter for GitHub Pages compatibility)
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages with automated CI/CD
- **Data:** Static JSON files with JSON Schema validation

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── pages/          # Home, About, Sources, Privacy, Imprint
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions (eligibility, currency, format, analytics)
│   │   ├── router.tsx      # HashRouter configuration
│   │   └── types.ts        # TypeScript type definitions
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles + Tailwind imports
├── data/
│   ├── routefit/
│   │   └── programs.json   # Program data (20+ programs)
│   └── common/
│       ├── countries.json  # Country list with regions
│       └── glossary.json   # Tooltips and explanations
├── public/                 # Static assets
├── .github/workflows/
│   └── pages.yml           # GitHub Pages deployment workflow
├── programs.schema.json    # JSON Schema for program validation
├── vite.config.ts          # Vite configuration (base path set for GitHub Pages)
└── tailwind.config.js      # Tailwind CSS configuration
```

## GitHub Pages Deployment

The site is automatically deployed to GitHub Pages on every push to `main`. The workflow:

1. Builds the Vite project (`npm run build`)
2. Uploads the `dist` folder as a Pages artifact
3. Deploys to https://chaos-factory.github.io/ideator-exec-008-routefit-eligibility-cards/

Pull requests also trigger builds (but do not deploy) to validate changes.

## Notes

- **HashRouter:** We use HashRouter instead of BrowserRouter to ensure all routes work on GitHub Pages without server-side configuration.
- **Base Path:** The Vite config sets `base: '/ideator-exec-008-routefit-eligibility-cards/'` for GitHub Pages Project Pages.
- **Currency Conversion:** Live ECB rates via Frankfurter API with 24-hour localStorage cache.
- **Free Tier:** First 5 programs unlocked; upgrade modal for remaining programs (payment stub).

## Data Sources

All program data is sourced from official government websites. See the [Sources page](https://chaos-factory.github.io/ideator-exec-008-routefit-eligibility-cards/#/sources) for complete list with verification dates.

## License

MIT