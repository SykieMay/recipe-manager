
import { mealdb } from "../../lib/api";
import type {
  Meal,
  Recipe,
  SearchResponse,
  CategoriesResponse,
} from "./meals.types";

export function toRecipe(meal: Meal): Recipe {
  const ingredients = Array.from(
    { length: 20 },
    (_, i) => meal[`strIngredient${i + 1}` as keyof Meal]
  ).filter(
    (x): x is string => typeof x === "string" && Boolean(x.trim())
  );

  return {
    mealId: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    thumb: meal.strMealThumb,
    ingredients,
    time: 0,
    notes: "",
    favorite: false,
  };
}

// Search meals
export async function searchMeals(
  query: string
): Promise<Recipe[]> {
  const { data } = await mealdb.get<SearchResponse>("/search.php", {
    params: { s: query },
  });

  return (data.meals ?? []).map(toRecipe);
}

// Get categories
export async function getCategories(): Promise<string[]> {
  const { data } = await mealdb.get<CategoriesResponse>(
    "/categories.php"
  );

  return (data.categories ?? []).map((c) => c.strCategory);
}

// Get one meal by ID
export async function getMealById(
  mealId: string
): Promise<Recipe | null> {
  const { data } = await mealdb.get<SearchResponse>("/lookup.php", {
    params: { i: mealId },
  });

  const meal = data.meals?.[0];

  return meal ? toRecipe(meal) : null;
}
