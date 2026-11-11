
import { useState } from "react";

import {
  useSearchMeals,
  useCategories,
} from "./features/meals/meals.hooks";

import { useSavedRecipes } from "./features/recipes/recipes.hooks";

import type { SavedRecipe } from "./features/recipes/recipes.types";

import SearchBar from "./components/SearchBar";
import MealCard from "./components/MealCard";
import CategoryFilter from "./components/CategoryFilter";
import RecipeList from "./components/RecipeList";
import SummaryBar from "./components/SummaryBar";
import EditRecipeForm from "./components/EditRecipeForm";

export default function App() {
  // Search and filter states
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);

  // API hooks
  const search = useSearchMeals(term);
  const categories = useCategories();

  // Saved recipes
  const {
    query: savedQuery,
    saved,
    savedMealIds,
    favoriteCount,
    create,
    update,
    remove,
    toggleFavorite,
  } = useSavedRecipes();

  // Search results
  const results = search.data ?? [];

  // Filter saved recipes
  const visible =
    filter === "All"
      ? saved
      : saved.filter((recipe) => recipe.category === filter);

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold">
            Recipe Manager
          </h1>

          <p className="text-base-content/70 mt-2">
            Search TheMealDB · save what you like · add your own notes
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={setTerm} />

        {/* Search Results */}
        <section className="space-y-3">

          {search.isLoading && (
            <div className="text-center py-8">
              <span className="loading loading-spinner loading-lg" />
            </div>
          )}

          {search.isError && (
            <div className="alert alert-error">
              <span>
                Could not reach TheMealDB. Check your connection.
              </span>
            </div>
          )}

          {!search.isLoading && term && results.length === 0 && (
            <div className="text-center py-8 text-base-content/60">
              No meals found for &ldquo;{term}&rdquo;. Try another word.
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
                  isSaving={
                    create.isPending &&
                    create.variables?.mealId === meal.mealId
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Saved Recipes */}
        <div className="divider">
          Saved
        </div>

        <SummaryBar
          total={saved.length}
          favorites={favoriteCount}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories.data ?? []}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {/* Loading Saved Recipes */}
        {savedQuery.isPending && (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {/* Saved Recipes Error */}
        {savedQuery.isError && (
          <div className="alert alert-error">
            <span>
              Could not reach the recipe API. Is json-server running?
              Start it with npm run api.
            </span>
          </div>
        )}

        {/* Recipe List */}
        {savedQuery.data && (
          <RecipeList
            recipes={visible}
            onToggleFavorite={toggleFavorite}
            onEdit={setEditing}
            onDelete={remove.mutate}
            deletingId={
              remove.isPending
                ? remove.variables ?? null
                : null
            }
          />
        )}

        {/* Edit Recipe Modal */}
        {editing && (
          <div className="modal modal-open">
            <div className="modal-box">
              <EditRecipeForm
                recipe={editing}
                onSave={(patch) => {
                  update.mutate(patch);
                  setEditing(null);
                }}
                onCancel={() => setEditing(null)}
                isSaving={update.isPending}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}