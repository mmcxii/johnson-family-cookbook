import { registerEnumType } from "type-graphql";

/**
 * Interface for ensuring that Gender contains all expected columns.
 * If new fields should be added to Gender they should first be added here.
 */
export interface IGender {
  name: GenderNameEnum;
  code: GenderCodeEnum;
}

export enum GenderCodeEnum {
  Male = 1,
  Female = 2,
  Other = 3,
}

export enum GenderNameEnum {
  Male = "M",
  Female = "F",
  Other = "O",
}

/**
 * The GenderIdEnum is registed so it can be recognized by
 * the Type-GraphQL API and used as an input.
 */
registerEnumType(GenderCodeEnum, {
  name: "GenderCodeEnum",
});
