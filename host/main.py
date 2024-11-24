from listner import listen_for_prompt
import uuid
import asyncio


if __name__ == "__main__":
    channel_name = str(uuid.uuid4())
    print("Device ID:", channel_name)

    # while True:
    asyncio.run(listen_for_prompt(channel_name))

