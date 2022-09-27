import * as React from "react";
import { normalizeError } from "../../../../../shared/normalize-error";
import {
  GetApiAuthV1LoginSchemaResponse,
  PostApiAuthV1LoginParams,
  getApiAuthV1LoginSchema,
  postApiAuthV1RegisterUser,
} from "../../../../services";
import { RequestState } from "../../../../shared/types/api";
import { getNotImplementedPromise } from "../../../../shared/utils/get-not-implemented-promise";

export type ContextData = {
  data: {
    schema: null | GetApiAuthV1LoginSchemaResponse;
  };
  error: {
    get: null | string;
    post: null | string;
  };
  state: {
    get: RequestState;
    post: RequestState;
  };
  get: () => Promise<void>;
  post: (params: PostApiAuthV1LoginParams) => Promise<void>;
};

const initialValues: ContextData = {
  data: {
    schema: null,
  },
  error: {
    get: null,
    post: null,
  },
  get: getNotImplementedPromise,
  post: getNotImplementedPromise,
  state: {
    get: "idle",
    post: "idle",
  },
};

export const Context = React.createContext(initialValues);

export type ApiProviderProps = React.PropsWithChildren;

export const ApiProvider: React.FC<ApiProviderProps> = (props) => {
  const { children } = props;

  //* State
  const [state, setState] = React.useState(initialValues);

  //* Handlers
  const get: ContextData["get"] = async () => {
    setState((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        get: "loading",
      },
    }));

    try {
      const data = await getApiAuthV1LoginSchema();

      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          loginForm: data,
        },
        error: {
          ...prev.error,
          get: null,
        },
        state: {
          ...prev.state,
          get: "success",
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: {
          ...prev.error,
          get: normalizeError(error),
        },
        state: {
          ...prev.state,
          get: "error",
        },
      }));
    }
  };

  const post: ContextData["post"] = async (params) => {
    setState((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        post: "loading",
      },
    }));

    try {
      const data = await postApiAuthV1RegisterUser(params);

      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          loginForm: data,
        },
        error: {
          ...prev.error,
          post: null,
        },
        state: {
          ...prev.state,
          post: "success",
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: {
          ...prev.error,
          post: normalizeError(error),
        },
        state: {
          ...prev.state,
          post: "error",
        },
      }));
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        get,
        post,
      }}
    >
      {children}
    </Context.Provider>
  );
};
