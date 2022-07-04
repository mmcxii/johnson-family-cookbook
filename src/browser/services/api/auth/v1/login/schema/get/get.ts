import { SharedV1Errors } from "../../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../../shared/constants/http-status-codes";
import { FormSchema } from "../../../../../../../../shared/types/form-schema.type";
import { ApiRoutes } from "../../../../../../utils/routes";
import { serviceRequest } from "../../../../../../utils/service-request";

export type GetApiAuthV1LoginSchemaResponse = FormSchema;

export async function getApiAuthV1LoginSchema(): Promise<GetApiAuthV1LoginSchemaResponse> {
  const response = await serviceRequest("get", ApiRoutes.ApiAuthV1LoginSchema);

  switch (response.status) {
    case HttpStatusCodes.Success: {
      const data = await response.json();

      return data;
    }

    default:
      throw new Error(SharedV1Errors.FailedToLoadFormSchema);
  }
}
