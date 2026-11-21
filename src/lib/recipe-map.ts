import type {
  RecipeDraft,
  RecipeIngredient,
  RecipeMood,
  RecipeStep,
  SavedRecipe,
} from "./types";

type RecipeRow = {
  id: number | string;
  title: string;
  summary: string;
  minutes: number;
  servings: number;
  mood: string;
  source: string;
  buzz_note: string;
  ingredients: RecipeIngredient[] | string;
  steps: RecipeStep[] | string;
  tips: string[] | string;
  matched_ingredients: string[] | string;
  missing_ingredients: string[] | string;
  created_at: string | Date;
};

function parseJson<T>(value: T | string, fallback: T): T {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value ?? fallback;
}

export function rowToSaved(row: RecipeRow): SavedRecipe {
  return {
    id: Number(row.id),
    title: row.title,
    summary: row.summary,
    minutes: row.minutes,
    servings: row.servings,
    mood: row.mood as RecipeMood,
    source: row.source as SavedRecipe["source"],
    buzzNote: row.buzz_note ?? "",
    ingredients: parseJson(row.ingredients, []),
    steps: parseJson(row.steps, []),
    tips: parseJson(row.tips, []),
    matchedIngredients: parseJson(row.matched_ingredients, []),
    missingIngredients: parseJson(row.missing_ingredients, []),
    score: 0,
    why: "",
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : String(row.created_at),
  };
}

export function draftPayload(body: Partial<RecipeDraft>) {
  return {
    title: String(body.title ?? "").trim(),
    summary: String(body.summary ?? "").trim(),
    minutes: Number(body.minutes ?? 20),
    servings: Number(body.servings ?? 2),
    mood: (body.mood ?? "everyday") as RecipeMood,
    source: (body.source ?? "suggest") as RecipeDraft["source"],
    buzzNote: String(body.buzzNote ?? "").trim(),
    ingredients: Array.isArray(body.ingredients) ? body.ingredients : [],
    steps: Array.isArray(body.steps) ? body.steps : [],
    tips: Array.isArray(body.tips) ? body.tips : [],
    matchedIngredients: Array.isArray(body.matchedIngredients)
      ? body.matchedIngredients
      : [],
    missingIngredients: Array.isArray(body.missingIngredients)
      ? body.missingIngredients
      : [],
  };
}
