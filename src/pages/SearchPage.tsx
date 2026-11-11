import { useState } from "react";
import { useSearchMeals } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import SearchBar from "@/components/SearchBar";
import MealCard from "@/components/MealCard";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const { savedMealIds, create } = useSavedRecipes();
  const search = useSearchMeals(term);
  const results = search.data ?? [];

  return (
    <>
      <SearchBar onSearch={setTerm} />

      {search.isLoading && (
        <div className="text-center py-8">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {search.isError && (
        <div className="alert alert-error">
          <span>Could not reach TheMealDB. Check your connection.</span>
        </div>
      )}

      {!search.isLoading && term && results.length === 0 && (
        <div className="text-center py-8 text-base-content/60">
          No meals found for &ldquo;{term}&rdquo;. Try another word.
        </div>
      )}

      {!term && (
        <div className="text-center py-12 text-base-content/60">
          Search TheMealDB above, then save what you like.
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {results.map((meal) => (
            <MealCard
              key={meal.mealId}
              meal={meal}
              onSave={create.mutate}
              isSaved={savedMealIds.has(meal.mealId)}
              isSaving={create.isPending && create.variables?.mealId === meal.mealId}
            />
          ))}
        </div>
      )}
    </>
  );
}