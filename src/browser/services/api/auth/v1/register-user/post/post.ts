import { SharedV1Errors } from "../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../shared/constants/http-status-codes";
import { User } from "../../../../../../shared/types/api";
import { ApiRoutes } from "../../../../../utils/routes";
import { serviceRequest } from "../../../../../utils/service-request";

export type PostApiAuthV1RegisterUserParams = {
  values: Record<string, unknown>;
};

type PostApiAuthV1RegisterUserApiResponse = {
  accessToken: string;
  user: User;
};

export type PostApiAuthV1RegisterUserResponse = Omit<
  PostApiAuthV1RegisterUserApiResponse,
  "accessToken"
>;

export async function postApiAuthV1RegisterUser(
  params: PostApiAuthV1RegisterUserParams,
): Promise<PostApiAuthV1RegisterUserResponse> {
  const { values } = params;

  const response = await serviceRequest("post", ApiRoutes.ApiAuthV1RegisterUser, {
    body: JSON.stringify(values),
  });

  switch (response.status) {
    case HttpStatusCodes.Success: {
      const data = await response.json();

      return data;
    }

    default: {
      throw new Error(SharedV1Errors.FailedToSubmitForm);
    }
  }
}
