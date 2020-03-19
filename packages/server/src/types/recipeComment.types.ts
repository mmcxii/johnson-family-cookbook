import { User } from "../entities/User";
import { Recipe } from "../entities/Recipe";

export interface RecipeCommentRequiredValues {
  message: string;
  author: User;
  recipe: Recipe;
}
