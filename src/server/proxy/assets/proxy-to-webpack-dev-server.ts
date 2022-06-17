import * as httpProxyMiddleware from "http-proxy-middleware";
import { getWebpackDevServerPort } from "../../shared/env";

export function proxyToWebpackDevServerMiddleware() {
  const webpackDevServerPort = getWebpackDevServerPort();

  const proxyMiddleware = httpProxyMiddleware.createProxyMiddleware("/", {
    target: `http://localhost:${webpackDevServerPort}`,
  });

  return [proxyMiddleware];
}
