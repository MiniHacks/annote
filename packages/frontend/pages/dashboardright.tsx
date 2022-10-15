import type { NextPage } from "next";
import { Box, Button, HStack } from "@chakra-ui/react";
import { BiSearchAlt2 } from "react-icons/bi";
import PageLayout from "../components/Layout/PageLayout";
import Card from "./Card";

const NewNote = (): JSX.Element => {
  return (
    <Button
      justifyContent={"left"}
      mx={"20px !important"}
      backgroundColor={"#282828"}
      color={"white"}
      borderRadius={"20px"}
      _hover={{ bg: "black" }}
      _active={{ bg: "black" }}
      onClick={() => window.open("https://anshpa.tel")}
    >
      + New Note
    </Button>
  );
};
const Search = (): JSX.Element => {
  return (
    <Button
      justifyContent={"left"}
      backgroundColor={"gray"}
      color={"white"}
      borderRadius={"30px"}
      _hover={{ bg: "gray.500" }}
      _active={{ bg: "gray.500" }}
      onClick={() => window.open("https://anshpa.tel")}
      rightIcon={<BiSearchAlt2 />}
    >
      {" "}
    </Button>
  );
};

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box
        backgroundColor={"yellow.50"}
        minHeight={"100vh"}
        px={"10px"}
        py={"10px"}
      >
        <HStack spacing={0}>
          <NewNote />
          <Search />
        </HStack>
        <HStack wrap={"wrap"} spacing={0}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </HStack>
      </Box>
    </PageLayout>
  );
};

export default Home;
