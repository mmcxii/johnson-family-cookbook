import React from "react";
import { FormikErrors } from "formik";

import { IFieldGroup } from "../../store/types";
import { Input } from "./Input";

interface Props extends IFieldGroup {
  testId: string;
  errors: FormikErrors<any>;
}

export const FieldGroup: React.FC<Props> = ({
  fields,
  testId,
  errors,
  description,
  title,
}) => (
  <section>
    {title && <h3 className="capitalize text-xl">{title}</h3>}
    {description && <p className="pt-2">{description}</p>}

    <section className="pt-2 pb-6">
      {fields.map((field) => (
        <Input
          formTestId={testId}
          field={field}
          errors={errors}
          key={field.name}
        />
      ))}
    </section>
  </section>
);
