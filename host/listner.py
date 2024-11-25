from ably import AblyRealtime
from ably.types.message import Message as AblyMessage
from agent import agent
import dotenv
import os
import asyncio


dotenv.load_dotenv()

client: AblyRealtime = None
channel = None
ABLY_API_KEY = "kgOD6Q.SfpZmQ:h6Cux_lty4VMZc9_6TJK6k1zGwrEwncsYScdMiXC8Xc"


async def listener(message: AblyMessage):
    print("Received a command, processing it...")
    prompt = message.data["prompt"]
    await agent(prompt)  # If agent is async, await it
    print("Agent has executed the command successfully!")


async def listen_for_prompt(channel_name: str):
    global client
    global channel

    client = AblyRealtime(key=ABLY_API_KEY)  # Initialize inside an async function
    channel = client.channels.get(channel_name)

    print('Connecting to server...')
    await client.connection.once_async('connected')
    print('Connected!')

    print("Listening for commands...")
    await channel.subscribe('new-prompt', listener)

    while True:
        await asyncio.sleep(1)


