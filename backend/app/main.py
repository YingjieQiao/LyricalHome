import os, base64
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, UploadFile, File, Request, Header
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import uvicorn

app = FastAPI()


@app.get("/photo/{category}/{argument}", status_code=200)
def get_photo_from_s3(category: str, argument: str):
    

    return JSONResponse(
        content={"category": category,
            "argument": argument}
    )

