export type RecipeMood = "quick" | "everyday" | "comfort" | "fresh";

export type RecipeIngredient = {
  name: string;
  amount: string;
  optional?: boolean;
};

export type RecipeStep = {
  title: string;
  body: string;
  minutes?: number;
  ingredients?: string[];
};

export type RecipeDraft = {
  title: string;
  summary: string;
  minutes: number;
  servings: number;
  mood: RecipeMood;
  source: "suggest" | "buzz" | "custom";
  buzzNote: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  score: number;
  why: string;
};

export type SavedRecipe = RecipeDraft & {
  id: number;
  createdAt: string;
};

export type BuzzTrend = {
  id: string;
  title: string;
  hook: string;
  vibe: string;
  keywords: string[];
};
