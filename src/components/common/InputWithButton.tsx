"use client";

import { Input } from "@/components/ui/input";
import { publishPrompt } from "@/lib/ably";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";


interface InputWithButtonProps {
    setResponse: (response: string) => void;
    setLoading: (loading: boolean) => void;
    setOpen: (open: boolean) => void;
    deviceID: string;
}


export function InputWithButton({ setLoading, deviceID }: InputWithButtonProps) {
    const [instruction, setInstruction] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // validate
        if (!instruction) {
            alert('Please enter a valid instruction');
            return;
        }
        if (!deviceID) {
            alert('Please enter a valid device ID in settings');
            return;
        }  else if (deviceID.length !== 36) {
            alert('The device ID should be 36 characters long');
            return;
        }

        setLoading(true);

        // publish to ably
        await publishPrompt(deviceID, { "prompt": instruction });
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full !max-w-xl items-center space-x-4 my-5">
            <Input type="text" placeholder="How can vity assist you?" className="h-12 w-full" value={instruction} onChange={(e) => setInstruction(e.target.value)} />
            <button type="submit" className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] py-3.5 px-4 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group/ask-btn">
                <PaperPlaneIcon className="h-4 w-4 group-hover/ask-btn:-rotate-45 transition duration-500" />
            </button>
        </form>
    )
}
