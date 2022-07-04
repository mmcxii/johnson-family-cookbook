import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { _BaseEntityService } from "../../base-entity-service";
import { CreateRecipeV1Params } from "./dto/create-params";
import { RecipeV1 } from "./entity";

export class RecipeV1Service extends _BaseEntityService<RecipeV1> {
  constructor(
    @InjectRepository(RecipeV1)
    protected readonly entityRepository: EntityRepository<RecipeV1>,
  ) {
    super(entityRepository);
  }

  protected defaultPopulate: undefined;

  public async createAndFlush(params: CreateRecipeV1Params): Promise<RecipeV1> {
    const recipe = this.entityRepository.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...params,
    });
    await this.entityRepository.persistAndFlush(recipe);

    return recipe;
  }
}
