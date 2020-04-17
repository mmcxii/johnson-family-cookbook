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

export interface IDropdown {
  name: string;
  options: (string | number)[];
}

export interface INavItem {
  name: string;
  link: string;
}
