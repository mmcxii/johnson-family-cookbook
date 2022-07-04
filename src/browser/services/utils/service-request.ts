import { HttpStatusCodes } from "../../../shared/constants/http-status-codes";
import { deepCopy } from "../../../shared/utils/deep-copy";
import { createInMemoryCache } from "../../shared/utils/in-memory-cache";
import { postApiAuthV1RefreshTokens } from "../api";
import { ApiRoutes } from "./routes";

const accessTokenCache = createInMemoryCache<string>();

export async function serviceRequest(
  method: RequestInit["method"],
  path: RequestInfo | URL,
  options: RequestInit = {},
): Promise<Response> {
  const fetchOptions = deepCopy<RequestInit>({
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessTokenCache.get()}`,
      ...(options.headers ?? {}),
    },
    method,
    ...options,
  });

  const response = await fetch(path, fetchOptions);

  switch (response.status) {
    case HttpStatusCodes.Unauthorized: {
      if (path !== ApiRoutes.ApiAuthV1RefreshTokens) {
        await postApiAuthV1RefreshTokens();

        return serviceRequest(method, path, options);
      }
    }

    case HttpStatusCodes.Success:
    default: {
      const data = await response.json();
      response.json = async () => data;
      if (Object.prototype.hasOwnProperty.call(data, "accessToken")) {
        const { accessToken, ...restOfData } = data;
        response.json = async () => restOfData;

        accessTokenCache.set(accessToken);
      }
    }
  }

  return response;
}
