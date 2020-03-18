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

export type RecipeCategory =
  | "APPETIZER"
  | "BREAD"
  | "BREAKFAST"
  | "SALAD"
  | "SIDE"
  | "SOUP"
  | "OTHER"
  | "BEVERAGE_ALCOHOLIC"
  | "BEVERAGE_NON_ALCOHOLIC"
  | "ENTREE_BEEF"
  | "ENTREE_POULTRY"
  | "ENTREE_PORK"
  | "ENTREE_SEAFOOD"
  | "ENTREE_PASTA"
  | "ENTREE_SLOW_COOKER"
  | "ENTREE_OTHER"
  | "DESSERT_COOKIES"
  | "DESSERT_CAKE"
  | "DESSERT_PIE"
  | "DESSERT_OTHER";
export const RecipeCategoryEnum = {
  ...Categories,
  Beverages,
  Entrees,
  Desserts,
};
export type RecipeCategoryType = typeof RecipeCategoryEnum;

registerEnumType(RecipeCategoryEnum, {
  name: "RecipeCategory",
  description: "All possible categories a recipe can be filed in",
});
