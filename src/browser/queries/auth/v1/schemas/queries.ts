import { useQuery } from "react-query";
import { getApiAuthV1LoginSchema, getApiAuthV1RegisterUserSchema } from "../../../../services";
import { keys as authV1Keys } from "../keys";

export class AuthV1SchemasQueries {
  constructor(private readonly keys: typeof authV1Keys) {}

  public useGetLoginSchema() {
    return useQuery(this.keys.loginFormSchema, getApiAuthV1LoginSchema);
  }

  public useGetRegisterUserSchema() {
    return useQuery(this.keys.registerUserFormSchema, getApiAuthV1RegisterUserSchema);
  }
}
