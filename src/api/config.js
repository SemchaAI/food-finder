const BASE_URL = "https://api.spoonacular.com/";
const API_KEY = "&apiKey=9142eed7f5e24b3691eb9ca87453ad5e";

export const RANDOM_COUNTRIES = BASE_URL + "recipes/random?number=12" + API_KEY;

export const complexSearch = (search, tags) => {
  console.log(
    BASE_URL +
      "recipes/complexSearch?query=" +
      search +
      "&tags=" +
      tags +
      API_KEY
  );
  return (
    BASE_URL +
    "recipes/complexSearch?query=" +
    search +
    "&tags=" +
    tags +
    API_KEY
  );
};

export const SearchById = (id) =>
  BASE_URL + "recipes/" + id + "/information?" + API_KEY;

// export const searchByCountry = (name) => BASE_URL + "name/" + name;

// export const filterByCode = (codes) => BASE_URL + "alpha?codes=" + codes; //+ codes.join(",");

//https://api.spoonacular.com/recipes/complexSearch?query=pasta&tags=vegan&apiKey=9142eed7f5e24b3691eb9ca87453ad5e
//https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
