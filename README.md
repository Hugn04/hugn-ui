Hugn UI — Next.js frontend

Overview

This repository contains the `hugn-ui` Next.js frontend for the Hugn project. It provides web and admin interfaces built with Next.js, React and Tailwind/Sass, and includes reusable UI components used across the app.

Quick start

1. Install dependencies:

```bash
cd hugn-ui
npm install
```

2. Run in development:

```bash
npm run dev
```

The app is available at http://localhost:3000 by default.

Build and production

```bash
npm run build
npm run start
```

Scripts

- `dev` — start Next.js in development
- `build` — compile the app for production
- `start` — run the compiled production server
- `lint` — run ESLint

Environment

This project includes `.env`, `.env.development`, and `.env.production` files. Update them with API endpoints, keys, or feature flags required by the app.

Folder structure (important parts)

- `src/app` — Next.js routes, pages and layout
- `src/components` — UI components (cards, headers, editor, admin widgets)
- `src/styles` — Sass and global styles
- `src/contexts` — React context providers (e.g. auth)
- `src/utils` / `src/lib` — helper utilities and mock data

Notes

- The project targets Next.js 15 and React 19 (see `package.json`).
- If the frontend consumes the `hugn-be` API, make sure `hugn-be` is running and `hugn-ui` `.env` variables point to the backend endpoints.

Contributing

1. Fork or branch the repo.
2. Run `npm run dev` and implement changes.
3. Open a pull request with a concise description of the change.

License

See `package.json` for license metadata.
