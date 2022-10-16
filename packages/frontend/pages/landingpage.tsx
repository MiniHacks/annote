import { NextPage } from "next";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Image,
  Center,
} from "@chakra-ui/react";

import React from "react";
import PageLayout from "../components/Layout/PageLayout";

const NavBar = (): JSX.Element => {
  return (
    <Box backgroundColor={"blackAlpha.900"} color={"white"} px={"5%"} py={3}>
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
    <Box backgroundColor={"yellow.50"} minHeight={"100vh"}>
      <NavBar />
      <Box>
        <VStack minHeight={"200px"} justifyContent={"center"}>
          <Heading
            style={{
              textAlign: "center",
            }}
          >
            What a great day to take annote.
          </Heading>
          <Box>
            Annote. Live transcription and summarization in your all-in-one
            digital notebook.
          </Box>
        </VStack>
      </Box>
      <Center>
        <Image
          htmlHeight={"60%"}
          htmlWidth={"60%"}
          src={"https://i.imgur.com/V27w0oH.png"}
          alt={"Download on the app store."}
        />
      </Center>
      <Center>
        <Image
          htmlHeight={"100px"}
          htmlWidth={"200px"}
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
          }
          alt={"Download on the app store."}
        />
      </Center>
    </Box>
  );
};

export default Home;