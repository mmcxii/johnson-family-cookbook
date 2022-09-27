export type ListSchema = ListNodeSchema | PropertyNodeSchema;

export type ListNodeSchema = {
  key: string;
  title?: string;
  value: Array<ListSchema>;
  variant: "list";
};

export type PropertyNodeSchema =
  | DateNodeSchema
  | EnumNodeSchema
  | NumberNodeSchema
  | StaticNodeSchema;

export type StaticNodeSchema = {
  key: string;
  title?: string;
  value: undefined | null | boolean | number | string;
  variant: "static";
};

export type NumberNodeSchema = {
  key: string;
  options?: Intl.NumberFormatOptions;
  title?: string;
  value: number;
  variant: "number";
};

export type EnumNodeSchema = {
  key: string;
  title?: string;
  value: string;
  variant: "enum";
};

export type DateNodeSchema = {
  key: string;
  options?: Intl.DateTimeFormatOptions;
  title?: string;
  value: number | string;
  variant: "date";
};
