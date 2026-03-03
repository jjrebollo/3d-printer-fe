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
- SOLID architecture: smart/dumb component separation, core services layer
- Environment-based API URL (dev vs production)

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

## Routing

| Path | Component |
|---|---|
| `/` | Landing page |
| `/owner` | Owner profile |
| `/projects` | Projects gallery |
| `**` | Redirects to `/` |

## Deployment (Vercel)

1. Push this folder to a GitHub repository.
2. Import the project in [Vercel](https://vercel.com).
3. Set the **Build Command** to `npm run build` and the **Output Directory** to `dist/fe/browser`.
4. Update `src/environments/environment.prod.ts` with your Railway backend URL before the first deploy.
5. To use a custom domain, add it in Vercel → Project → Settings → Domains and point your DNS accordingly.

## Custom Domain

| Record | Target |
|---|---|
| `yourdomain.com` | Vercel (A / CNAME provided in Vercel dashboard) |
| `api.yourdomain.com` | Railway (CNAME provided in Railway dashboard) |

After DNS propagates, SSL certificates are provisioned automatically by both platforms.

## License

[MIT](LICENSE)
