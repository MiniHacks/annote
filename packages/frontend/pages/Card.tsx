import Image from "next/image";
import { Box, Heading, Text, Stack, useColorModeValue } from "@chakra-ui/react";

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

export default function Cards() {
  return (
    <Box
      alignItems={"start"}
      justifyContent={"left"}
      display={"flex"}
      flexDirection={"column"}
      as={"button"}
      margin={"20px !important"}
      maxWidth={"300px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
      rounded={"md"}
      p={0}
      overflow={"hidden"}
      _hover={{ boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.2)" }}
      onClick={() => window.open("https://anshpa.tel")}
    >
      <Box h={"310px"} width={"100%"} bg={"gray.100"} mt={-6} mb={6} />
      <Stack textAlign={"left"} p={4}>
        <Text
          color={"gray.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"10px"}
          letterSpacing={1.1}
          width={"100%"}
        >
          October 15, 2022
        </Text>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"20px"}
          width={"100%"}
        >
          Projectile Motion
        </Heading>
        <Text color={"gray.500"} fontSize={"15px"} width={"100%"}>
          Summary
        </Text>
      </Stack>
    </Box>
  );
}
