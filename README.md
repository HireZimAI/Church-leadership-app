# Church Leadership Platform (Shepherd OS)

Recovered React frontend from the Manus export. The missing package manifest and build configuration have been reconstructed from the source imports; they are not the original Manus configuration.

## Run locally

Use Node.js 22.12 or later. From the repository root:

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run check
npm run build
npm run preview
```

The production files are written to `dist`. For Cloudflare Pages, use `npm run build` as the build command and `dist` as the output directory, with the repository root as the project directory. The included `_redirects` file serves the app on nested routes.

## Current scope

This export is a frontend prototype. The pages contain sample data and browser-local interactions; no database, server, or working authentication backend was supplied. Building the app does not make it a production church management system. The existing unused Manus OAuth and map helpers require their original services and configuration if incorporated into future functionality.

The unconfigured Manus analytics script was removed from the entry HTML. No environment variables are required for the current routed frontend.
