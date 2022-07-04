import { faker } from "@faker-js/faker";
import { RecipeV1 } from "./entity";

export function getMockRecipe(params: Partial<RecipeV1> = {}): RecipeV1 {
  return {
    archivedAt: undefined,
    createdAt: faker.date.past(),
    description: undefined,
    id: faker.datatype.number(),
    ingredients: [faker.datatype.string(), faker.datatype.string()],
    instructions: [faker.datatype.string(), faker.datatype.string()],
    title: faker.datatype.string(),
    updatedAt: faker.date.recent(),
    ...params,
  };
}
