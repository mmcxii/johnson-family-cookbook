import express from "express";
import { normalizeError } from "../../shared/normalize-error";
import { getProxyServerPort } from "../shared/env";
import { serveStaticAssets } from "./assets";
import { loggerMiddleware } from "./middleware/logger";
import { proxyMiddleware } from "./middleware/proxy";

(async () => {
  try {
    const app = express();
    const port = getProxyServerPort();

    app.use(loggerMiddleware());
    app.use(proxyMiddleware());
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
