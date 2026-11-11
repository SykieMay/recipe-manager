import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

const KEY = "saved-recipes";

const read = (): SavedRecipe[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedRecipe[];
  } catch {
    return [];
  }
};

const write = (rows: SavedRecipe[]) => localStorage.setItem(KEY, JSON.stringify(rows));

export const getRecipes = async (): Promise<SavedRecipe[]> => read();

export const createRecipe = async (recipe: NewRecipe): Promise<SavedRecipe> => {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
};

export const updateRecipe = async ({ id, ...patch }: RecipePatch): Promise<SavedRecipe> => {
  const rows = read().map((r) => (r.id === id ? { ...r, ...patch } : r));
  write(rows);
  return rows.find((r) => r.id === id)!;
};

export const deleteRecipe = async (id: string): Promise<{ id: string }> => {
  write(read().filter((r) => r.id !== id));
  return { id };
};