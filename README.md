## What a great day to take annote.
 Annote. Live transcription and summarization in your all-in-one digital notebook. ![link](https://i.imgur.com/DLM6YeO.png) 
 
## Inspiration
One of our members talked about his two-and-a-half-hour lecture and how he lost focus after 90 minutes. We decided to use live transcripts and a detailed summarization model to combat this problem, building on the principles of popular note-taking apps like Goodnotes and Notability.

## What it does 
* Speech-to-text recognition 
* Live audio transcripts from lectures with replay functionality 
* Smoother than paper writing tools compatible with the Apple Pencil 
* AI-generated summaries from transcription 

## How we built it 
Frontend: As a framework, Next.js was used to build the frontend with Chakra UI as a component library.

Backend: The backend was challenging to implement as we didn't allow ourselves to use outside APIs, as we would like to host this for longer than other hackathon AI-assistants. We wanted to make sure that it would be able to be run sustainably on our university's hardware, so much of the weekend was spent developing on the servers on campus directly. 

The speech-to-text works by streaming data in 1-2second buffers to the server (via websocket). Then, we have a pipeline of two models: the first one is a very small ASR that runs on every buffer, streaming the data back to the client immediately. Then, about once every 20 seconds or so, we concatenate the audio streams together to "revise" our "prediction" with a much larger ASR (openai's whisper). Both models are self-hosted. 

The summarization T5 model was pulled off Huggingface, and worked decently until it crashed on our 3080 server, so we had to get rid of it. 

Our website is deployed on-prem at the University of Minnesota's ACM server rack, because we have access to the GPU powerful enough for free.

The GPU/text processing server is a 32 core, 32 gb machine with a 1080TI and a 3080 attached for the cuda cores. We are hosting our public-facing node on a 4gb 2 core machine, which is effectively serving the static NextJS web frontend and acting as a reverse proxy for the backend. It's deployed using Caddy and Cloudflare on NixOS for reproducible builds.
 

## Challenges we ran into 
In order to develop the login pages, we had to learn about APIs and how to authenticate users with next.auth. Having never worked in any HTML/CSS environment before, we definitely learned a lot.

## Accomplishments that we're proud of 

One of our members, however (Samyok), has participated in quite a few hackathons and we held boot camps before the hackathon to sharpen our skills for competition. He took on the backend at the hackathon while the rest of us developed the front-end infrastructure. 

As team of four freshmen, the exposure we've had to hackathons and computer science, in general, has been pretty limited but we were excited to learn new things and apply our technical skills toward creating a project. For most of the members of the team, it was our first hackathon.

## What we learned 
The most important skill we learned is how to work as a team and how to communicate with one another. One of the biggest issues we ran into early was that we struggled to communicate early on, which led to us being starved for time near the end of the hackathon. 

## What's next for Annote

make summarization not crash the server

Force press lookup for unfamiliar concepts in the live transcription

Different paper templates like graph, blank and ruled

Integration of better organization within folders and annotes
