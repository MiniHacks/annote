import time

from fastapi import FastAPI
import whisper
import os
import tempfile
import ffmpeg

medium = whisper.load_model("medium.en")
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
    result = tiny_en.transcribe(path, language="en")

    return {"time": time.time() - start_time, "path": getFilePath(socketId, partial), "result": result}


@app.get("/revise")
async def revise(socketId: str, partial: int, num: int):
    if partial < 4:
        return {"result": "No revision needed"}
    start_time = time.time()
    # create a temp output file below using a python package
    file = tempfile.mktemp(suffix=".webm")
    # concatenate the last num partials using ffmpeg
    files = [ffmpeg.input(getFilePath(socketId, i)) for i in range(partial - num + 1, partial + 1)]
    ffmpeg.concat(*files, v=0, a=1).output(file).run()

    result = medium.transcribe(file, language="en")
    return {"time": time.time() - start_time, "result": result, "file": file}
