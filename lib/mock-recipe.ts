/**
 * Single mock recipe for onboarding prototype.
 * Structured ingredients support serving-size scaling (baseServings = 4).
 */

export interface StructuredIngredient {
  amount: number;
  unit: string;
  name: string;
}

export interface MockRecipe {
  id: string;
  title: string;
  imageUrl: string;
  baseServings: number;
  ingredients: StructuredIngredient[];
  steps: string[];
  collectionIds?: string[];
}

export const MOCK_RECIPE: MockRecipe = {
  id: "mock-1",
  title: "Classic Chocolate Chip Cookies",
  imageUrl:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
  baseServings: 4,
  ingredients: [
    { amount: 2, unit: "cups", name: "all-purpose flour" },
    { amount: 1, unit: "tsp", name: "baking soda" },
    { amount: 1, unit: "tsp", name: "salt" },
    { amount: 1, unit: "cup", name: "butter, softened" },
    { amount: 0.75, unit: "cup", name: "granulated sugar" },
    { amount: 0.75, unit: "cup", name: "packed brown sugar" },
    { amount: 2, unit: "large", name: "eggs" },
    { amount: 2, unit: "tsp", name: "vanilla extract" },
    { amount: 2, unit: "cups", name: "chocolate chips" },
  ],
  collectionIds: ["desserts"],
  steps: [
    "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
    "In a medium bowl, whisk together flour, baking soda, and salt.",
    "In a large bowl, beat butter and both sugars until creamy. Beat in eggs and vanilla.",
    "Gradually blend in the flour mixture. Fold in chocolate chips.",
    "Drop rounded tablespoons of dough onto the prepared sheets, 2 inches apart.",
    "Bake 9–11 minutes until edges are golden. Cool on the sheet for 2 minutes, then transfer to a wire rack.",
  ],
};
