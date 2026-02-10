/**
 * Generates a random recipe for the prototype so "Create recipe" feels real.
 */

import type { MockRecipe, StructuredIngredient } from "@/lib/mock-recipe";

const RECIPE_TITLES = [
  "Classic Chocolate Chip Cookies",
  "Creamy Garlic Pasta",
  "Sheet Pan Lemon Herb Chicken",
  "Avocado Toast with Eggs",
  "Beef Tacos with Lime Crema",
  "Mushroom Risotto",
  "Greek Salad with Feta",
  "Banana Oat Pancakes",
  "Tomato Basil Bruschetta",
  "Honey Sriracha Salmon",
  "Vegetable Stir-Fry",
  "Blueberry Muffins",
  "Caprese Stuffed Chicken",
  "French Onion Soup",
  "Chocolate Brownies",
  "Caesar Salad with Croutons",
  "Beef and Broccoli",
  "Margherita Pizza",
  "Coconut Curry Lentils",
  "Apple Cinnamon Oatmeal",
];

const RECIPE_IMAGES = [
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
  "https://images.unsplash.com/photo-1551183053-bf91a1f81141?w=800&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
  "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
  "https://images.unsplash.com/photo-1512621776951-a25141b677cc?w=800&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
];

const INGREDIENT_POOL: StructuredIngredient[] = [
  { amount: 2, unit: "cups", name: "all-purpose flour" },
  { amount: 1, unit: "tsp", name: "baking soda" },
  { amount: 1, unit: "tsp", name: "salt" },
  { amount: 1, unit: "cup", name: "butter, softened" },
  { amount: 0.75, unit: "cup", name: "granulated sugar" },
  { amount: 2, unit: "large", name: "eggs" },
  { amount: 2, unit: "tsp", name: "vanilla extract" },
  { amount: 3, unit: "cloves", name: "garlic, minced" },
  { amount: 1, unit: "lb", name: "chicken breast" },
  { amount: 2, unit: "tbsp", name: "olive oil" },
  { amount: 1, unit: "cup", name: "arborio rice" },
  { amount: 4, unit: "cups", name: "vegetable broth" },
  { amount: 1, unit: "cup", name: "parmesan, grated" },
  { amount: 8, unit: "oz", name: "pasta" },
  { amount: 1, unit: "bunch", name: "fresh basil" },
  { amount: 2, unit: "large", name: "tomatoes" },
  { amount: 1, unit: "cup", name: "mozzarella" },
  { amount: 0.5, unit: "cup", name: "heavy cream" },
  { amount: 1, unit: "tbsp", name: "soy sauce" },
  { amount: 2, unit: "cups", name: "mixed vegetables" },
];

const STEP_POOL = [
  "Preheat oven to 375°F (190°C).",
  "In a large bowl, combine the dry ingredients.",
  "Add the wet ingredients and mix until just combined.",
  "Heat oil in a large skillet over medium-high heat.",
  "Season with salt and pepper to taste.",
  "Cook for 5–7 minutes until golden.",
  "Reduce heat and simmer for 10 minutes.",
  "Stir in the remaining ingredients.",
  "Serve immediately, garnished as desired.",
  "Let rest for 5 minutes before serving.",
  "Bring to a boil, then reduce to a simmer.",
  "Fold gently to avoid overmixing.",
  "Bake for 20–25 minutes until set.",
  "Chop the vegetables into even pieces.",
  "Whisk together until smooth.",
];

const COLLECTION_IDS = ["breakfast", "lunch", "dinner", "desserts"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

export function generateRandomRecipe(): MockRecipe {
  const id = `recipe-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const numIngredients = 6 + Math.floor(Math.random() * 6);
  const numSteps = 4 + Math.floor(Math.random() * 4);
  const numCollections = 1 + Math.floor(Math.random() * 2);
  return {
    id,
    title: pick(RECIPE_TITLES),
    imageUrl: pick(RECIPE_IMAGES),
    baseServings: [2, 4, 4, 4, 6, 6, 8][Math.floor(Math.random() * 7)],
    ingredients: pickMany(INGREDIENT_POOL, numIngredients),
    steps: pickMany(STEP_POOL, numSteps),
    collectionIds: pickMany(COLLECTION_IDS, numCollections),
  };
}
