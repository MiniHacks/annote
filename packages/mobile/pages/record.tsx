import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import PageLayout from "../components/Layout/PageLayout";

const PenCanvas = dynamic(() => import("../components/PenCanvas"), {
  ssr: false,
});

const Transcript = dynamic(() => import("../components/Transcript"), {
  ssr: false,
});

const RecordNavBar = (): JSX.Element => {
  const router = useRouter();
  return (
    <Box
      style={{
        justifyContent: "space-between",
        width: "100%",
        display: "flex",
        background: "#FDFFEE",
        padding: "15px 0 0 0",
        borderBottom: "1px solid #a2a8a0",
      }}
    >
      <HStack width={"33%"}>
        <Box
          as={"button"}
          onClick={() => router.push("/dashboard")}
          pt={0}
          mt={-3}
        >
          <Image
            maxHeight={"25px"}
            width={"25px"}
            src={"/images/CH272pQ.png"}
            alt={"back button"}
          />
        </Box>
      </HStack>

      <HStack width={"34%"} justifyContent={"center"}>
        <Box boxSize={"40px"} opacity={1}>
          <Image
            maxHeight={"25px"}
            width={"25px"}
            src={"/images/wL3ekTA.png"}
            alt={"brush"}
          />
        </Box>
        <Box boxSize={"40px"} opacity={0.15}>
          <Image
            maxHeight={"25px"}
            width={"25px"}
            src={"/images/amTacz7.png"}
            alt={"highlighter"}
          />
        </Box>
        <Box boxSize={"40px"} opacity={0.2}>
          <Image
            maxHeight={"30px"}
            width={"30px"}
            src={"/images/Hl29Jyh.png"}
            alt={"eraser"}
          />
        </Box>
      </HStack>

      <HStack width={"33%"} justifyContent={"end"}>
        <Box boxSize={"40px"}>
          <Image
            maxHeight={"25px"}
            width={"25px"}
            src={"/images/4WDcbvp.png"}
            alt={"undo"}
          />
        </Box>
        <Box boxSize={"40px"}>
          <Image
            maxHeight={"25px"}
            width={"25px"}
            src={"/images/JB6tHc6.png"}
            alt={"redo"}
          />
        </Box>
        <Box boxSize={"40px"}>
          <Image
            maxHeight={"25px"}
            width={"25px"}
            src={"/images/yw8wSmR.png"}
            alt={"menu"}
          />
        </Box>
      </HStack>
    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "50%",
        }}
      >
        <RecordNavBar />
      </Box>
      <Box style={{ display: "flex", maxHeight: "100vh" }}>
        <PenCanvas />
        <Transcript />
      </Box>
    </PageLayout>
  );
};

export default Home;
