import { getApiServerPort, getHostingEnv, getProxyServerPort } from "./env";

let uiUrl: string;
let apiUrl: string;

switch (getHostingEnv()) {
  case "localhost":
  default: {
    uiUrl = `http://localhost:${getProxyServerPort()}`;
    apiUrl = `http://localhost:${getApiServerPort()}`;
  }
}

export { apiUrl, uiUrl };
