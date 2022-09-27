import * as React from "react";
import { normalizeError } from "../../../../../shared/normalize-error";
import { GetApiAuthV1UserResponse, getApiAuthV1User } from "../../../../services";
import { RequestState } from "../../../../shared/types/api";
import { getNotImplementedPromise } from "../../../../shared/utils/get-not-implemented-promise";

export type ContextData = {
  data: {
    user: null | GetApiAuthV1UserResponse;
  };
  error: {
    get: null | string;
  };
  state: {
    get: RequestState;
  };
  get: () => Promise<void>;
};

const initialValues: ContextData = {
  data: {
    user: null,
  },
  error: {
    get: null,
  },
  get: getNotImplementedPromise,
  state: {
    get: "idle",
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
      const data = await getApiAuthV1User();

      setState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          user: data,
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

  return (
    <Context.Provider
      value={{
        ...state,
        get,
      }}
    >
      {children}
    </Context.Provider>
  );
};
