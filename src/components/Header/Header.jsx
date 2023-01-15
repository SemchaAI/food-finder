import React from "react";
import styles from "./header.module.css";
import { ReactComponent as Location } from "../../assets/icon-location.svg";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  let path = location.pathname;

  if (path.includes("/recipe")) {
    path = "/recipe";
  }
  const namesMap = {
    "/": "home",
    "/favorite": "favorite",
    "/user": "user",
    "/search": "search",
    "/recipe": "recipe",
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        food-<span>e</span>!
      </h1>
      <div className={styles.location}>
        <div className={styles.locationText}>{namesMap[path]}</div>
        <Location className={styles.svg} />
      </div>
    </header>
  );
};
