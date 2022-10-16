import { Button, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import RecordRTC, { MediaStreamRecorder } from "recordrtc";

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

export default function Transcript(): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string>();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
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
        setInterval(() => {
          recordRTC.stopRecording(() => {
            id += 1;
            recordRTC.startRecording();
          });
        }, 5000);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const stopRecording = () => {
    console.log("stopButton clicked");

    // gumStream?.getAudioTracks()[0].stop();
    recordRTC.stopRecording();
  };

  return (
    <VStack>
      <Button disabled={!isConnected} onClick={wavRecord}>
        start
      </Button>
      <Button onClick={stopRecording}>stop</Button>
      <Button onClick={sendPing}>ping</Button>
      <pre>{JSON.stringify({ isConnected, lastPong }, null, 2)}</pre>
    </VStack>
  );
}
