import React from "react";
import { Field, FormikErrors } from "formik";

import { IField } from "../../store/types";

interface Props {
  formTestId: string;
  field: IField;
  errors: FormikErrors<any>;
}

export const Input: React.FC<Props> = ({ formTestId, field, errors }) => (
  <div className="py-4">
    <label htmlFor={field.name} className="block pb-2 pl-2 capitalize">
      {field.formattedName || field.name}
    </label>
    {field.type !== "radio" ? (
      <Field
        name={field.name}
        placeholder={
          field.placeholder || `Enter your ${field.formattedName || field.name}`
        }
        data-testid={`${formTestId}_form__${field}_input`}
        type={field.type || "text"}
        className="w-full px-4 py-2 rounded-lg shadow-inner focus:outline-none bg-gray-200 text-gray-700"
        required={field.required || true}
      />
    ) : (
      <section className="flex justify-evenly">
        {field.radioOptions!.map((ro) => (
          <article>
            <Field
              id={field.name + ro}
              name={field.name}
              data-testid={`${formTestId}_form__${
                field.name
              }-${ro.toLowerCase()}`}
              value={ro}
              type="radio"
              className="mr-2"
            />
            <label htmlFor={field.name + ro}>{ro}</label>
          </article>
        ))}
      </section>
    )}
    {errors[field.name] && (
      // eslint-disable-next-line react/jsx-one-expression-per-line
      <p className="pt-2 pl-2 text-gray-500">Error: {errors[field.name]}</p>
    )}
  </div>
);
