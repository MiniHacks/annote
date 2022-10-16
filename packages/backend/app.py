import time

from fastapi import FastAPI
import whisper
import os
import tempfile
import ffmpeg

medium = whisper.load_model("medium")
tiny_en = whisper.load_model("tiny.en")

app = FastAPI()

def getFilePath(id, partial):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), f"../io/audio/{id}-{partial}.webm"))


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/tiny")
async def tiny(socketId: str, partial: int):
    # result = tiny.transcribe()
    start_time = time.time()
    path = getFilePath(socketId, partial)
    result = tiny_en.transcribe(path)

    return {"time": time.time() - start_time, "path": getFilePath(socketId, partial), "result": result}


@app.get("/revise")
async def revise(socketId: str, partial: int):
    if partial < 4:
        return {"result": "No revision needed"}
    start_time = time.time()
    # create a temp output file below using a python package
    file = tempfile.mktemp(suffix=".webm")
    # concatenate the last 4 partials using ffmpeg
    ffmpeg.concat(
        ffmpeg.input(getFilePath(socketId, partial - 3)),
        ffmpeg.input(getFilePath(socketId, partial - 2)),
        ffmpeg.input(getFilePath(socketId, partial - 1)),
        ffmpeg.input(getFilePath(socketId, partial)),
        v=0, a=1
    ).output(file).run()

    result = medium.transcribe(file)
    return {"time": time.time() - start_time, "result": result, "file": file}

