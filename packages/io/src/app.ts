// dotenv
const _l = console.log;
console.log = (...params) => _l("\x1b[35m" + "[io]", ...params);

import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
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

  socket.on("done_with_segment", async ({ id }) => {
    const { data } = await axios.get(`http://localhost:8000/tiny?socketId=${socket.id}&partial=${id}`);
    console.log(data);
    socket.emit("tiny_data", data);

    if (id % 4 == 0) {
      const { data } = await axios.get(`http://localhost:8000/revise?socketId=${socket.id}&partial=${id}`);
      console.log("complete", data);
      socket.emit("complete_data", data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`io listening on http://localhost:${PORT}`);
});
