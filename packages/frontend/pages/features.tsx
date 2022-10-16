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
} from "@chakra-ui/react";

import React from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import PageLayout from "../components/Layout/PageLayout";

// Replace test data with your own
const features = Array.apply(null, Array(1)).map((x, i) => {
  return {
    id: i,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

function GridListWithHeading() {
  return (
    <Box p={3}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>This is the headline</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>
      <Box
        justifyContent={"left"}
        as={"button"}
        margin={"20px !important"}
        maxWidth={"300px"}
        height={"40vh"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
      >
        <Container maxW={"6xl"} mt={1}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 1 }} spacing={10}>
            {features.map((feature) => (
              <HStack key={feature.id} align={"top"}>
                <Box color={"green.400"} px={2} />
                <VStack align={"start"}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={"gray.600"}>{feature.text}</Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
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
    <PageLayout title={"geese, by minihacks"}>
      <Box backgroundColor={"yellow.50"} minHeight={"100vh"}>
        <NavBar />
        <GridListWithHeading />
      </Box>
    </PageLayout>
  );
};

export default Home;
