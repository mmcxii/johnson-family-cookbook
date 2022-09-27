export type FormSchema = {
  allOf?: Array<AllOfSchema>;
  properties: Record<string, FormGroupSchema | InputSchema>;
  propertyOrder?: Array<string>;
  title?: string;
  type?: "object";
};

export type FormGroupSchema = FormSchema & {
  title?: string;
  "ui:props"?: Record<string, unknown>;
};

export type AllOfSchema = {
  if: { properties: Record<string, unknown> };
  then: FormSchema;
};

export type InputSchema = ArrayInputSchema | NumberInputSchema | StringInputSchema;

export type StringInputSchema = {
  oneOf?: Array<Record<"const" | "title", string>>;
  title?: string;
  type?: "string";
  "ui:control"?: string;
  "ui:props"?: Record<string, unknown>;
};

export type NumberInputSchema = {
  title?: string;
  type?: "number";
  "ui:control"?: string;
  "ui:props"?: Record<string, unknown>;
};

export type ArrayInputSchema = {
  items?: FormSchema;
  title?: string;
  type?: "array";
  "ui:before": Array<InputSchema>;
};
