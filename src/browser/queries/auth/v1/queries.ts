import { useQuery } from "react-query";
import { getApiAuthV1LoginSchema, getApiAuthV1RegisterUserSchema } from "../../../services";
import { keys } from "./keys";

export class AuthV1Queries {
  private static keys = keys;

  public static useGetLoginSchema() {
    return useQuery(this.keys.loginFormSchema, getApiAuthV1LoginSchema);
  }

  public static useGetRegisterUserSchema() {
    return useQuery(this.keys.registerUserFormSchema, getApiAuthV1RegisterUserSchema);
  }
}
