import React from "react";
import styles from "./wrapper.module.css";

export const Wrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
