import express from "express";
import { normalizeError } from "../../shared/normalize-error";
import { getProxyServerPort } from "../shared/env";
import { serveStaticAssets } from "./assets";

(async () => {
  try {
    const app = express();
    const port = getProxyServerPort();

    app.use(serveStaticAssets());

    app.listen(port, () => {
      console.log(`Proxy Server available at port: ${port}`);
    });
  } catch (error) {
    const errorMessage = normalizeError(error);
    console.error(errorMessage);
    process.exit(1);
  }
})();
