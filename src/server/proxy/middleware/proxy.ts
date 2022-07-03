import * as httpProxyMiddleware from "http-proxy-middleware";
import { apiUrl } from "../../shared/base-url";

export function proxyMiddleware() {
  return httpProxyMiddleware.createProxyMiddleware("/api", {
    target: apiUrl,
  });
}
