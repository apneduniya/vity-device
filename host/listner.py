from ably import AblyRealtime
from ably.types.message import Message as AblyMessage
from agent import agent
import dotenv
import os
import asyncio


dotenv.load_dotenv()

client: AblyRealtime = None
channel = None


async def listener(message: AblyMessage):
    print("Received a command, processing it...")
    prompt = message.data["prompt"]
    response = await agent(prompt)  # If agent is async, await it
    await channel.publish("response", {"response": response})  # Publish response. "response" is the event name
    print("Processing done, response sent to the user!")


async def listen_for_prompt(channel_name: str):
    global client
    global channel

    client = AblyRealtime(os.getenv("ABLY_API_KEY"))  # Initialize inside an async function
    channel = client.channels.get(channel_name)

    print('Connecting to server...')
    await client.connection.once_async('connected')
    print('Connected!')

    print("Listening for commands...")
    await channel.subscribe('new-prompt', listener)

    while True:
        await asyncio.sleep(1)


