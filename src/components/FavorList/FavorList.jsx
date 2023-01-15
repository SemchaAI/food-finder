import React from "react";
import { selectFavorList } from "../../features/favorList/favorListSlice";
import { FoodList } from "../../features/foodList/FoodList";

export const FavorList = () => {
  return (
    <>
      <h3>Your favorite recipes</h3>
      <FoodList selector={selectFavorList} action={null} />
    </>
  );
};
