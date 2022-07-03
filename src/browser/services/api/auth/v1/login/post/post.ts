import { SharedV1Errors } from "../../../../../../../shared/constants/errors";
import { HttpStatusCodes } from "../../../../../../../shared/constants/http-status-codes";
import { User } from "../../../../../../shared/types/api";
import { ApiRoutes } from "../../../../../routes";

export type PostApiAuthV1LoginParams = {
  values: Record<string, unknown>;
};

export type PostApiAuthV1LoginResponse = {
  accessToken: string;
  user: User;
};

export async function postApiAuthV1Login(
  params: PostApiAuthV1LoginParams,
): Promise<PostApiAuthV1LoginResponse> {
  const { values } = params;

  const response = await fetch(ApiRoutes.ApiAuthV1Login, {
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
