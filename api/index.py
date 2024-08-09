import httpx
from fastapi import FastAPI
from fr24.livefeed import (
    livefeed_message_create,
    livefeed_post,
    livefeed_request_create,
    livefeed_response_parse,
)
from fr24.proto.request_pb2 import LiveFeedResponse
import asyncio
import json
from google.protobuf.json_format import MessageToDict
import subprocess
from . import aisstream_tracker

app = FastAPI()

websocket_client = aisstream_tracker.BoatTracker()

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(websocket_client.connect())

@app.on_event("shutdown")
async def shutdown_event():
    websocket_client.close()

async def flight_data() -> LiveFeedResponse:
    async with httpx.AsyncClient() as client:
        message = livefeed_message_create(north=38.956120, west=-9.625847, south=38.496507, east=-8.587639)
        request = livefeed_request_create(message)
        data = await livefeed_post(client, request)
        return livefeed_response_parse(data)

@app.get("/api/flights")
async def get_data():
    data = await flight_data()
    # Convert the protobuf message to a dictionary
    data_dict = MessageToDict(data)
    return data_dict

@app.get("/api/trains")
async def get_boats():
    url = "https://citymapper.com/api/1/raildepartures?headways=2&ids=LisbonStation_Pragal,LisbonStation_CampolideA&region_id=pt-lisbon"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        return response.json()


@app.get("/api/boats")
async def get_curl():
    positions = websocket_client.get_positions()
    ship_data = websocket_client.get_ship_data()
    return { "positions": positions, "shipData": ship_data }
