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
    <Box
      backgroundColor={"black"}
      color={"white"}
      px={"5%"}
      py={3}
      position={"sticky"}
      top={"0"}
    >
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
            Sign up
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
    <Box backgroundColor={"whiteAlpha.50"} minHeight={"100vh"}>
      <NavBar />
      <Box
        style={{
          backgroundImage: "url(https://i.imgur.com/T45byG9.png",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box>
          <VStack justifyContent={"start"} paddingTop={"30px"}>
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
            htmlHeight={"50%"}
            htmlWidth={"50%"}
            src={"https://i.imgur.com/8tYEs8l.png"}
            alt={"ipad image"}
          />
        </Center>
        <Center>
          <Image
            htmlHeight={"50px"}
            htmlWidth={"70px"}
            paddingRight={"10px"}
            src={"https://i.imgur.com/xIJEHn9.png"}
            alt={"Download on the app store."}
            paddingBottom={"50px"}
          />
          <Image
            htmlHeight={"100px"}
            htmlWidth={"200px"}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
            }
            alt={"Download on the app store."}
            paddingBottom={"50px"}
          />
        </Center>
      </Box>
      <HStack
        spacing={0}
        style={{
          height: "60vh",
          justifyContent: "start",
          alignItems: "center",
          flex: "display",
          flexDirection: "row",
          color: "white",
        }}
      >
        {/* top left box */}
        <Box
          width={"60%"}
          height={"65vh"}
          backgroundColor={"blackAlpha.800"}
          textAlign={"left"}
          paddingTop={"5%"}
          px={"175px"}
        >
          <Heading>Text-to-Speech Recognition</Heading>
          <Box>Test</Box>
        </Box>
        {/* top right box */}
        <Box
          width={"40%"}
          height={"65vh"}
          backgroundColor={"blackAlpha.800"}
          py={"55px"}
          px={"40px"}
        >
          <Image
            htmlHeight={"370px"}
            htmlWidth={"370px"}
            src={"https://i.imgur.com/uvdhlJl.png"}
            alt={"ipad image"}
          />
        </Box>
      </HStack>

      <HStack
        spacing={0}
        style={{
          height: "65vh",
          width: "100%",
          justifyContent: "start",
          flex: "display",
          flexDirection: "row",
          color: "white",
        }}
      >
        {/* bottom left box */}
        <Box
          width={"60%"}
          height={"65vh"}
          backgroundColor={"white"}
          px={"100px"}
          py={"55px"}
        >
          <Image
            htmlHeight={"600px"}
            htmlWidth={"600px"}
            src={"https://i.imgur.com/DlYG3Fe.jpeg"}
            alt={"ipad image"}
          />
        </Box>
        <Box
          width={"40%"}
          height={"65vh"}
          color={"black"}
          backgroundColor={"white"}
          paddingTop={"10%"}
          fontFamily={"Lato"}
        >
          <Heading>AI Generated Summaries</Heading>
          <Box>We generate one line and in-depth summaries using AI.</Box>
          {/* bottom right box */}
        </Box>
      </HStack>
      {/* this that shit that dont counr */}
      <HStack
        spacing={0}
        style={{
          height: "60vh",
          justifyContent: "start",
          alignItems: "center",
          flex: "display",
          flexDirection: "row",
          color: "white",
        }}
      >
        {/* top left box */}
        <Box
          width={"60%"}
          height={"65vh"}
          backgroundColor={"black"}
          textAlign={"left"}
          paddingTop={"5%"}
          px={"175px"}
        >
          <Heading>Replayable Recording</Heading>
          <Box>Test</Box>
        </Box>
        {/* top right box */}
        <Box
          width={"40%"}
          height={"65vh"}
          backgroundColor={"black"}
          py={"70px"}
          px={"40px"}
        >
          <Image
            htmlHeight={"100%"}
            htmlWidth={"100%"}
            borderColor={"black"}
            src={"https://i.imgur.com/m32iiky.png"}
            alt={"ipad image"}
          />
        </Box>
      </HStack>

      <HStack
        spacing={0}
        style={{
          height: "65vh",
          width: "100%",
          justifyContent: "start",
          flex: "display",
          flexDirection: "row",
          color: "white",
        }}
      >
        {/* bottom left box */}
        <Box
          width={"60%"}
          height={"65vh"}
          backgroundColor={"white"}
          px={"100px"}
          py={"55px"}
        >
          <Image
            htmlHeight={"600px"}
            htmlWidth={"600px"}
            src={"https://i.imgur.com/DlYG3Fe.jpeg"}
            alt={"ipad image"}
          />
        </Box>
        <Box
          width={"40%"}
          height={"65vh"}
          color={"black"}
          backgroundColor={"white"}
          paddingTop={"10%"}
          fontFamily={"Lato"}
        >
          <Heading>AI Generated Summaries</Heading>
          <Box>We generate one line and in-depth summaries using AI.</Box>
          {/* bottom right box */}
        </Box>
      </HStack>
    </Box>
  );
};

export default Home;
