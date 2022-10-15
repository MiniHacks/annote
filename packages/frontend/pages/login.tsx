import type { NextPage } from "next";
import { FcGoogle } from "react-icons/fc";
import {
  Flex,
  Box,
  Center,
  Stack,
  Link,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
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
          <Button colorScheme={"whiteAlpha"} variant={"ghost"}>
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
  if (status === "authenticated") {
    window.location.href = "/profile";
  }
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
              <SimpleCard />
            </Heading>
          </VStack>
        </Box>
      </Box>
    </PageLayout>
  );
};

function GoogleButton() {
  return (
    <Center p={2}>
      <Button
        backgroundColor={"white"}
        onClick={() => signIn("google")}
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}

function SimpleCard() {
  return (
    <Flex
      minH={"25vh"}
      rounded={"lg"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("blackAlpha.900", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={7}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} color={"whiteAlpha.900"}>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"whiteAlpha.800"}>
            to view your annotes and{" "}
            <Link color={"whiteAlpha.800"} textDecoration={"underline"}>
              more!
            </Link>
            ✎
          </Text>
        </Stack>
        <Box>
          <Stack>
            <GoogleButton />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Home;
