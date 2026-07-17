# Collector Hub

A responsive web application for collectors to discover collectible items through a marketplace, browse community posts, and manage their personal collections. Built with **React**, **TypeScript**, and **Tailwind CSS v4**.

---

## Project Overview

Collector Hub is a single-page application where users can browse collectible items, engage with community posts, and organize their personal collection — all within a clean, responsive interface.

The app is built around three modules:
1. **Marketplace** — Search, filter, and sort collectible listings. View item details and add them to your collection or wishlist.
2. **Community Feed** — Browse posts from other collectors. Like, bookmark, and view comment threads.
3. **My Collection** — Manage items across **Owned**, **Wishlist**, and **Selling** tabs with live stats, search, and sorting.

---

## Features

### Marketplace
*   Browse collectibles in a responsive card grid (image, title, category, condition, price, seller).
*   Filter by category (Trading Cards, Coins, Comics, Lego, etc.) and condition (New, Like New, Good, Fair).
*   Search by title, category, or seller. Sort by newest or price.
*   Click a card to open a detail modal with full item info.
*   Add items to your collection ("Owned") or "Wishlist" directly from the card or modal.
*   Filter state persists across page navigation.

### Community Feed
*   Card-based feed with user avatars, titles, descriptions, and categories.
*   Like and save/bookmark posts (toggle states). Click a post for full details and comments.
*   Search by title, description, or author. Filter by category.

### My Collection
*   Three tabs: **Owned**, **Wishlist**, **Selling** — each with live item count and estimated total value (INR ₹).
*   Search, filter by category, and sort within the active tab.
*   Move items between tabs using the dropdown on each card. Remove items with one click.

### Global
*   Dark/Light theme toggle (persists in localStorage).
*   Toast notifications (`react-hot-toast`) on every user action.

---

