from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import index

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- Allows all origins. (You can restrict this to your frontend URL later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"Hello": "World"}


app.include_router(index.router)
