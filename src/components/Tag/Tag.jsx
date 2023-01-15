import React from "react";
import styles from "./tag.module.css";
import cn from "classnames";

export const Tag = ({ text }) => {
  return <div className={`${styles.tag} ${styles[text]}`}>{text}</div>;
};