## Tech Stack
*   **Framework**: [React 19](https://react.dev/) (Vite bundler)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Routing**: [React Router DOM v7](https://reactrouter.com/)
*   **Data Fetching**: [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (loads JSON from `public/data/`)
*   **State**: React Context API + `localStorage` persistence
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Toasts**: [React Hot Toast](https://react-hot-toast.com/)

---

## Project Structure
```text
collector-hub/
├── public/                 # Static assets served to the client
│   ├── favicon.svg
│   ├── icons.svg
│   └── data/               # JSON endpoints for Fetch API data loading
│       ├── collectionItems.json
│       ├── communityPosts.json
│       └── marketplaceProducts.json
├── src/
│   ├── components/         # Presentation UI components
│   │   ├── collection/     # Collection rendering sub-components
│   │   ├── common/         # Generic/shared UI components
│   │   └── marketplace/    # Marketplace filters and cards
│   ├── constants/          # Shared constants definitions (categories, conditions)
│   │   └── marketplace.ts
│   ├── context/            # Global context state provider (handles localStorage sync)
│   │   └── AppContext.tsx
│   ├── pages/              # Routed screen view layout containers
│   │   ├── CommunityFeed/
│   │   │   └── CommunityFeed.tsx
│   │   ├── Marketplace/
│   │   │   └── Marketplace.tsx
│   │   └── MyCollection/
│   │       └── MyCollection.tsx
│   ├── types/              # Strict TypeScript models
│   │   ├── collection.ts
│   │   ├── post.ts
│   │   └── product.ts
│   ├── utils/              # Helper utilities
│   │   └── formatCurrency.ts
│   ├── App.tsx             # Root template containing Router & Sidebar layout
│   ├── index.css           # Global Tailwind directive layout
│   └── main.tsx            # Main application bootstrapper
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/varshith125/collector-hub.git
    cd collector-hub
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Once started, open [http://localhost:5173](http://localhost:5173) in your browser.

4.  **Build for Production**:
    ```bash
    npm run build
    ```

5.  **Preview Production Build**:
    ```bash
    npm run preview
    ```
    Opens the production build locally at [http://localhost:4173](http://localhost:4173).

---

## Usage

1.  **Marketplace**:
    *   Search for items by title, category, or seller. Filter by category and condition, or sort by price/newest.
    *   Click any card to view full details in a modal. Add items to your collection or wishlist from there.
2.  **Community Feed**:
    *   Like and save/bookmark posts. Click a post to view its full description and comments.
3.  **My Collection**:
    *   Switch between **Owned**, **Wishlist**, and **Selling** tabs. Stats update in real-time.
    *   Use the **Move** dropdown on any card to shift items between tabs.
    *   Remove items with a single click.

---

## Assumptions

*   **No Backend**: Data is loaded via `fetch()` from static JSON files in `public/data/`. There is no server or database.
*   **localStorage Persistence**: All user actions (collection changes, likes, bookmarks, theme preference) persist in `localStorage`. No authentication is implemented.
*   **Strict TypeScript**: The codebase is fully typed with dedicated interfaces for all data models.
*   **INR Currency**: Prices default to Indian Rupees (₹) using `Intl.NumberFormat`.

---

## Libraries & Dependencies

| Package | Purpose |
|---|---|
| `react`, `react-dom` | Core UI framework |
| `react-router-dom` | Client-side routing |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon components (theme toggle, likes, bookmarks) |
| `tailwindcss`, `@tailwindcss/vite` | Utility-first CSS framework + Vite plugin |

---

## Architecture

The app follows a straightforward layered structure:

*   **Pages** fetch data and manage local state. They compose smaller, reusable **components** that handle rendering only.
*   A single **React Context** (`AppContext`) holds shared state — collections, feed data, filters, and theme — so navigating between pages doesn't lose user selections.
*   All data is loaded asynchronously via the **Fetch API** from static JSON files, with loading and error states handled at the page level.
*   User changes are synced to **localStorage** so state survives page refreshes.

---

## Responsive Design

Built with Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`, `xl:`):
*   Card grids scale from 1 column (mobile) → 2 (tablet) → 3–4 columns (desktop).
*   Toolbar layouts wrap/stack on small screens and align horizontally on wider viewports.
*   Font sizes, padding, and modals adjust proportionally across breakpoints.

---

## Edge Cases Handled

*   **Loading & Error States**: Spinner shown while fetching data. If a fetch fails, a styled error banner is displayed instead of a blank page.
*   **Safe localStorage Sync**: State only writes to `localStorage` after fetch completes successfully (`!loading && !error`), preventing data loss on network failures.
*   **Broken Images**: `onError` fallback replaces broken image URLs with a placeholder.
*   **Empty States**: Dedicated `EmptyState` component shown when filters return no results or a collection tab is empty.
*   **Search Sanitization**: Search inputs are trimmed and lowercased before matching.
*   **Dark Mode**: Class-based toggle (not `prefers-color-scheme`), so switching is instant and persists across sessions.

---

## Additional Features

*   **Currency Formatting**: Centralized `formatCurrency` utility for consistent INR formatting across all views.
*   **Toast Notifications**: Visual feedback on every user action (add, move, remove items).
*   **Detail Modals**: Full-screen overlays for marketplace item specs and community post comments.

---

## Future Improvements

*   Replace mock JSON with a real backend (e.g., Express + MongoDB).
*   Add user authentication and per-user collections.
*   Support image uploads via a cloud service like Cloudinary.
*   Implement checkout/contact-seller flows in the marketplace.

---

## Screenshots

### Marketplace
*Screenshot: Marketplace grid with filters, search, and item detail modal*

### Community Feed
*Screenshot: Community feed with post cards, likes, and comments modal*

### My Collection
*Screenshot: Collection tabs (Owned / Wishlist / Selling) with stats and item management*

---

## Author

**Gummadi Venkata Varshith** — [GitHub](https://github.com/varshith125)
