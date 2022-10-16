import { chakra, Box, VStack } from "@chakra-ui/react";
import React from "react";
import io from "socket.io-client";
import RecordRTC from "recordrtc";

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

export function Tag({ children }: { children: string[] }) {
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

export function TranscriptItem({
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

export default function Transcript({ complete }): JSX.Element {
  return (
    <VStack spacing={2} width={"100%"} pt={10}>
      {complete?.map((d) =>
        d.result.segments.map((s) => (
          <TranscriptItem data={s} key={s.id} complete />
        ))
      )}
    </VStack>
  );
}
