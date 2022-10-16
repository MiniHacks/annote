import { Box, Center, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";

export default function Hero(): JSX.Element {
  return (
    <Box position={"relative"}>
      <Image
        src={"/images/background.png"}
        alt={""}
        style={{
          minWidth: "100vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
          opacity: 0.1,
        }}
      />
      <Box>
        <VStack justifyContent={"start"} paddingTop={"30px"}>
          <Heading
            style={{
              textAlign: "center",
              paddingBottom: "20px",
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
          src={"/images/hero.png"}
          alt={"ipad image"}
        />
      </Center>
      <Center id={"features"}>
        <Image
          height={"60px"}
          width={"60px"}
          src={"/images/lgoo.png"}
          alt={"Download on the app store."}
          borderRadius={"12px"}
          marginTop={"-50px"}
          marginRight={"10px"}
        />
        <Image
          htmlHeight={"100px"}
          htmlWidth={"200px"}
          src={"/images/applestore.svg"}
          alt={"Download on the app store."}
          paddingBottom={"50px"}
        />
      </Center>
    </Box>
  );
}
