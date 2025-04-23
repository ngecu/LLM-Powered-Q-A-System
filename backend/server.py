from fastapi import FastAPI
from routes import index

app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World"}


app.include_router(index.router)
