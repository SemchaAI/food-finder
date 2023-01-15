import React from "react";
import { Banner } from "../components/Banner/Banner";
import { RandomRecipes } from "../components/RandomRecipes/RandomRecipes";

export const Home = () => {
  return (
    <section>
      <Banner></Banner>
      <RandomRecipes />
    </section>
  );
};
