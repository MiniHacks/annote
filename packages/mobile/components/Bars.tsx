import { chakra, Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

function Bar({
  leftContent,
  rightContent,
  style,
}: {
  leftContent: JSX.Element;
  rightContent: JSX.Element | null;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "100px 5%",
        minHeight: "300px",
        ...style,
      }}
    >
      <Box>{leftContent}</Box>
      <Box style={{ textAlign: "right" }}>{rightContent}</Box>
    </Box>
  );
}

export default function Bars(): JSX.Element {
  return (
    <Box>
      <Bar
        leftContent={
          <>
            <Heading mb={4}>Never be confused by your notes again.</Heading>
            <Box>Draw, write, and annotate your notes in real-time.</Box>
          </>
        }
        rightContent={
          <chakra.img
            borderRadius={"10px"}
            boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
            src={"/images/tts.png"}
            height={"400px"}
          />
        }
        style={{ backgroundColor: "rgba(0,0,0,0.9)", color: "white" }}
      />
      <Bar
        rightContent={
          <>
            <Heading>AI Generated Summaries</Heading>
            <Box>We generate one line and in-depth summaries using AI.</Box>
          </>
        }
        leftContent={
          <chakra.img
            borderRadius={"10px"}
            boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
            src={"/images/dash.png"}
            height={"400px"}
          />
        }
        style={{ backgroundColor: "white", color: "black" }}
      />
      <Bar
        leftContent={
          <>
            <Heading mb={4}>Replayable Recording</Heading>
            <Box>Search, tag, and review your notes efficiently.</Box>
          </>
        }
        rightContent={
          <chakra.img src={"/images/replay.png"} height={"400px"} />
        }
        style={{ backgroundColor: "rgba(0,0,0,0.9)", color: "white" }}
      />
      <Bar
        rightContent={
          <>
            <Heading>Offline*</Heading>
            <Box>
              It does not rely on any external api, so it can be installed for
              offline use on your laptop!
            </Box>
          </>
        }
        leftContent={<chakra.img src={"/images/dino.png"} height={"150px"} />}
      />
      <Bar
        leftContent={
          <VStack spacing={4} alignItems={"start"} className={"footer"}>
            <style>{`
            .footer a { 
              color: rgba(255,255,255,0.7); 
              text-decoration: underline; 
              text-decoration-style: dashed; 
              text-decoration-color: rgba(255,255,255,0.3);
              
           }
           .footer a:hover {
            color: white;
            text-decoration-color: rgba(255,255,255,0.8);
           }
           
           `}</style>
            <Heading fontSize={"20px"} color={"rgba(255,255,255,0.8)"}>
              Made for HackUIowa 2022
            </Heading>
            <Text>
              Hacked together by <a href={"https://yok.dev"}>Samyok</a>,{" "}
              <a href={"https://anshpa.tel"}>Ansh</a>,{" "}
              <a href={"https://iamstuti.com"}>Stuti</a>, and{" "}
              <a href={"https://www.linkedin.com/in/brandon-nguyen-lam"}>
                Brandon
              </a>
              . We all study at the University of Minnesota, Twin Cities.
            </Text>
            <Text>
              Star us on{" "}
              <a href={"https://github.com/minihacks/annote"}>Github</a> and{" "}
              like us on{" "}
              <a href={"https://devpost.com/software/annote"}>Devpost</a>.
            </Text>
          </VStack>
        }
        rightContent={null}
        style={{
          backgroundColor: "rgba(0,0,0,1)",
          color: "rgba(255,255,255,0.5)",
        }}
      />
    </Box>
  );
}
