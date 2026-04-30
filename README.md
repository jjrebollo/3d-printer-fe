# 3D Printing Portfolio — Frontend

Angular single-page application for a 3D printing portfolio site. Features a dark-themed landing page, owner profile, and a project gallery with detail modals.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17 |
| Language | TypeScript |
| Styling | SCSS + CSS custom properties |
| HTTP | Angular HttpClient |
| Routing | Angular Router |

## Features

- **Landing page** — hero section and feature highlights
- **Owner page** — profile picture, name, city, and Instagram link
- **Projects page** — card grid with click-to-open detail modal
- Dark theme with CSS custom properties
- Mobile responsive — hamburger drawer menu, fluid grid, centered modals
- SOLID architecture: smart/dumb component separation, core services layer
- Environment-based API URL (dev vs production)
- Unit tests with Jasmine/Karma — 100% coverage, 85% minimum threshold enforced
- CI/CD pipeline via GitHub Actions — tests gate every deployment, email report on every push

## Project Structure

```
fe/src/app/
├── core/
│   ├── models/         # Owner and Project TypeScript interfaces
│   └── services/       # OwnerService, ProjectService (HTTP only)
├── shared/
│   └── components/
│       ├── navbar/           # Top navigation bar
│       └── loading-spinner/  # Reusable spinner
├── features/
│   ├── landing/              # Landing page component
│   ├── owner/                # Owner page (smart) + OwnerProfileComponent (dumb)
│   └── projects/             # Projects page (smart) + ProjectCardComponent + ProjectDetailModalComponent
└── random-word/              # Random word demo component
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install

```bash
npm install
```

### Configure the API URL

Edit `src/environments/environment.ts` and set your backend address:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
};
```

### Run (development)

```bash
npm start
```

The app will be available at `http://localhost:4200`.

To make it accessible from other devices on the local network:

```bash
npm start -- --host 0.0.0.0
```

### Build (production)

Before building, set the deployed backend URL in `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.yourdomain.com',
};
```

Then build:

```bash
npm run build
```

The output is in `dist/`. Serve the contents of that folder with any static hosting provider (Vercel, Netlify, etc.).

## Testing

Unit tests use **Jasmine + Karma** and are co-located with each source file (`*.spec.ts`).

```bash
# Run once (headless)
npm test -- --watch=false --browsers=ChromeHeadless

# Watch mode during development
npm test
```

Coverage is collected automatically on every run. A **minimum of 85%** across all metrics
(statements, branches, functions, lines) is enforced — the run fails if any metric drops below.

### Build + test together (CI mode)

```bash
npm run build:ci
```

This runs the full test suite first and only proceeds to `ng build` if all tests pass and
coverage thresholds are met. This is the command used by the CI/CD pipeline.

## CI/CD Pipeline

Deployments are managed by **GitHub Actions** (`.github/workflows/deploy.yml`).

### Flow on every push to `main`

```
push to main
  └─ run unit tests + collect coverage
       ├─ FAIL → deployment skipped
       └─ PASS → deploy to Vercel (production)
            └─ always → send email report
```

### Email report

An email is sent to the address in the `NOTIFY_EMAIL` secret after every push. It contains:

- Whether tests **passed** or **failed**
- If failed: whether the cause is a **coverage threshold violation** (with the specific metrics)
  or a **spec failure** (with the failing test names and error messages)
- Whether the deployment **succeeded**, **failed**, or was **skipped**

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Found in `.vercel/project.json` after running `npx vercel link` |
| `VERCEL_PROJECT_ID` | Found in `.vercel/project.json` after running `npx vercel link` |
| `NOTIFY_EMAIL` | Recipient address for deployment reports |
| `MAIL_USERNAME` | Gmail address used to send the report |
| `MAIL_PASSWORD` | Gmail App Password (16-char, generated in Google Account → Security → App passwords) |

## Routing

| Path | Component |
|---|---|
| `/` | Landing page |
| `/owner` | Owner profile |
| `/projects` | Projects gallery |
| `**` | Redirects to `/` |

## Deployment (Vercel)

Deployments are triggered automatically by GitHub Actions on every push to `main` (see CI/CD Pipeline above). Manual deploys are also possible:

1. Push this folder to a GitHub repository.
2. Run `npx vercel link` inside this folder to connect it to your Vercel project.
3. Add the required secrets to the GitHub repository (see CI/CD Pipeline → Required GitHub Secrets).
4. Push to `main` — the pipeline handles testing and deploying.

> The `vercel.json` file configures the build command (`ng build`) and SPA routing rewrites.

## Custom Domain

| Record | Target |
|---|---|
| `yourdomain.com` | Vercel (A / CNAME provided in Vercel dashboard) |
| `api.yourdomain.com` | Railway (CNAME provided in Railway dashboard) |

After DNS propagates, SSL certificates are provisioned automatically by both platforms.

## License

[MIT](LICENSE)
