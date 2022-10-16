import type { NextPage } from "next";

import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  useColorModeValue,
} from "@chakra-ui/react";

import { useSession, signOut } from "next-auth/react";

import PageLayout from "../components/Layout/PageLayout";

function SocialProfileWithImage() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <Center py={6}>
      <Box
        maxW={"350px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        rounded={"md"}
        overflow={"hidden"}
        _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
      >
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              Welcome back, {session?.user?.name}
            </Heading>
            <Text color={"gray.500"} />
          </Stack>

          <Button
            w={"full"}
            mt={2}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={() => window.open("http://localhost:3000/dashboard")}
          >
            View annotes
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

const NavBar = (): JSX.Element => {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <Box
      style={{
        position: "sticky",
        top: "0",
      }}
      backgroundColor={"blackAlpha.900"}
      color={"white"}
      px={"5%"}
      py={3}
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
            onClick={() => window.open("http://localhost:3000/landingpage")}
            colorScheme={"whiteAlpha"}
            variant={"ghost"}
          >
            Download
          </Button>
          <Menu>
            <MenuButton as={Button} colorScheme={"whiteAlpha"}>
              Your Account
            </MenuButton>
            <MenuList
              backgroundColor={"blackAlpha.900"}
              _hover={{
                backgroundColor: "blackAlpha.900",
              }}
            >
              <MenuGroup title={session?.user?.name}>
                <MenuItem
                  _hover={{
                    backgroundColor: "blackAlpha.800",
                  }}
                >
                  My Account
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: "blackAlpha.800",
                  }}
                  onClick={() => window.open("http://localhost:3000/dashboard")}
                >
                  Dashboard{" "}
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: "blackAlpha.800",
                  }}
                  onClick={() => signOut()}
                >
                  Log out
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </Box>
  );
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  // if user is not logged in, redirect to login page
  if (status === "unauthenticated") {
    window.location.href = "/login";
  }
  console.log(status);
  return (
    <PageLayout title={"Annote: your live class assistant"}>
      <Box backgroundColor={"yellow.50"} minHeight={"100vh"}>
        <NavBar />
        <Box>
          <VStack minHeight={"500px"} justifyContent={"center"}>
            <Heading
              style={{
                textAlign: "center",
              }}
            >
              <SocialProfileWithImage />
            </Heading>
          </VStack>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Home;
