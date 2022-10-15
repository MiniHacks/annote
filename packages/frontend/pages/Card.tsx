import Image from "next/image";
import { Box, Heading, Text, Stack, useColorModeValue } from "@chakra-ui/react";

export default function Cards() {
  return (
    <Box
      justifyContent={"left"}
      as={"button"}
      margin={"20px !important"}
      maxWidth={"300px"}
      height={"50vh"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      onClick={() => window.open("https://anshpa.tel")}
    >
      <Box h={"285px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"top"} />
      <Stack>
        <Text
          color={"gray.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"10px"}
          letterSpacing={1.1}
        >
          October 15, 2022
        </Text>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"20px"}
          fontFamily={"body"}
        >
          Projectile Motion
        </Heading>
        <Text color={"gray.500"} fontSize={"15px"}>
          Summary
        </Text>
      </Stack>
    </Box>
  );
}
