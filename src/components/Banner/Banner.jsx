import React from "react";
import styles from "./banner.module.css";

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.slogan}>
        <h2>
          <span>Join</span> and cook with us
        </h2>
      </div>
      <div className={styles.secSlogan}>
        <p>try to explore something</p>
        <p className={styles.new}>new</p>
      </div>
    </div>
  );
};
