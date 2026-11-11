
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.hooks";
import { useSavedRecipes } from "./features/recipes/recipes.hooks";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import SavedPage from "./pages/SavedPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";


function Shell() {
  const { saved } = useSavedRecipes();
  return <Layout savedCount={saved.length} />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<SearchPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="recipe/:mealId" element={<RecipeDetailPage />} />

            <Route element={<RequireAuth />}>
              <Route path="saved" element={<SavedPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}