"use client";

import * as Ably from 'ably'
import { AblyProvider as AP, ChannelProvider } from 'ably/react';


export default function AblyProvider({ children }: { children: React.ReactNode }) {
    const client = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });

    return (
        <>
            <AP client={client}>
                <ChannelProvider channelName=''>
                    {children}
                </ChannelProvider>
            </AP>
        </>
    )
}

