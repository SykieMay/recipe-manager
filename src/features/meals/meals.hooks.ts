import { useQuery } from "@tanstack/react-query";
import { searchMeals, getCategories, getMealById } from "./meals.api";

export function useSearchMeals(term: string) {
  return useQuery({
    queryKey: ["meals", term],
    queryFn: () => searchMeals(term),
    enabled: term.length > 0,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export async function getMealById(mealId: string): Promise<Recipe | null> {
  const { data } = await mealdb.get<SearchResponse>("/lookup.php", {
    params: { i: mealId },
  });
  const [meal] = data.meals ?? [];
  return meal ? toRecipe(meal) : null;
}

export function useMeal(mealId: string | undefined) {
  return useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealById(mealId!),
    enabled: Boolean(mealId),
    staleTime: Infinity,
  });
}
