import asyncio
import websockets
import json
import random

def random_color():
    # Genera un color hexadecimal aleatorio
    return "#{:02x}{:02x}{:02x}".format(
        random.randint(0, 255),
        random.randint(0, 255),
        random.randint(0, 255)
    )

async def handler(websocket):
    while True:
        x = random.uniform(-5, 5)
        y = random.uniform(-5, 5)
        data = {
            "position": [x, y, 0],
            "color": random_color()
        }
        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.5)

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()  # Run forever

asyncio.run(main())