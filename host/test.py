import asyncio
from ably import AblyRealtime
import dotenv
import os


dotenv.load_dotenv()

client: AblyRealtime = None
channel = None


def create_channel(channel_name: str):
    channel = client.channels.get(channel_name)
    return channel


async def listen_for_prompt(channel_name: str):
    global client
    global channel
    client = AblyRealtime(os.getenv("ABLY_API_KEY"))  # Initialize inside an async function
    channel = create_channel(channel_name)
    
    await channel.publish("new-prompt", {"prompt": "Search samsung t7 1tb external ssd so that I can order it"})  # Publish prompt. "new-prompt" is the event name


if __name__ == "__main__":
    channel_name = input("Enter the channel name: ")
    
    asyncio.run(listen_for_prompt(channel_name))
