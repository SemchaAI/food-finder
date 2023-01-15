import { ReactComponent as IconHeart } from "../../assets/icon-heart.svg";
import { ReactComponent as IconUser } from "../../assets/icon-user.svg";
import { ReactComponent as IconHome } from "../../assets/icon-home.svg";
import { ReactComponent as IconSearch } from "../../assets/icon-search.svg";
import { ReactComponent as IconMoon } from "../../assets/icon-moon.svg";
import { ReactComponent as IconSun } from "../../assets/icon-sun.svg";

import styles from "./footer.module.css";
import { useTheme } from "../../hooks/useTheme";
import { Link, useLocation } from "react-router-dom";

import cn from "classnames";

export const Footer = () => {
  const [currentTheme, handlerTheme] = useTheme();
  const location = useLocation();
  const path = location.pathname;

  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.listBar}>
          <li>
            <Link
              to="/favorite"
              className={cn(styles.color, {
                [styles.primary]: path === "/favorite",
              })}
            >
              <IconHeart alt="favorite" />
            </Link>
          </li>
          <li>
            <Link
              to="/user"
              className={cn(styles.color, {
                [styles.primary]: path === "/user",
              })}
            >
              <IconUser />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={cn(styles.color, {
                [styles.primary]: path === "/",
              })}
            >
              <IconHome />
            </Link>
          </li>
          <li onClick={handlerTheme}>
            {currentTheme === "light" ? (
              <IconMoon className={styles.color} />
            ) : (
              <IconSun className={styles.color} />
            )}
          </li>
          <li>
            <Link
              to="/search"
              className={cn(styles.color, {
                [styles.primary]: path === "/search",
              })}
            >
              <IconSearch />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
