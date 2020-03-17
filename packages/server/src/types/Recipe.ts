import { registerEnumType } from "type-graphql";

enum Categories {
  Appetizer = "APPETIZER",
  Bread = "BREAD",
  Breakfast = "BREAKFAST",
  Salad = "SALAD",
  Side = "SIDE",
  Soup = "SOUP",
  Other = "OTHER",
}

enum Beverages {
  Alcoholic = "ALCOHOLIC",
  NonAlcoholic = "NON_ALCOHOLIC",
}

enum Entrees {
  Beef = "BEEF",
  Poultry = "POULTRY",
  Pork = "PORK",
  Seafood = "SEAFOOD",
  Pasta = "PASTA",
  SlowCooker = "SLOW_COOKER",
  Other = "OTHER",
}

enum Desserts {
  Cookies = "COOKIES",
  Cake = "CAKE",
  Pie = "PIE",
  Other = "OTHER",
}

export const RecipeCategory = {
  ...Categories,
  Beverages,
  Entrees,
  Desserts,
};
export type RecipeCategory = typeof RecipeCategory;

registerEnumType(RecipeCategory, {
  name: "RecipeCategory",
  description: "All possible categories a recipe can be filed in",
});
