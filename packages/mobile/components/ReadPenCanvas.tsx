/* eslint-disable */
// @ts-nocheck
import React from "react";
import { chakra } from "@chakra-ui/react";

type Point = {
  x: number;
  y: number;
  lineWidth: number;
  color: string;
};

type Stroke = Point[];

const ReadPenCanvas = ({ img }) => {
  return (
    <div>
      <style>{`
      body { background-color: #FDFFED }
      `}</style>
      <chakra.div
        style={{
          background:
            "repeating-linear-gradient(#FDFFED, #FDFFED 25px, #E9EBDA 26px, #E9EBDA 27px)",
        }}
      >
        <chakra.img
          src={
            img ??
            "https://test.annote.live/5547d5cc-f5c7-4d0a-a4da-b658266dba8f.png"
          }
        />
      </chakra.div>
    </div>
  );
};

export default ReadPenCanvas;
