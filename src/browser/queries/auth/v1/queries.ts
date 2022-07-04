import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  PostApiAuthV1LoginParams,
  PostApiAuthV1LoginResponse,
  PostApiAuthV1RegisterUserParams,
  PostApiAuthV1RegisterUserResponse,
  getApiAuthV1User,
  postApiAuthV1Login,
  postApiAuthV1RegisterUser,
} from "../../../services";
import { keys as keysDefinition } from "./keys";
import { AuthV1SchemasQueries } from "./schemas";

export class AuthV1Queries {
  public static keys = keysDefinition;
  public static schemas = new AuthV1SchemasQueries(this.keys);

  public static useGetUser() {
    return useQuery(this.keys.user, getApiAuthV1User);
  }

  public static usePostRegisterUser() {
    const qc = useQueryClient();

    return useMutation<PostApiAuthV1RegisterUserResponse, Error, PostApiAuthV1RegisterUserParams>(
      postApiAuthV1RegisterUser,
      {
        onSuccess: () => {
          qc.invalidateQueries(this.keys.user);
        },
      },
    );
  }

  public static usePostLogin() {
    const qc = useQueryClient();

    return useMutation<PostApiAuthV1LoginResponse, Error, PostApiAuthV1LoginParams>(
      postApiAuthV1Login,
      {
        onSuccess: () => {
          qc.invalidateQueries(this.keys.user);
        },
      },
    );
  }
}
