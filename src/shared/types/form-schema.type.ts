export type FormSchema = {
  type?: "object";
  properties: Record<string, FormGroupSchema | InputSchema>;
  propertyOrder?: Array<string>;
  allOf?: Array<AllOfSchema>;
  title?: string;
};

export type FormGroupSchema = FormSchema & {
  title?: string;
  "ui:props"?: Record<string, unknown>;
};

export type AllOfSchema = {
  if: { properties: Record<string, unknown> };
  then: FormSchema;
};

export type InputSchema = StringInputSchema | NumberInputSchema;

export type StringInputSchema = {
  type?: "string";
  title?: string;
  oneOf?: Array<Record<"const" | "title", string>>;
  "ui:props"?: Record<string, unknown>;
  "ui:control"?: string;
};

export type NumberInputSchema = {
  type?: "number";
  title?: string;
  "ui:props"?: Record<string, unknown>;
  "ui:control"?: string;
};
