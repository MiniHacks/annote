import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Box, Button, VStack } from "@chakra-ui/react";
import MicrophoneStream from "microphone-stream";
import PageLayout from "../components/Layout/PageLayout";

const PenCanvas = dynamic(() => import("../components/PenCanvas"), {
  ssr: false,
});
const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

let micStream: MicrophoneStream;

const constraints = {
  audio: true,
  video: false,
};

const Home: NextPage = () => {
  const startRecording = () => {
    micStream = new MicrophoneStream();

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => {
        micStream.setStream(stream);
      })
      .catch((err) => {
        console.warn(err);
      });

    micStream.on("data", (chunk) => {
      // const raw = MicrophoneStream.toRaw(chunk);
      console.log(chunk);
    });
  };

  const stopRecording = () => {
    console.log("stopButton clicked");

    // gumStream?.getAudioTracks()[0].stop();
    micStream.stop();
  };
  return (
    <PageLayout title={"geese, by minihacks"}>
      <Box style={{ display: "flex", height: "100vh" }}>
        <PenCanvas />
        <VStack>
          <Button onClick={startRecording}>start</Button>
          <Button onClick={stopRecording}>stop</Button>
        </VStack>
      </Box>
    </PageLayout>
  );
};

export default Home;
