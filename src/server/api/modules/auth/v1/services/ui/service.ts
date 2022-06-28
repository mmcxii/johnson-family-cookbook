import { Injectable } from "@nestjs/common";
import { FormSchema } from "../../../../../../../shared/types/form-schema.type";
import registerUserFormSchema from "./json/register-user-form.schema.json";

@Injectable()
export class UiV1Service {
  public getRegisterUserFormSchema(): FormSchema {
    return registerUserFormSchema as FormSchema;
  }
}
