import { createMenusLoader } from "./loaders/menusLoader";

export interface JfcbContext {
  menusLoader: ReturnType<typeof createMenusLoader>;
}
