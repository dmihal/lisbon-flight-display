import asyncio
import websockets
import json
from datetime import datetime, timezone

class BoatTracker:
    def __init__(self):
        self.positions = {}
        self.ship_data = {}
        self.connection = None
        self.running = True

    async def connect(self):
        print("Connecting")
        self.connection = await websockets.connect("wss://stream.aisstream.io/v0/stream")
        print("Connected")
        subscribe_message = {
            "APIKey": "3dd64dc21d71a1dbb4ee6553eae1a4906a613726",
            "BoundingBoxes": [[[38.6581168, -9.1023311], [38.7068079, -9.2343897]]]
        }

        subscribe_message_json = json.dumps(subscribe_message)
        await self.connection.send(subscribe_message_json)

        await self.listen()

    async def listen(self):
        try:
            while self.running:
                message = json.loads(await self.connection.recv())
                message_type = message["MessageType"]
                print(message_type)
                if message_type == "PositionReport":
                    self.positions[message["MetaData"]["MMSI"]] = message
                if message_type == "ShipStaticData":
                    self.ship_data[message["MetaData"]["MMSI"]] = message
        except websockets.ConnectionClosed:
            print("Connection closed")
        finally:
            await self.connection.close()

    # def start(self):
    #     asyncio.get_event_loop().run_until_complete(self.connect())

    def get_positions(self):
        return self.positions

    def get_ship_data(self):
        return self.ship_data

    def close(self):
        self.running = False
        if self.connection:
            asyncio.get_event_loop().run_until_complete(self.connection.close())
