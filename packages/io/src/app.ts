// dotenv
const _l = console.log;
console.log = (...params) => _l("\x1b[35m" + "[io]", ...params);

import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import { v4 } from "uuid";
import axios from "axios";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = +(process?.env?.IO_PORT ?? 5001);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world :)");
});

app.post("/save", async (req: Request, res: Response) => {
  // take transcript data and a buffer for the image of the canvas drawing

  const id = v4();
  const transcript = req.body.transcript;
  const image = req.body.image;

  // save the image to a file

  fs.writeFileSync(`./images/${id}.png`, image);

  // save the transcript to mongodb
  // return the id of the transcript
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("ping", (data) => {
    console.log("ping", data);
    socket.emit("pong", data);
  });
  const audioPath = "./audio/" + socket.id + "-";

  socket.on("stream_audio", ({ blob, id }) => {
    console.log(id, blob);
    fs.mkdirSync("./audio/", { recursive: true });
    const ap = audioPath + id + ".webm";
    fs.appendFile(ap, blob, "binary", function (err) {
      console.log({ ap, err });
    });
  });

  socket.on("done_with_segment", async ({ id, is_final, num }) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/tiny?socketId=${socket.id}&partial=${id}`);
    console.log(data);
    socket.emit("tiny_data", data);

    if (is_final) {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/revise?socketId=${socket.id}&partial=${id}&num=${num}`
      );
      console.log("complete", data);
      socket.emit("complete_data", data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`io listening on http://127.0.0.1:${PORT}`);
});
