import { publishPrompt } from "@/lib/ably";
import { NextResponse } from "next/server";


// To handle a POST request to /api
export async function POST(req: Request) {
    try {
        const { instruction, deviceID } = await req.json(); // Parse the request body

        // validate the req
        if (!instruction || !deviceID) {
            return NextResponse.json({
                success: false,
                message: 'Invalid request',
            }, { status: 400 });
        }

        await publishPrompt(deviceID, { "prompt": instruction });

        return NextResponse.json({
            success: true,
            message: 'Prompt sent successfully',
        });

    } catch (error) {
        console.log(error, "error");
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
        }, { status: 500 });
    }
}

