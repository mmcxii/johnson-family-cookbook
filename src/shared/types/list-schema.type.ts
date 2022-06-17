export type ListSchema = ListNodeSchema | PropertyNodeSchema;

export type ListNodeSchema = {
  key: string;
  title?: string;
  variant: "list";
  value: Array<ListSchema>;
};

export type PropertyNodeSchema =
  | StaticNodeSchema
  | NumberNodeSchema
  | EnumNodeSchema
  | DateNodeSchema;

export type StaticNodeSchema = {
  key: string;
  title?: string;
  variant: "static";
  value: null | string | number | boolean;
};

export type NumberNodeSchema = {
  key: string;
  title?: string;
  variant: "static";
  value: number;
  options?: Intl.NumberFormatOptions;
};

export type EnumNodeSchema = {
  key: string;
  title?: string;
  variant: "enum";
  value: string;
};

export type DateNodeSchema = {
  key: string;
  title?: string;
  variant: "static";
  value: number | string;
  options?: Intl.DateTimeFormatOptions;
};
