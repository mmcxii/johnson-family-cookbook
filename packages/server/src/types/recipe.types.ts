import { User } from "../entities/User";
import { RecipeIngredient } from "../entities/RecipeIngredient";

export interface RecipeRequiredValues {
  name: string;
  directions: string;
  category: RecipeCategory;
  createdBy: User;
  ingredients: RecipeIngredient[];
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
