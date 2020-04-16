export interface IField {
  name: string;
  formattedName?: string;
  type?: "password" | "text" | "number" | "radio";
  placeholder?: string;
  required?: boolean;
  radioOptions?: string[];
}
