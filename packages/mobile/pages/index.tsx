import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import PageLayout from "../components/Layout/PageLayout";

const PenCanvas = dynamic(() => import("../components/PenCanvas"), {
  ssr: false,
});

const Transcript = dynamic(() => import("../components/Transcript"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box style={{ display: "flex", height: "100vh" }}>
        <PenCanvas />
        <Transcript />
      </Box>
    </PageLayout>
  );
};

export default Home;
