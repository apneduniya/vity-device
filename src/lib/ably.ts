import Ably from 'ably';

let ablyClient: Ably.Realtime;

export const getAblyClient = (): Ably.Realtime => {
    if (!ablyClient) {
        ablyClient = new Ably.Realtime({
            key: process.env.ABLY_API_KEY || '', // Replace with your Ably API Key
        });
    }
    return ablyClient;
};

export type AblyMessage = {
    prompt: string;
};

export const publishPrompt = async (
    channelName: string,
    message: AblyMessage
): Promise<void> => {
    const ably = getAblyClient();
    const channel = ably.channels.get(channelName);

    await channel.publish('new-prompt', { prompt: message.prompt });
};


