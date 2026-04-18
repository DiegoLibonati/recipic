# Recipic

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

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

1. Typescript
2. TailwindCSS
3. HTML5
4. CSS3
5. Vite

## Libraries used

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
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.5"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/recipic`](https://www.diegolibonati.com.ar/#/project/recipic)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
