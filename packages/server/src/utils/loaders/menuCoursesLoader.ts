import DataLoader from "dataloader";
import { In } from "typeorm";

import { MenuToMenuCourse } from "../../entities/relations/MenuToMenuCourse";
import { MenuCourse } from "../../entities/MenuCourse";

const batchMenuCourses = async (menuIds: number[]) => {
  // Access Menu & MenuCourse join table and find
  // all matches for passed in array of menuIds
  const menuMenuCourses = await MenuToMenuCourse.find({
    join: {
      alias: "menuMenuCourse",
      innerJoinAndSelect: {
        menuCourse: "menuMenuCourse.menuCourse",
      },
    },
    where: {
      menuCourseId: In(menuIds),
    },
  });

  // Initialize the map
  const menuIdToMenuCourse: { [key: number]: MenuCourse[] } = {};

  // Inerate over the returneed array of associations
  menuMenuCourses.forEach((mmc) => {
    // If a menu course already exists in the map add the menuCourse to its list
    if (mmc.menuCourseId in menuIdToMenuCourse) {
      menuIdToMenuCourse[mmc.menuCourseId].push((mmc as any).__menu__);
      // Otherwise add a new entry starting with the menuCourse
    } else {
      menuIdToMenuCourse[mmc.menuCourseId] = [(mmc as any).__menu__];
    }
  });

  // Return an array of the used menuCourses
  return menuIds.map((menuId) => menuIdToMenuCourse[menuId]);
};

export const createMenuCoursesLoader = () => new DataLoader(batchMenuCourses);
