import styles from "./foodList.module.css";
import { GiKnifeFork } from "react-icons/gi";
import { ReactComponent as Favorite } from "../../assets/icon-favor.svg";

import cn from "classnames";

import { useFoodList } from "../../hooks/useFoodList";
import { Link } from "react-router-dom";

export const FoodList = ({ selector, action }) => {
  const [foodList, favorClickHandler] = useFoodList(selector, action);
  console.log(foodList.list);
  return (
    <ul className={styles.list}>
      {foodList.error && <h2>cant fetch data</h2>}
      {foodList.status === "loading" && <h2>Loading</h2>}
      {foodList.status === "false" && (
        <h2>Please add recipes to your favorites</h2>
      )}
      {(foodList.status === "received" || foodList.status === "true") &&
        foodList.list.map((el) => (
          <li className={styles.element} key={el.id}>
            <Link to={`/recipe/${el.title}`} state={{ id: el.id }}>
              <div className={styles.favorContainer}>
                <img
                  className={styles.img}
                  src={el.image}
                  alt={el.title}
                  width="157px"
                  height="157px"
                />
                <button
                  onClick={(event) => favorClickHandler(event, el)}
                  className={styles.favorBtn}
                >
                  <Favorite
                    className={cn({
                      [styles.fill]: window.localStorage.getItem(el.id),
                    })}
                  />
                </button>
              </div>

              <div className={styles.infoPanel}>
                <h4>{el.title}</h4>
                <div className={styles.mainInfo}>
                  <div className="">
                    <p>
                      <span>Servings: </span>
                      {el.servings} pcs
                    </p>
                    <p>
                      <span>Ready in: </span>
                      {el.readyInMinutes} min
                    </p>
                  </div>

                  <GiKnifeFork size={22} />
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};
