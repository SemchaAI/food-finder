import React, { useCallback, useEffect, useState } from "react";
import styles from "./search.module.css";
import stylesFromFoodList from "../../features/foodList/foodList.module.css";
import { ReactComponent as IconSearch } from "../../assets/icon-search.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSearchList,
  selectControls,
  selectList,
  selectSearch,
  selectTag,
  setClearControls,
  setSearch,
  setTag,
} from "../../features/controls/controlsSlice";

import Select from "react-select";

import _ from "lodash";
import { Link } from "react-router-dom";

export const Search = () => {
  //Custom select styles//
  const style = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--colors-bg)",
      color: "var(--colors-text)",
      borderRadius: "var(--radii)",
      padding: "0.25rem",
      border: "none",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      height: "52px",
      margin: "15px 0px 0px 10px",
      minWidth: "100px",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: "var(--colors-text)",
      backgroundColor: "var(--colors-bg)",
    }),
  };

  const dispatch = useDispatch();

  const controlsList = useSelector(selectControls);
  const search = useSelector(selectSearch);
  const tag = useSelector(selectTag);
  const list = useSelector(selectList);

  // console.log(search);
  // console.log(list);

  const [state, setState] = useState("");
  const [debouncedState, setDebouncedState] = useState("");

  const handleChange = (e) => {
    setState(e.target.value);
    debounce(e.target.value);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     setDebouncedState(e.target.value);
  //   }
  // };

  const debounce = useCallback(
    _.debounce((_searchVal) => {
      setDebouncedState(_searchVal);
      // send the server request here
      dispatch(setSearch(_searchVal));
    }, 2000),
    []
  );

  const optionsMap = {
    All: { value: "", label: "All" },
    vegan: { value: "vegan", label: "Vegan" },
    glutenFree: { value: "glutenFree", label: "Gluten Free" },
    popular: { value: "popular", label: "Popular" },
    cheap: { value: "cheap", label: "Cheap" },
  };
  const options = Object.values(optionsMap);

  const optionTag = useSelector(selectTag);
  // console.log(region);

  const tagHandler = (e) => {
    console.log(e.value);
    dispatch(setTag(e.value));
  };

  useEffect(() => {
    console.log("useEff");
    console.log(search, tag);
    if (search === "" && tag === "") {
    } else {
      dispatch(loadSearchList({ search, tag }));
      dispatch(setClearControls());
    }
    //dispatch(setClear());
  }, [dispatch, search, tag]);
  return (
    <div>
      <div className={styles.controlsContainer}>
        <div className={styles.inputContainer}>
          <IconSearch className={styles.fill} />
          <input
            className={styles.input}
            placeholder="Search for a recipe..."
            onChange={handleChange}
            type="text"
            // onKeyDown={handleKeyPress}
            defaultValue={search || ""}
          />
        </div>
        <Select
          styles={style}
          options={options}
          placeholder="tags"
          isSearchable={false}
          value={optionsMap[optionTag] || ""}
          onChange={(e) => tagHandler(e)}
        />
      </div>
      {controlsList.error && <h2>cant fetch data</h2>}
      {controlsList.status === "loading" && <h2>Loading</h2>}
      {controlsList.status === "received" && (
        <ul className={stylesFromFoodList.list}>
          {list.map((el) => (
            <li
              key={el.id}
              className={`${stylesFromFoodList.element} ${styles.element}`}
            >
              <Link to={`/recipe/${el.title}`} state={{ id: el.id }}>
                <img
                  src={el.image}
                  alt={el.title}
                  width="157px"
                  height="157px"
                />
                <p
                  className={`${stylesFromFoodList.infoPanel} ${styles.infoPanel}`}
                >
                  {el.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
