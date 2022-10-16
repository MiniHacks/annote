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
        width={"40px"}
        backgroundColor={"gray.400"}
        borderRadius={"50%"}
      >
        <BiSearchAlt2 />
      </InputLeftElement>
      <Input
        color={"white"}
        placeholder={"Search for notes"}
        _placeholder={{ color: "white" }}
        width={"0"}
        borderRadius={"20px"}
        backgroundColor={"gray.400"}
        transition={"width 0.5s ease-in-out, padding 0.1s 0.25s ease-in"}
        paddingLeft={"24px"}
        height={"40px"}
        border={"none"}
        _focus={{
          width: "400px",
          paddingLeft: "40px",
          transition: "width 0.5s ease-in-out, padding 0.1s 0s ease-in",
        }}
      />
    </InputGroup>
  );
};

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box
        justifyContent={"start"}
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
