import React from "react";
import { FoodList } from "../../features/foodList/FoodList";
import styles from "./randomRecipes.module.css";
import {
  loadFoodList,
  selectFoodList,
} from "../../features/foodList/foodListSlice";
import { useDispatch, useSelector } from "react-redux";

export const RandomRecipes = () => {
  const dispatch = useDispatch();
  const checkList = useSelector(selectFoodList);
  console.log(checkList);
  return (
    <>
      <h3 className={styles.sectionName}>Random Recipes</h3>
      {checkList.status === "rejected" && (
        <h3>
          Sorry, something went wrong. <br />
          This app using free-api.
          <br />
          Maybe daily limit (150requests) is over.
        </h3>
      )}
      <FoodList selector={selectFoodList} action={loadFoodList} />
    </>
  );
};
