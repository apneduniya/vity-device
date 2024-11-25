from listner import listen_for_prompt
import uuid
import asyncio
import os
import dotenv


dotenv.load_dotenv()

# check if the required environment variables are present or not
if not os.getenv("OPENAI_API_KEY"):
    print("Please set the environment variables OPENAI_API_KEY and ABLY_API_KEY")
    exit(1)

channel_name = str(uuid.uuid4())
print("Device ID:", channel_name)

# while True:
asyncio.run(listen_for_prompt(channel_name))

