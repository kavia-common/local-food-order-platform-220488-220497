# Food Delivery Frontend (LightningJS)

This is the Lightning 3 (Blits) frontend for the Food Delivery app. It follows the Ocean Professional theme and provides a basic food ordering flow:
- Home: List of restaurants
- Restaurant Detail: Menu and add-to-cart
- Cart: Slide-in cart/checkout
- Order Tracking: Modal with status polling

Important: This UI is built with LightningJS (WebGL), not React/DOM. Do not use HTML/CSS/DOM APIs.

## Getting Started

- Install dependencies:
  npm install

- Run dev server:
  npm run dev

- Build:
  npm run build

- Preview:
  npm run preview

The app launches to the Home screen at `/`.

## Environment Variables

The app reads Vite environment variables at build time via `import.meta.env`. The config helper resolves these:

- VITE_API_BASE (preferred; base URL for backend API)
- VITE_BACKEND_URL (fallback when VITE_API_BASE is not set)
- VITE_FRONTEND_URL
- VITE_WS_URL
- VITE_NODE_ENV
- VITE_NEXT_TELEMETRY_DISABLED
- VITE_ENABLE_SOURCE_MAPS
- VITE_PORT
- VITE_TRUST_PROXY
- VITE_LOG_LEVEL
- VITE_HEALTHCHECK_PATH
- VITE_FEATURE_FLAGS
- VITE_EXPERIMENTS_ENABLED

When neither `VITE_API_BASE` nor `VITE_BACKEND_URL` is provided, the app uses mock data in the API client (`src/api/client.js`). This keeps the code API-ready while still showing the UI.

## Project Structure

- src/app.js: Application root (routes, theme, shell)
- src/App.js: Launch wrapper for Lightning app
- src/index.js: Entry that launches the app
- src/config.js: Reads environment variables and exposes configuration
- src/api/client.js: API client with mock fallback
- src/theme.js: Theme constants for Ocean Professional
- src/store/storePlugin.js: Simple global store (cart and UI state)
- src/components/*: Shared UI components (Header, UIButton, Card, Loader, Toast)
- src/pages/*: Pages (Home, RestaurantDetail, Cart, OrderTracking)

## Routing

Routes are defined on the Application in `src/app.js`:
- `/` -> Home
- `/restaurant/:id` -> RestaurantDetail
- `/tracking/:orderId` -> OrderTracking (also used as modal via store flag)

Use `this.$router.to('/path')` and `this.$router.back()` to navigate.

## Theming

Ocean Professional colors:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Use rounded corners and subtle shadows where appropriate (Lightning uses color/alpha; no CSS).

## Notes

- All images used by Lightning need width and height attributes. Ensure referenced images reside in the `public/assets/` directory and are addressed as `assets/...`.
- Input handling: define in `Blits.Launch` (see `src/App.js`). Do not attach DOM listeners.

## Required Assets

If you want to show images, add them to `public/assets/`:
- restaurant1.jpg, restaurant2.jpg, restaurant3.jpg
- menu_salmon.jpg, menu_tuna.jpg, menu_miso.jpg
- menu_burger.jpg, menu_steak.jpg, menu_fries.jpg
- menu_bowl.jpg, menu_kale.jpg, menu_avocado.jpg

These filenames are referenced by the mock data.

## Public Interfaces

- config (src/config.js): exposes resolved environment values
- api (src/api/client.js): getRestaurants, getRestaurantDetails, createOrder, getOrderStatus
- launchApp (src/App.js): starts the Lightning application

