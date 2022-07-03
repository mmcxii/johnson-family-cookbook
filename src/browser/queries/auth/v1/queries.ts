import { useMutation, useQuery } from "react-query";
import {
  PostApiAuthV1LoginParams,
  PostApiAuthV1LoginResponse,
  PostApiAuthV1RegisterUserParams,
  PostApiAuthV1RegisterUserResponse,
  getApiAuthV1User,
  postApiAuthV1Login,
  postApiAuthV1RegisterUser,
} from "../../../services";
import { keys } from "./keys";
import { AuthV1SchemasQueries } from "./schemas";

export class AuthV1Queries {
  public static schemas = new AuthV1SchemasQueries(keys);

  public static useGetUser() {
    return useQuery(keys.user, getApiAuthV1User);
  }

  public static usePostRegisterUser() {
    return useMutation<PostApiAuthV1RegisterUserResponse, Error, PostApiAuthV1RegisterUserParams>(
      keys.user,
      postApiAuthV1RegisterUser,
    );
  }

  public static usePostLogin() {
    return useMutation<PostApiAuthV1LoginResponse, Error, PostApiAuthV1LoginParams>(
      keys.user,
      postApiAuthV1Login,
    );
  }
}
