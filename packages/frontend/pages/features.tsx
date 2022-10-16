import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Button,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

import React from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import PageLayout from "../components/Layout/PageLayout";

// Replace test data with your own
const TitleFeatures = (): JSX.Element => {
  return (
    <Box>
      <Text
        py={5}
        textAlign={"center"}
        color={"black"}
        fontSize={"lg"}
        fontWeight={"normal"}
        mt={2}
      >
        Here are some of the features we have to offer
      </Text>
    </Box>
  );
};

const FeatureBoxes = (): JSX.Element => {
  return (
    <HStack justifyContent={"center"}>
      <Box
        alignItems={"start"}
        justifyContent={"left"}
        display={"flex"}
        flexDirection={"column"}
        as={"button"}
        margin={"20px !important"}
        maxWidth={"300px"}
        w={"full"}
        height={"500px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        rounded={"md"}
        p={0}
        overflow={"hidden"}
        _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
        onClick={() => window.open("https://anshpa.tel")}
      >
        <Stack textAlign={"left"} p={4}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"20px"}
            width={"100%"}
          >
            Speech to Text
          </Heading>
          <Text color={"gray.500"} fontSize={"15px"} width={"100%"}>
            The deets
          </Text>
        </Stack>
      </Box>
      <Box
        alignItems={"start"}
        justifyContent={"left"}
        display={"flex"}
        flexDirection={"column"}
        as={"button"}
        margin={"20px !important"}
        maxWidth={"300px"}
        w={"full"}
        height={"500px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        rounded={"md"}
        p={0}
        overflow={"hidden"}
        _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
        onClick={() => window.open("https://anshpa.tel")}
      >
        <Stack textAlign={"left"} p={4}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"20px"}
            width={"100%"}
          >
            Lecture Recordings
          </Heading>
          <Text color={"gray.500"} fontSize={"15px"} width={"100%"}>
            The deets
          </Text>
        </Stack>
      </Box>
      <Box
        alignItems={"start"}
        justifyContent={"left"}
        display={"flex"}
        flexDirection={"column"}
        as={"button"}
        margin={"20px !important"}
        maxWidth={"300px"}
        w={"full"}
        height={"500px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        rounded={"md"}
        p={0}
        overflow={"hidden"}
        _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
        onClick={() => window.open("https://anshpa.tel")}
      >
        <Stack textAlign={"left"} p={4}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"20px"}
            width={"100%"}
          >
            Summarization
          </Heading>
          <Text color={"gray.500"} fontSize={"15px"} width={"100%"}>
            The deets
          </Text>
        </Stack>
      </Box>
      <Box
        alignItems={"start"}
        justifyContent={"left"}
        display={"flex"}
        flexDirection={"column"}
        as={"button"}
        margin={"20px !important"}
        maxWidth={"300px"}
        w={"full"}
        height={"500px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        rounded={"md"}
        p={0}
        overflow={"hidden"}
        _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
        onClick={() => window.open("https://anshpa.tel")}
      >
        <Stack textAlign={"left"} p={4}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"20px"}
            width={"100%"}
          >
            Force Press Definitions
          </Heading>
          <Text color={"gray.500"} fontSize={"15px"} width={"100%"}>
            The deets
          </Text>
        </Stack>
      </Box>
    </HStack>
  );
};

const NavBar = (): JSX.Element => {
  return (
    <Box style={{
      position: "sticky",
      top: "0",
    }}
        backgroundColor={"blackAlpha.900"} color={"white"} px={"5%"} py={3}>
      <HStack justifyContent={"space-between"}>
        <Heading fontSize={"35px"}>Annote.</Heading>
        <HStack>
          <Button
            onClick={() => window.open("http://localhost:3000/features")}
            colorScheme={"whiteAlpha"}
            variant={"ghost"}
          >
            Features
          </Button>
          <Button
            colorScheme={"whiteAlpha"}
            variant={"ghost"}
            onClick={() => window.open("http://localhost:3000/landingpage")}
          >
            Download
          </Button>
          <Button colorScheme={"whiteAlpha"} variant={"solid"}>
            Sign in
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
const Home: NextPage = () => {
  // get user info from session
  const { data: session, status } = useSession();
  // if user is logged in, redirect to profile page
  console.log(status);

  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box backgroundColor={"yellow.50"} minHeight={"100vh"}>
        <NavBar />
        <TitleFeatures />
        <FeatureBoxes />
      </Box>
    </PageLayout>
  );
};

export default Home;
