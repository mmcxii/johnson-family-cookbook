import { SharedV1Errors } from "../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../shared/constants/http-status-codes";
import { User } from "../../../../../../shared/types/api";
import { ApiRoutes } from "../../../../../routes";

export type GetApiAuthV1UserResponse = User;

export async function getApiAuthV1User(): Promise<GetApiAuthV1UserResponse> {
  const response = await fetch(ApiRoutes.ApiAuthV1User);

  switch (response.status) {
    case HttpStatusCodes.Success: {
      const data = await response.json();

      return data;
    }

    default: {
      throw new Error(SharedV1Errors.FailedToLoadUser);
    }
  }
}
