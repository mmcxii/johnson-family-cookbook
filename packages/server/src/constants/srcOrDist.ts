import { NODE_ENV } from "./envVariables";

export const srcOrDist = NODE_ENV === "production" ? "dist" : "src";
