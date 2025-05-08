from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from prompter import prompter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptModel(BaseModel):
    project_description: str


@app.post("/")
async def main(request: PromptModel):
    # with open("example.json") as f:
    #     return json.load(f)

    return {"data": prompter(request.project_description)}
