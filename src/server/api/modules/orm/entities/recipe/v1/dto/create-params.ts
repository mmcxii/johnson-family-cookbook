import { _BaseEntity } from "../../../base-entity";
import { RecipeV1 } from "../entity";

type CreateRecipeV1ParamsType = Omit<RecipeV1, keyof _BaseEntity>;

export class CreateRecipeV1Params implements CreateRecipeV1ParamsType {
  public title: string;

  public ingredients: Array<string>;

  public instructions: string[];

  public description: undefined | string;
}
