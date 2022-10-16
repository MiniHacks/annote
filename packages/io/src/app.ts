// dotenv
const _l = console.log;
console.log = (...params) => _l("\x1b[35m" + "[io]", ...params);

import { config } from "dotenv";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import { v4 } from "uuid";
import axios from "axios";
import { MongoClient } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";

config({ path: "../../.env" });

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    limit: "100mb",
  })
);
const server = createServer(app);
const client = new MongoClient(process.env.MONGO ?? "", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // serverApi: ServerApiVersion.v1,
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = +(process?.env?.IO_PORT ?? 5001);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world :)");
});

app.get("/dashboard", (req: Request, res: Response) => {
  if (!req.query.name) return res.send("no name provided");
  const name = req.query.name as string;
  client.connect().then(() => {
    const collection = client.db("annote").collection("notes");
    const folders = client.db("annote").collection("folders");
    const notes = collection.find({ owner: name }).toArray();
    const foldersData = folders.find({ owner: name }).toArray();
    Promise.all([notes, foldersData]).then(([noteData, folderData]) => {
      res.json({ notes: noteData, folders: folderData });
    });
    console.log("connected to mongodb");
  });
});

app.post("/folder", (req: Request, res: Response) => {
  if (!req.query.name) return res.send("no name provided");

  if (!req.body.folderName) return res.send("no folder name provided");
  const name = req.query.name as string;
  const folderName = req.body.folderName as string;
  client.connect().then(() => {
    const folders = client.db("annote").collection("folders");
    folders.insertOne({ owner: name, name: folderName });
    res.json({ success: "folder created" });
  });
});

app.use(express.static("images"));

app.post("/save", async (req: Request, res: Response) => {
  // take transcript data and a buffer for the image of the canvas drawing

  const id = v4();
  const transcript = req.body.transcript;
  const image = req.body.image;

  // save the image to a file

  fs.mkdirSync(`./images/`, { recursive: true });
  fs.writeFileSync(`./images/${id}.png`, image);

  // save the transcript to mongodb

  client.connect().then(async () => {
    const collection = client.db("annote").collection("notes");
    await collection.insertOne({ id, transcript, image: `${id}.png` });
    res.json({ success: "saved", id });
  });
});
// return the id of the transcript

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
    try {
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
    } catch (e) {
      console.log(e);
    }
  });
});
client.connect((err) => {
  server.listen(PORT, () => {
    console.log(`io listening on http://127.0.0.1:${PORT}`);
  });

  client.close();
});
