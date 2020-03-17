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
  Alcoholic = "BEVERAGE_ALCOHOLIC",
  NonAlcoholic = "BEVERAGE_NON_ALCOHOLIC",
}

enum Entrees {
  Beef = "ENTREE_BEEF",
  Poultry = "ENTREE_POULTRY",
  Pork = "ENTREE_PORK",
  Seafood = "ENTREE_SEAFOOD",
  Pasta = "ENTREE_PASTA",
  SlowCooker = "ENTREE_SLOW_COOKER",
  Other = "ENTREE_OTHER",
}

enum Desserts {
  Cookies = "DESSERT_COOKIES",
  Cake = "DESSERT_CAKE",
  Pie = "DESSERT_PIE",
  Other = "DESSERT_OTHER",
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
