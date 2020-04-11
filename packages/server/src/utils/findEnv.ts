import find from "find-up";

export const findEnv = () => find.sync(".env");
