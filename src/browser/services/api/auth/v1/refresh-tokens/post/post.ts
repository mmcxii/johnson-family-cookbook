import { SharedV1Errors } from "../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../shared/constants/http-status-codes";
import { User } from "../../../../../../shared/types/api";
import { ApiRoutes } from "../../../../../utils/routes";
import { serviceRequest } from "../../../../../utils/service-request";

export type PostApiAuthV1RefreshTokensResponse = {
  user: User;
};

export async function postApiAuthV1RefreshTokens(): Promise<PostApiAuthV1RefreshTokensResponse> {
  const response = await serviceRequest("post", ApiRoutes.ApiAuthV1RefreshTokens);

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
