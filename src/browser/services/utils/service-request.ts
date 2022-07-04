import { HttpStatusCodes } from "../../../shared/constants/http-status-codes";
import { deepCopy } from "../../../shared/utils/deep-copy";
import { createInMemoryCache } from "../../shared/utils/in-memory-cache";

const accessTokenCache = createInMemoryCache<string>();

export async function serviceRequest(
  method: RequestInit["method"],
  path: RequestInfo | URL,
  options: RequestInit = {},
) {
  const accessToken = accessTokenCache.get();

  const fetchOptions = deepCopy<RequestInit>({
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
      ...(options.headers ?? {}),
    },
    method,
    ...options,
  });

  const response = await fetch(path, fetchOptions);
  if (response.status === HttpStatusCodes.Success) {
    const data = await response.json();
    response.json = async () => data;
    if (Object.prototype.hasOwnProperty.call(data, "accessToken")) {
      const { accessToken, ...restOfData } = data;
      response.json = async () => restOfData;

      accessTokenCache.set(accessToken);
    }
  }

  return response;
}
