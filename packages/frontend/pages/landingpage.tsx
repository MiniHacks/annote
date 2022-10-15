import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

import React from "react";
import PageLayout from "../components/Layout/PageLayout";

const NavBar = (): JSX.Element => {
  return (
    <Box backgroundColor={"blackAlpha.900"} color={"white"} px={"5%"} py={3}>
      <HStack justifyContent={"space-between"}>
        <Heading fontSize={"35px"}>Annote.</Heading>
        <HStack>
          <Button colorScheme={"whiteAlpha"} variant={"ghost"}>
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
        <Box>
          <VStack minHeight={"500px"} justifyContent={"center"}>
            <Heading
              style={{
                textAlign: "center",
              }}
            >
              What a great day to take annote.
            </Heading>
          </VStack>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Home;
