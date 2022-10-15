import type { NextPage } from "next";
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSearchAlt2 } from "react-icons/bi";
import PageLayout from "../components/Layout/PageLayout";
import Card from "./Card";
import "@fontsource/roboto-slab/latin-300.css";
import "@fontsource/roboto-slab/latin-400.css";
import "@fontsource/roboto-slab/latin-500.css";
import "@fontsource/roboto-slab/latin-600.css";
import "@fontsource/roboto-slab/latin-700.css";
import "@fontsource/roboto-slab/latin-900.css";

import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";

const NewNote = (): JSX.Element => {
  return (
    <Button
      justifyContent={"center"}
      mx={"25px !important"}
      backgroundColor={"#282828"}
      color={"white"}
      borderRadius={"20px"}
      _hover={{ bg: "black" }}
      _active={{ bg: "black" }}
      fontSize={"15px"}
      px={"40px"}
      onClick={() => window.open("https://anshpa.tel")}
    >
      + New Note
    </Button>
  );
};
const Search = (): JSX.Element => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents={"none"}
        color={"white"}
        fontSize={"1.2em"}
        mx={"10px"}
      >
        <BiSearchAlt2 />
      </InputLeftElement>
      <Input
        placeholder={"  Search for notes"}
        _placeholder={{ color: "white" }}
        width={"0"}
        borderRadius={"20px"}
        backgroundColor={"gray.400"}
        transition={"width 0.5s"}
        _focus={{
          width: "400px",
        }}
        _hover={{
          backgroundColor: "gray.500",
        }}
        _active={{
          backgroundColor: "gray.500",
        }}
      />
    </InputGroup>
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
