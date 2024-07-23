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

app = FastAPI()

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

# @app.get("/api/boats")
# async def get_boats():
#     url = "https://www.marinetraffic.com/getData/get_data_json_4/z:13/X:1942/Y:1570/station:0"
#     headers = {
#         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
#         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
#     }
#     async with httpx.AsyncClient() as client:
#         response = await client.get(url, headers=headers)
#         response.raise_for_status()
#         return response.json()

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
    curl_command = [
        'curl',
        'https://www.marinetraffic.com/getData/get_data_json_4/z:14/X:3887/Y:3139/station:0',
        '-H', 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        '-H', 'accept-language: en-US,en;q=0.5',
        '-H', 'sec-ch-ua: "Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        '-H', 'sec-ch-ua-mobile: ?0',
        '-H', 'sec-ch-ua-platform: "macOS"',
        '-H', 'sec-fetch-dest: document',
        '-H', 'sec-fetch-mode: navigate',
        '-H', 'sec-fetch-site: none',
        '-H', 'sec-fetch-user: ?1',
        '-H', 'sec-gpc: 1',
        '-H', 'upgrade-insecure-requests: 1',
        '-H', 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    ]
    
    result = subprocess.run(curl_command, capture_output=True, text=True)
    return json.loads(result.stdout)


# curl 'https://www.marinetraffic.com/getData/get_data_json_4/z:13/X:1942/Y:1570/station:0' \
#   -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8' \
#   -H 'accept-language: en-US,en;q=0.5' \
#   -H 'sec-ch-ua: "Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"' \
#   -H 'sec-ch-ua-mobile: ?0' \
#   -H 'sec-ch-ua-platform: "macOS"' \
#   -H 'sec-fetch-dest: document' \
#   -H 'sec-fetch-mode: navigate' \
#   -H 'sec-fetch-site: none' \
#   -H 'sec-fetch-user: ?1' \
#   -H 'sec-gpc: 1' \
#   -H 'upgrade-insecure-requests: 1' \
#   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'