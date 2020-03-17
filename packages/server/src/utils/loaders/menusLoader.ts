import DataLoader from "dataloader";
import { In } from "typeorm";

import { MenuMenuCourse } from "../../entities/relations/Menu-MenuCourse";
import { Menu } from "../../entities/Menu";

const batchMenus = async (menuCourseIds: number[]) => {
  // Access Menu & MenuCourse join table and find
  // all matches for passed in array of menuCourseIds
  const menuMenuCourses = await MenuMenuCourse.find({
    join: {
      alias: "menuMenuCourse",
      innerJoinAndSelect: {
        menu: "menuMenuCourse.menu",
      },
    },
    where: {
      menuCourseId: In(menuCourseIds),
    },
  });

  // Initialize the map
  const menuCourseIdToMenus: { [key: number]: Menu[] } = {};

  // Inerate over the returneed array of associations
  menuMenuCourses.forEach((mmc) => {
    // If a menu course already exists in the map add the menu to its list
    if (mmc.menuCourseId in menuCourseIdToMenus) {
      menuCourseIdToMenus[mmc.menuCourseId].push((mmc as any).__menu__);
      // Otherwise add a new entry starting with the menu
    } else {
      menuCourseIdToMenus[mmc.menuCourseId] = [(mmc as any).__menu__];
    }
  });

  // Return an array of the used menus
  return menuCourseIds.map((menuCourseId) => menuCourseIdToMenus[menuCourseId]);
};

export const createMenusLoader = () => new DataLoader(batchMenus);
