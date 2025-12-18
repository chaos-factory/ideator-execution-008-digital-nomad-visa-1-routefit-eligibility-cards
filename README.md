# RouteFit - Eligibility Snapshot Cards

[![Pages Deploy](https://github.com/chaos-factory/ideator-execution-008-digital-nomad-visa-1-routefit-eligibility-cards/actions/workflows/pages.yml/badge.svg)](https://github.com/chaos-factory/ideator-execution-008-digital-nomad-visa-1-routefit-eligibility-cards/actions/workflows/pages.yml)

**🌐 Live Site:** [https://chaos-factory.github.io/ideator-execution-008-digital-nomad-visa-1-routefit-eligibility-cards/](https://chaos-factory.github.io/ideator-execution-008-digital-nomad-visa-1-routefit-eligibility-cards/)

Fast eligibility snapshots for 20+ digital nomad and telework programs worldwide. Filter by nationality, work type, income, and dependents. Cards display Pass/Likely/Check nuance/Not eligible status with detailed modals and PDF/CSV export.

## Features

- 🎯 Fast eligibility checks for digital nomad visa programs
- 🌍 20+ programs covering Europe, Americas, Asia, and more
- 💱 Real-time currency conversion using ECB rates
- 🔍 Advanced filtering by nationality, work type, income, region, duration
- 📊 Export shortlist to PDF or CSV
- ♿ Accessible with keyboard navigation and ARIA labels
- 📱 Responsive design (mobile, tablet, desktop)

## Tech Stack

- **Framework:** Vite + React 19 + TypeScript
- **Routing:** React Router (HashRouter for GitHub Pages)
- **Styling:** Tailwind CSS 4
- **State:** React hooks + URL query params
- **Currency API:** Frankfurter (ECB rates)
- **Deployment:** GitHub Pages

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
src/
├── app/
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── types.ts       # TypeScript types
│   └── router.tsx     # Route configuration
├── main.tsx           # Entry point
└── index.css          # Global styles

data/
├── routefit/
│   └── programs.json  # Program data
└── common/
    ├── countries.json # Country reference
    └── glossary.json  # Term definitions
```

## Data Sources

All program information is sourced from official government websites and immigration authorities. Each program entry includes:
- Last verification date (`as_of`)
- Confidence level (`official_law`, `official_guidance`, `post_practice`)
- Direct link to official source

## GitHub Pages Deployment

The site automatically deploys to GitHub Pages on push to `main`. The workflow also runs on pull requests for preview builds.

**Note:** This project uses HashRouter to ensure compatibility with GitHub Pages routing without custom server configuration.

## License

Open source project for educational and informational purposes.

## Disclaimer

RouteFit provides eligibility information based on publicly available sources. This is not legal advice. Requirements change frequently. Always verify with official sources before making travel or relocation decisions.
