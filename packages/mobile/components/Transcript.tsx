import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RecordRTC, { MediaStreamRecorder } from "recordrtc";
import { clearInterval } from "timers";
import { useRouter } from "next/router";
import { Storage } from "@capacitor/storage";
import getAPI from "../getAPI";
import { FolderType } from "../pages/dashboard";

const NUM = 8;

let recordRTC: RecordRTC;

const socket = io(process.env.NEXT_PUBLIC_IO_URL ?? "");

const constraints = {
  audio: true,
  video: false,
};

type Segment = {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
  prefix?: number;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

type TranscriptData = {
  time: number;
  result: {
    text: string;
    segments: Segment[];
    language: string;
  };
  file: string;
};

let interval: NodeJS.Timeout;

function Tag({ children }: { children: string[] }) {
  return (
    <Box
      style={{
        width: "100px",
        textAlign: "center",
        padding: "2px 4px",
        borderRadius: "4px",
        backgroundColor: "rgba(0,0,0,0.025)",
        fontSize: "12px",
        fontFamily: "monospace",
        marginLeft: "10px",
      }}
    >
      {children}
    </Box>
  );
}

function TranscriptItem({
  data,
  complete,
}: {
  data: Segment;
  complete?: boolean;
}) {
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        fontWeight: complete ? 400 : 200,
        fontSize: complete ? "14px" : "12px",
        opacity: complete ? 1 : 0.5,
      }}
    >
      <Box
        style={{
          width: "10%",
          minWidth: "120px",
          opacity: complete ? 1 : 0,
        }}
        display={"flex"}
      >
        <Tag>
          {formatTime((data?.prefix ?? 0) + data.start)} -{" "}
          {formatTime((data?.prefix ?? 0) + data.end)}
        </Tag>
      </Box>
      <Box>{data.text}</Box>
    </Box>
  );
}

export default function Transcript(): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [completeData, setCompleteData] = useState<TranscriptData[]>([]);
  const [inProgressData, setInProgressData] = useState<TranscriptData[]>([]);

  const [folders, setFolders] = useState<FolderType[]>([]);

  const [hasEnded, setHasEnded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Storage.get({ key: "name" }).then(({ value: name }) => {
      getAPI(name ?? "")
        .get("/dashboard")
        .then((data) => {
          setFolders(data.folders);
        });
    });

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("tiny_data", (data) => {
      if (hasEnded) return;
      setInProgressData((pv) => [...pv, data]);
    });

    socket.on("complete_data", (data) => {
      if (hasEnded) return;
      setCompleteData((pv) => [...pv, data]);
      setInProgressData([]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("tiny_data");
      socket.off("complete_data");
    };
  }, [hasEnded]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const startRecording = () => {
  //   recordRTC = new MicrophoneStream();
  //
  //   navigator.mediaDevices
  //     .getUserMedia(constraints)
  //     .then((stream: MediaStream) => {
  //       recordRTC.setStream(stream);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //     });
  //
  //   recordRTC.on("data", (chunk) => {
  //     // const raw = MicrophoneStream.toRaw(chunk);
  //     console.log(chunk);
  //     socket.emit("buf", chunk);
  //   });
  // };

  const wavRecord = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => {
        let id = 1;
        recordRTC = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm",
          desiredSampRate: 16000, // accepted sample rate by Azure
          timeSlice: 1000,
          ondataavailable: (blob) => {
            socket.emit("stream_audio", { blob, id }); // sends blob to server
            // console.log("sent blob");
          },
          recorderType: MediaStreamRecorder,
          numberOfAudioChannels: 1,
        });
        recordRTC.startRecording();
        interval = setInterval(() => {
          recordRTC.stopRecording(() => {
            socket.emit("done_with_segment", {
              id,
              is_final: id % NUM === 0,
              num: NUM,
            });
            id += 1;
            recordRTC.startRecording();
          });
        }, 10000 / NUM);
      });
  };

  const router = useRouter();

  const stopRecording = async () => {
    // console.log("stopButton clicked");

    // gumStream?.getAudioTracks()[0].stop();
    recordRTC?.stopRecording();
    if (interval)
      try {
        clearInterval(interval);
      } catch (e) {
        console.log(e);
      }

    // get name from storage
    const { value: name } = await Storage.get({ key: "name" });

    await getAPI(name ?? "").post("/save", {
      transcript: completeData,
      image: document.querySelector("canvas")?.toDataURL(),
    });

    router.push("/dashboard");
  };

  const complete = completeData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.result.text === value.result.text)
  );

  let currentPrefix = 0;
  for (let i = 0; i < complete.length; i++) {
    const start = currentPrefix;
    for (let j = 0; j < complete[i].result.segments.length; j++) {
      complete[i].result.segments[j].prefix = start;
      currentPrefix = complete[i].result.segments[j].end + start;
    }
  }

  const inProgress = inProgressData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.result.text === value.result.text)
  );

  let inProgressText = "";
  for (let i = 0; i < inProgress.length; i++) {
    inProgressText += inProgress[i].result.text;
  }

  return (
    <VStack spacing={2} width={"100%"}>
      <HStack spacing={2} justifyContent={"center"} width={"100%"} mt={4}>
        <Button
          disabled={!isConnected}
          onClick={wavRecord}
          colorScheme={"teal"}
          display={!isRecording ? "block" : "none"}
        >
          start recording
        </Button>
        <Button
          onClick={() => {
            setHasEnded(true);
            onOpen();
          }}
          display={isRecording ? "block" : "none"}
        >
          stop recording
        </Button>
        <Modal onClose={stopRecording} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Recording has ended.</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Select
                  variant={"outline"}
                  placeholder={folders[0]?.name ?? ""}
                >
                  {folders.map((folder) => (
                    <option value={folder.name}>{folder.name}</option>
                  ))}
                </Select>
                <Input placeholder={"Enter a name for this recording"} />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={stopRecording} colorScheme={"teal"}>
                Continue
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
      {complete.map((d) =>
        d.result.segments.map((s) => (
          <TranscriptItem data={s} key={s.id} complete />
        ))
      )}
      <Text
        style={{
          textAlign: "left",
          width: "100%",
          fontWeight: 300,
          fontSize: "12px",
          marginLeft: 50,
          opacity: 0.5,
        }}
      >
        {inProgressText}
      </Text>
    </VStack>
  );
}
