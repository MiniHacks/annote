import { Button, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import RecordRTC, { MediaStreamRecorder } from "recordrtc";
import { clearInterval } from "timers";

const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

let recordRTC: RecordRTC;

const socket = io(process.env.NEXT_PUBLIC_IO_URL ?? "");

const constraints = {
  audio: true,
  video: false,
};

type TranscriptData = {
  result: {
    text: string;
  };
};

let interval: Timer;

export default function Transcript(): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [completeData, setCompleteData] = useState<TranscriptData[]>([]);
  const [inProgressData, setInProgressData] = useState<TranscriptData[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("tiny_data", (data) => {
      setInProgressData((pv) => [...pv, data]);
    });

    socket.on("complete_data", (data) => {
      setCompleteData((pv) => [...pv, data]);
      setInProgressData([]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

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
            console.log("sent blob");
          },
          recorderType: MediaStreamRecorder,
          numberOfAudioChannels: 1,
        });
        recordRTC.startRecording();
        interval = setInterval(() => {
          recordRTC.stopRecording(() => {
            socket.emit("done_with_segment", {
              id,
              is_final: id % 4 === 0,
              num: 4,
            });
            id += 1;
            recordRTC.startRecording();
          });
        }, 8000);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const stopRecording = () => {
    console.log("stopButton clicked");

    // gumStream?.getAudioTracks()[0].stop();
    recordRTC?.stopRecording();
    clearInterval(interval);
  };

  const complete = completeData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.result.text === value.result.text)
  );

  const inProgress = inProgressData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.result.text === value.result.text)
  );

  return (
    <VStack spacing={2}>
      <Button disabled={!isConnected} onClick={wavRecord}>
        start
      </Button>
      <Button onClick={stopRecording}>stop</Button>
      <Button onClick={sendPing}>ping</Button>
      {complete.map((d) => (
        <Text key={d.result.text}>{d.result.text}</Text>
      ))}
      {inProgress.map((d) => (
        <Text fontWeight={200} key={d.result.text}>
          {d.result.text}
        </Text>
      ))}
    </VStack>
  );
}
