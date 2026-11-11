import { useParams, useNavigate, Link } from "react-router-dom";
import { useMeal } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";

export default function RecipeDetailPage() {
  const { mealId } = useParams<{ mealId: string }>();
  const navigate = useNavigate();
  const { savedMealIds, create } = useSavedRecipes();
  const meal = useMeal(mealId);

  if (meal.isPending) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (meal.isError) {
    return (
      <div className="alert alert-error">
        <span>Could not reach TheMealDB. Check your connection.</span>
      </div>
    );
  }

  // A valid request for a meal that does not exist: not an error.
  if (!meal.data) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">No such recipe</h2>
        <p className="text-base-content/70">
          TheMealDB has no meal with id <code>{mealId}</code>.
        </p>
        <Link to="/" className="btn btn-primary btn-sm">
          Back to search
        </Link>
      </div>
    );
  }

  const recipe = meal.data;
  const isSaved = savedMealIds.has(recipe.mealId);

  return (
    <article className="space-y-4">
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card bg-base-100 shadow">
        <figure className="max-h-80 overflow-hidden">
          <img src={recipe.thumb} alt={recipe.title} className="w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{recipe.title}</h2>
          <div className="flex gap-2">
            <span className="badge badge-primary">{recipe.category}</span>
            <span className="badge badge-ghost">{recipe.ingredients.length} ingredients</span>
          </div>

          <h3 className="font-semibold mt-4">Ingredients</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <div className="card-actions justify-end mt-4">
            <button
              className={`btn btn-sm ${isSaved ? "btn-disabled" : "btn-primary"}`}
              onClick={() => create.mutate(recipe)}
              disabled={isSaved || create.isPending}
            >
              {isSaved ? "Saved" : create.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}