export interface IField {
  name: string;
  formattedName?: string;
  type?: "password" | "text" | "number" | "radio" | "date";
  placeholder?: string;
  required?: boolean;
  radioOptions?: string[];
  selectOptions?: string[];
}

export interface IFieldGroup {
  title?: string;
  description?: string;
  fields: IField[];
}
