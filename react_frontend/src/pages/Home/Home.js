import React from "react";
import Tutorial from "./sections/Tutorial";
import Hero from "./sections/Hero";
import Footer from "../../layouts/Footer";
import Action from "./sections/Action";
const Home = () => {
  return (
    <>
      <Action />
      <Hero />
      <Tutorial />
      <Footer />
    </>
  );
};

export default Home;
