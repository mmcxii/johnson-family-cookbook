import { createMenusLoader } from "./loaders/menusLoader";
import { createMenuCoursesLoader } from "./loaders/menuCoursesLoader";

export interface JfcbContext {
  menusLoader: ReturnType<typeof createMenusLoader>;
  menuCoursesLoader: ReturnType<typeof createMenuCoursesLoader>;
}
