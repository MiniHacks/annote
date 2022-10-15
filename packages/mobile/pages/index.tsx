import type { NextPage } from "next";
import dynamic from "next/dynamic";
import PageLayout from "../components/Layout/PageLayout";

const PenCanvas = dynamic(() => import("../components/PenCanvas"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
      <PenCanvas />
    </PageLayout>
  );
};

export default Home;
