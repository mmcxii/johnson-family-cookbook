import { Provider } from "@nestjs/common";
import { getBaseMockEntityService } from "../../test-utils/entity-service.mock";
import { RecipeV1 } from "./entity";
import { getMockRecipe } from "./entity.mock";
import { RecipeV1Service } from "./service";

export function getMockRecipeV1Service(recipes: Array<RecipeV1> = [getMockRecipe()]): Provider {
  return {
    provide: RecipeV1Service,
    useValue: {
      ...getBaseMockEntityService(recipes),
    },
  };
}
