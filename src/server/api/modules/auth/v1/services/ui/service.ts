import { Injectable } from "@nestjs/common";
import { FormSchema } from "../../../../../../../shared/types/form-schema.type";
import { loginFormSchema, registerUserFormSchema } from "./json";

@Injectable()
export class UiV1Service {
  public getRegisterUserFormSchema(): FormSchema {
    return registerUserFormSchema as FormSchema;
  }

  public getLoginFormSchema(): FormSchema {
    return loginFormSchema as FormSchema;
  }
}
