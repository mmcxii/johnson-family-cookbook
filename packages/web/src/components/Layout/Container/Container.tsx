import React from "react";

import styles from "./Container.module.scss";

export const Container: React.FC = ({ children }) => (
  <div className={styles.main}>{children}</div>
);
