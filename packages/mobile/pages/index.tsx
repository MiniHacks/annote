import type { NextPage } from "next";
import PageLayout from "../components/Layout/PageLayout";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <PageLayout title={"Annote. your live assistant"}>
      <Navbar />
    </PageLayout>
  );
};

export default Home;
