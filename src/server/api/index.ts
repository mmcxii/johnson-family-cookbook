import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { getApiServerPort } from "../shared/env";
import { AppModule } from "./modules/app";

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = getApiServerPort();
  app.setGlobalPrefix("/api");
  app.use(cookieParser());

  await app.listen(port);
  console.log(`Api Server available at port: ${port}`);
})();
