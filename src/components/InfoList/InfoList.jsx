import React, { useEffect } from "react";
import styles from "./infoList.module.css";

import { ReactComponent as Clock } from "../../assets/icon-clock.svg";
import { Tag } from "../Tag/Tag";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadByID,
  selectControls,
  selectInfo,
} from "../../features/controls/controlsSlice";
export const InfoList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const controlsList = useSelector(selectControls);
  const info = useSelector(selectInfo);
  const id = location.state.id;

  console.log(location.state);

  console.log(info);
  console.log(id);
  useEffect(() => {
    console.log("eff");
    if (id !== info.id) {
      dispatch(loadByID(id));
      console.log(info);
    }
  }, []);

  const {
    image,
    title,
    readyInMinutes,
    summary,
    vegetarian,
    vegan,
    glutenFree,
    cheap,
    veryPopular,
    instructions,
    uniqIngridients,
  } = info;

  return (
    <div className={styles.infoList}>
      {controlsList.error && <h2>cant fetch data</h2>}
      {controlsList.statusID === "loading" && <h2>Loading</h2>}
      {controlsList.statusID === "received" && (
        <>
          <img src={`${image}`} alt={`${title}`} width="100%" />
          <div>
            <div className={styles.title}>
              <h3>{title}</h3>
              <Clock />
            </div>
            <div className={styles.time}>
              <div>Time :</div>
              <div>{readyInMinutes} min</div>
            </div>
            <div className={styles.tags}>
              {vegetarian && <Tag text="vegetarian" />}
              {vegan && <Tag text="vegan" />}
              {glutenFree && <Tag text="glutenFree" />}
              {cheap && <Tag text="cheap" />}
              {veryPopular && <Tag text="popular" />}
            </div>
            <ul className={styles.ingridients}>
              <h4>Ingridients :</h4>
              {uniqIngridients.map((ingridient) => (
                <li key={ingridient}>{ingridient}</li>
              ))}
            </ul>
            <article className={styles.article}>
              <h4>Info :</h4>
              <p dangerouslySetInnerHTML={{ __html: summary }}></p>
            </article>
            <article className={styles.instructions}>
              <h4>Instructions Step-By-Step :</h4>
              <ul>
                {instructions.map((step, index) => (
                  <li key={step}>
                    <span>Step {index + 1} :</span> {step}.
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </>
      )}
    </div>
  );
};
