import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const NavBar = (): JSX.Element => {
  const router = useRouter();
  return (
    <Box
      backgroundColor={"black"}
      color={"white"}
      px={"5%"}
      py={3}
      position={"sticky"}
      top={"0"}
      zIndex={1}
    >
      <HStack justifyContent={"space-between"}>
        <Heading
          fontSize={"35px"}
          as={"button"}
          onClick={() => router.push("/")}
        >
          Annote.
        </Heading>
        <HStack spacing={4}>
          <Button
            onClick={() => router.push("/#features")}
            colorScheme={"whiteAlpha"}
            variant={"ghost"}
            fontWeight={"400"}
            _hover={{
              backgroundColor: "whiteAlpha.200",
            }}
          >
            Features
          </Button>
          <Button
            colorScheme={"whiteAlpha"}
            variant={"ghost"}
            onClick={() => alert("Coming soon!")}
            fontWeight={"400"}
            _hover={{
              backgroundColor: "whiteAlpha.200",
            }}
          >
            Download
          </Button>
          <Button
            colorScheme={"whiteAlpha"}
            variant={"outline"}
            color={"rgba(255,255,255,0.8)"}
            fontWeight={"500"}
            _hover={{
              backgroundColor: "whiteAlpha.300",
            }}
          >
            Start Now
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
