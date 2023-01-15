import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorList,
  removeFromFavorList,
} from "../features/favorList/favorListSlice";

export const useFoodList = (selector, action) => {
  const dispatch = useDispatch();
  //const favorList = useSelector(selectFavorList);
  const foodList = useSelector(selector);
  //const recipesList = foodExample.recipes;

  const [rerender, setRerender] = useState(false);

  const favorClickHandler = (event, el) => {
    event.preventDefault();
    if (!window.localStorage.getItem(el.id)) {
      console.log("added");
      dispatch(addFavorList(el));
      window.localStorage.setItem(`${el.id}`, el.id);
      setRerender(!rerender);
    } else {
      console.log("removed");
      dispatch(removeFromFavorList(el.id));
      window.localStorage.removeItem(`${el.id}`, el.id);
      setRerender(!rerender);
    }
  };

  useEffect(() => {
    // on deploy without this //&& foodList.list.length === 0
    if (action !== null) {
      // console.log("here");
      dispatch(action());
    }
  }, []);
  return [foodList, favorClickHandler];
};
