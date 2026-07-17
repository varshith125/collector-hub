# Collector Hub QA Report

## Overview
- **Project:** Collector Hub
- **Review Date:** July 17, 2026
- **Reviewer:** Frontend / QA Engineering Lead
- **Scope of Testing:** Build verification, functional testing, responsive layout testing, accessibility review, modal behavior, performance audit, and code quality review across all pages and components.

## Environment
- **Node.js:** v20+
- **Vite:** v8.1.5
- **React:** v19.2.7
- **TypeScript:** v6.0.2
- **Tailwind CSS:** v4.3.3
- **Browsers Tested:** Chrome, Edge, Firefox, Mobile Chrome, Mobile Safari
- **Build Commands:**
  - `npm install`
  - `npm run build`
  - `npm run lint`

## Build Verification
- **npm install:** Passed cleanly. Audited 199 packages with 0 vulnerabilities.
- **npm run build:** Passed. `tsc -b && vite build` completed in 216ms, transforming 44 modules with no TypeScript or bundle compilation errors.
- **npm run lint:** Passed. `eslint .` completed with 0 warnings and 0 errors.

## Functional Testing

### Marketplace
The Marketplace page loads mock product data from `marketplaceProducts.json` and renders a searchable, filterable grid of collectible items.

Verified features:
- **Data Loading:** Products fetch successfully with loading spinners and error state handling.
- **Search & Filtering:** Real-time search by title works alongside category (Trading Cards, Funko Pop, Coins, Comics, Action Figures, Lego) and condition (New, Like New, Good, Fair) filters.
- **Sorting:** Price sorting (low-to-high, high-to-low) and newest sorting function as expected.
- **Cards & Modals:** Product cards display INR formatted pricing (`₹`), seller name, condition, and location. Clicking a card opens a detailed view modal.
- **Collection Actions:** "Add to Collection" (Owned) and "Wishlist" buttons update app state with toast feedback. Duplicate items within the same list are prevented with an informative error message.
- **Fallbacks:** Broken or missing image URLs fall back to a default placeholder image.

### Community Feed
The Community Feed page loads posts from `communityPosts.json` and tracks user interactions including likes, bookmarks, and comments.

Verified features:
- **Feed Rendering:** Posts load with author details, timestamps, category tags, images, and description snippets.
- **Filtering & Search:** Real-time search filters posts by title, description, or author. Category dropdown filters posts correctly.
- **Interactions:** Liking toggles the like count reactively. Saving/unsaving posts updates bookmark status and triggers toast feedback.
- **Comments & Detail View:** Clicking a post opens the detail modal displaying the post image, description, and comments list. Users can submit new comments, which append dynamically and increment comment counts.

### My Collection
The My Collection page manages user collectibles organized by tab views, displaying summary statistics and storage details.

Verified features:
- **Tab Views:** Correctly separates items across "Owned", "Wishlist", and "Selling" tabs.
- **Search & Filters:** Search filters items by title and category within the active tab. Category and sorting options update grid results instantly.
- **Item Management:** Select dropdown on each card enables moving items between lists. The "Remove" button removes the item from state with toast confirmation.
- **Statistics:** Summary cards accurately compute and display total item count and cumulative estimated value for the active tab.
- **Persistence:** State changes persist to `localStorage` and rehydrate on application load.

## Responsive Testing
Testing was conducted across key device breakpoints: 320px, 375px, 390px, 430px (mobile phones), 768px (tablets), 1024px (small laptops), and 1280px+ (desktop viewports).

- **Mobile Viewports (320px – 430px):** Single-column layouts render cleanly with full-width search inputs and select dropdowns. Header navigation links and collection tabs support smooth horizontal scrolling (`no-scrollbar`) to prevent line wrapping or overflow.
- **Tablet Viewports (768px – 1024px):** Grid expands to 2 and 3 columns. Filter toolbars switch to flex row layout with proper wrapping.
- **Desktop Viewports (1280px+):** Full 4-column product grid renders inside a centered `max-w-7xl` container. Navigation header and theme toggle align correctly.
- **Overflow & Scaling:** No horizontal page scrollbars were detected at any breakpoint.

## Accessibility Review
- **Keyboard Navigation:** Standard tab order works across form controls, links, and buttons.
- **ARIA Labels:** Interactive elements (search inputs, filter selects, like/save buttons, modal close controls) include appropriate `aria-label`, `role="dialog"`, `aria-modal="true"`, and `sr-only` heading descriptions.
- **Touch Targets:** Buttons, select dropdowns, input fields, and modal close elements maintain a minimum height/width of 44px for touch accessibility.
- **Focus & Color Contrast:** Slate color palette meets contrast standards in both light and dark modes.

## Performance Review
- **Build Output:** JavaScript bundle size is 291.87 kB (87.37 kB gzipped), and CSS is 34.10 kB (6.71 kB gzipped).
- **Rendering Efficiency:** Filtering, search, and statistics calculations are wrapped in `useMemo` hooks, avoiding redundant computations during state updates.
- **Network & Assets:** Images use `loading="lazy"` attribute, and local JSON assets load asynchronously without blocking initial render.

## Bugs Found

### Bug 1
- **Severity:** Low
- **Description:** Non-standard Tailwind CSS class names (`border-red-205`, `text-red-650`, `text-red-350`, `hover:text-slate-650`, `text-slate-450`) were present in error state containers and hover states.
- **Status:** Fixed
- **Resolution:** Replaced with valid Tailwind v4 classes (`border-red-200`, `text-red-600`, `dark:text-red-400`, `hover:text-slate-600`, `text-slate-400`).

### Bug 2
- **Severity:** Medium
- **Description:** Product and Post detail modals did not close when clicking the outside backdrop overlay or pressing the `Escape` key.
- **Status:** Fixed
- **Resolution:** Added a `keydown` listener for the `Escape` key and an `onClick` handler on backdrop elements with event propagation stopping on dialog content.

### Bug 3
- **Severity:** Low
- **Description:** Background body content remained scrollable when a modal dialog was open.
- **Status:** Fixed
- **Resolution:** Added automatic body scroll locking (`document.body.style.overflow = "hidden"`) when modals are mounted, with cleanup on unmount.

## Code Quality Observations
- Dependencies such as `axios` and `react-icons` are listed in `package.json` but are not currently imported in the codebase.
- Category arrays in filter components could be consolidated into `constants/marketplace.ts` to reduce duplication.

## Recommendations
- Remove unused dependencies (`axios`, `react-icons`) from `package.json` to streamline `node_modules`.
- Add an explicit "Clear Filters" button on search toolbars for faster filter resetting.

## Final Assessment
The application passes all build, linting, functional, and responsive testing criteria. The three minor issues identified during testing have been resolved and verified. Collector Hub is well-structured, performs cleanly across mobile and desktop viewports, and is ready for submission.
