# Recibook — Product context and prototype reference

Single reference for product vision, feature set, and prototype constraints. Use this when designing screens and implementing the app.

---

## 1. Product overview

Recibook is a recipe-collection app for people who save recipes from many places—social apps, videos, screenshots, links—and want one organized, searchable home for them. Users can add recipes (in the real product via WhatsApp and other channels), and Recibook keeps ingredients, steps, and nutrition in one place so they can find, organize, and edit recipes without losing them.

---

## 2. Value propositions (from marketing)

- **Save recipes from anywhere** — Import from TikTok, Instagram, Facebook, Pinterest, YouTube, even screenshots from your grandma’s cookbook. Just share it with Recibook on WhatsApp.
- **All your recipes, in one place** — Share a recipe to Recibook; it extracts ingredients, steps, and nutrition and saves it in your personal Recibook.
- **Organize recipes into collections** — Group recipes into collections like Breakfast, Lunch, Dinner, Desserts.
- **Find your recipes in seconds** — No more 20 minutes hunting for a saved recipe. Search by recipe or ingredient. Voilà.
- **Edit recipes and make them yours** — Tweak title, ingredients, steps, nutrition, upload your own photo.
- **Never lose a recipe again.** Save your first recipe on WhatsApp.

---

## 3. Core features (product)

- **Save recipes from anywhere** — WhatsApp share, URLs, screenshots (real product); prototype uses manual add and/or mock data.
- **Stored data per recipe** — Ingredients, steps, nutrition, optional photo.
- **Collections** — e.g. Breakfast, Lunch, Dinner, Desserts; recipes can belong to one or more collections.
- **Search** — By recipe name or ingredient.
- **Full edit** — Title, ingredients, steps, nutrition, photo.

---

## 4. Prototype scope

- **Frontend-only** — No backend or database.
- **No real WhatsApp or import** — Use manual “Add recipe” and/or mock data to simulate saving from elsewhere.
- **State** — In-memory only, or optional `localStorage` for “persists on refresh” only.
- **Focus** — Flows and UI for: browse recipes, add recipe, collections, search, edit recipe.

---

## 5. Quote / tagline

- **Never lose a recipe again.**
- **Save your first recipe on WhatsApp.**

Use these for consistency in copy and future docs.

---

## 6. Data model (prototype)

Minimal schema for consistent UI and client state. No persistence format specified yet.

**Recipe**

| Field           | Type              | Notes                    |
|----------------|-------------------|--------------------------|
| `id`           | string            | Unique identifier        |
| `title`        | string            | Recipe name              |
| `ingredients`  | string[]          | List of ingredients      |
| `steps`        | string[]          | Instructions             |
| `nutrition`    | object (optional) | Nutrition info           |
| `imageUrl`     | string (optional) | Photo URL                |
| `collectionIds`| string[] (optional) | IDs of collections    |

**Collection**

| Field  | Type   | Notes             |
|--------|--------|-------------------|
| `id`   | string | Unique identifier |
| `name` | string | e.g. Breakfast, Desserts |

For **serving-size scaling** on the recipe page, ingredients can be stored in a structured form: `{ amount: number, unit: string, name: string }[]` with a `baseServings` number on the recipe. Scale displayed amounts as `(amount * currentServings / baseServings)`.

---

## 7. Onboarding flow (current prototype)

Reference for what’s built and how it works. Mobile-first; works on web.

**Routes**

| Path        | Purpose                                                                 |
|-------------|-------------------------------------------------------------------------|
| `/`         | Landing: URL input, “Save Recipe” CTA, marketing below the fold        |
| `/fetching` | Intermediate “Fetching recipe…” screen; 3s then redirect to `/recipe`   |
| `/recipe`   | Recipe detail: hero image, ingredients, instructions, serving adjuster, “Save Recipe” → phone modal |
| `/recipes`  | Your recipes: simple dashboard (one saved recipe card for now)         |

**Flow**

1. User pastes any recipe URL and clicks “Save Recipe” → go to `/fetching`.
2. After 3 seconds, redirect to `/recipe` with the **same mock recipe** regardless of URL (no real scraping). Optional: pasted URL stored in `sessionStorage` under `recibook_pasted_url` for future use (e.g. “from [domain]”).
3. Recipe page shows mock data from `lib/mock-recipe.ts`: hero image (Unsplash placeholder), title, **structured ingredients** with **serving adjuster** (+/−), default “Serves 4”, min 1 / max 24; quantities scale by `currentServings / baseServings`.
4. “Save Recipe” opens a **phone-number modal** (controlled AlertDialog). Copy: phone is needed to quickly save future recipes and simplify future logins. Submit does not persist the number; it closes the modal and navigates to `/recipes`.
5. Your recipes page shows one card (same mock recipe) linking to `/recipe`; dashboard will be expanded later.

**Tech notes**

- Mock recipe: `lib/mock-recipe.ts` exports `MOCK_RECIPE` (and types `MockRecipe`, `StructuredIngredient`). Single placeholder image from `images.unsplash.com` (allowlisted in `next.config.ts`).
- Landing stores pasted URL in `sessionStorage` only; no backend.
- Copy uses “lose” not “loose” everywhere.
