import type { NextPage } from "next";
import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Bars from "../components/Bars";

const Home: NextPage = () => {
  return (
    <PageLayout title={"Annote. your live assistant"}>
      <Navbar />
      <Hero />
      <Bars />
    </PageLayout>
  );
};

export default Home;
