import { Test } from "@nestjs/testing";
import { UiV1Service } from "./service";
import registerUserFormSchema from "./json/register-user-form.schema.json";

describe("UiV1Service", () => {
  let uiV1Service: UiV1Service;

  beforeEach(async () => {
    const moduleReference = await Test.createTestingModule({
      providers: [UiV1Service],
    }).compile();

    uiV1Service = moduleReference.get<UiV1Service>(UiV1Service);
  });

  describe("getRegisterUserFormSchema", () => {
    it("will return the expected schema", () => {
      //* Act
      const result = uiV1Service.getRegisterUserFormSchema();

      //* Assert
      expect(result).toMatchObject(registerUserFormSchema);
    });
  });
});
