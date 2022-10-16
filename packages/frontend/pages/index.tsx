import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import PageLayout from "../components/Layout/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout title={"Annote: your live class assistant"}>
      <Box px={[5, 10]}>
        <Heading as={"h1"}>Annote.</Heading>
      </Box>
    </PageLayout>
  );
};

export default Home;
