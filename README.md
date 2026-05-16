# Recipic

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Recipic** is a meal discovery app that presents recipes in a visual, story-like interface inspired by Instagram Stories. Instead of scrolling through long lists, you browse one meal at a time — each one displayed as a full image card that takes center stage.

The app connects to [TheMealDB](https://www.themealdb.com), a free public API that provides detailed meal data including name, category, origin, thumbnail image, ingredients, and step-by-step cooking instructions.

Every time you open the app, a random meal is loaded automatically. From there you have full control over what happens next:

- **Random discovery:** Hit the shuffle button to load a completely new random meal. Each click fetches a fresh suggestion from the API so you can keep browsing until something catches your eye.
- **Search by name:** Use the search bar at the top to look up a specific meal by name. If a match is found in the database, it gets added directly to your favorites list.
- **Favorites (your story bar):** When you find a meal you like, click the heart button to save it. Saved meals appear at the top of the screen as circular thumbnails — exactly like Instagram Stories. The bar scrolls horizontally so you can save as many meals as you want.
- **Meal detail view:** Click any thumbnail in your favorites bar to open that meal's full instruction card. The view replaces the current image with a scrollable panel showing the complete recipe: the meal name, its photo, and the full cooking instructions. A close button lets you dismiss it and return to the current meal view.
- **Remove from favorites:** When viewing a saved meal's instructions, the delete button becomes active. Clicking it removes the meal from your favorites bar instantly.

Your favorites are saved to `localStorage`, so they persist across page refreshes. Every time the app loads, it restores your saved meals automatically.

The UI reacts to state changes in real time: adding or removing a meal updates the favorites bar immediately, the like and delete buttons enable or disable themselves depending on whether the current meal is already saved, and alerts appear briefly to confirm every action (added to favorites, removed, new meal loaded, errors).

## Technologies used

To deliver this experience, the project is built on a vanilla TypeScript stack — no framework — bundled with Vite and styled with TailwindCSS.

1. Typescript
2. TailwindCSS
3. HTML5
4. CSS3
5. Vite

## Libraries used

On top of the core stack, the following libraries support HTTP communication, testing, and tooling:

#### Dependencies

```
"axios": "^1.6.7"
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"msw": "^2.10.4"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"undici": "^7.25.0"
"vite": "^7.1.5"
```

## Getting Started

With the stack defined, follow these steps to run the project locally:

1. Clone the repository
2. Navigate to the project folder
3. Copy `.env.example` to `.env` and set `VITE_API_URL=https://www.themealdb.com`
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app runs locally, you can verify behavior with the test suite.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security Audit

Beyond functional tests, dependencies should be scanned regularly for known vulnerabilities.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│      build       │
│ eslint · tsc --noEmit│  │   jest (jsdom)   │  │     vite build   │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

The jobs run sequentially: `testing` depends on `lint-and-audit`, and `build` depends on `testing`. A failure in any earlier job stops the pipeline.

### Validation jobs (run on every PR and push to `main`)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint) and `npm run type-check` (`tsc --noEmit`) to catch style and type errors before anything else executes.
2. **`testing`** — runs `npm run test`, executing the Jest suite under `jest-environment-jsdom` with the MSW-based service mocks. Required to pass before the build job is allowed to start.
3. **`build`** — runs `npm run build`, which performs a TypeScript check (`tsc -b`) and produces the production Vite bundle. Acts as a smoke test that the project builds end-to-end on a clean Ubuntu runner.

All three jobs use `ubuntu-latest`, pin the Node.js version through the repository's [`.nvmrc`](.nvmrc) file (via `actions/setup-node`), and cache the npm download folder to speed up subsequent runs.

### Where the build outputs live

| Output                                    | Location                                     |
| ----------------------------------------- | -------------------------------------------- |
| Validation logs (lint, type-check, tests) | **Actions** tab on GitHub                    |
| Production bundle (`dist/`)               | Ephemeral, inside the runner — not published |

The pipeline does not currently produce release artifacts; the `build` job is a smoke check only.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/recipic`](https://www.diegolibonati.com.ar/#/project/recipic)
