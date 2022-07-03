import { SharedV1Errors } from "../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../shared/constants/http-status-codes";
import { User } from "../../../../../../shared/types/api";
import { ApiRoutes } from "../../../../../routes";

export type PostApiAuthV1RegisterUserParams = {
  values: Record<string, unknown>;
};

export type PostApiAuthV1RegisterUserResponse = {
  accessToken: string;
  user: User;
};

export async function postApiAuthV1RegisterUser(params: PostApiAuthV1RegisterUserParams) {
  const { values } = params;

  const response = await fetch(ApiRoutes.ApiAuthV1RegisterUser, {
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
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
