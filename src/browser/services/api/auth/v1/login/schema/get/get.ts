import { SharedV1Errors } from "../../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../../shared/constants/http-status-codes";
import { FormSchema } from "../../../../../../../../shared/types/form-schema.type";
import { ApiRoutes } from "../../../../../../routes";

export type GetApiAuthV1LoginSchemaResponse = FormSchema;

export async function getApiAuthV1LoginSchema(): Promise<GetApiAuthV1LoginSchemaResponse> {
  const response = await fetch(ApiRoutes.ApiAuthV1LoginSchema);

  switch (response.status) {
    case HttpStatusCodes.Success: {
      const data = await response.json();

      return data;
    }

    default:
      throw new Error(SharedV1Errors.FailedToLoadFormSchema);
  }
}
