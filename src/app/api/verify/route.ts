import { NextResponse } from "next/server";
import { createHmac } from 'crypto';


export async function POST(req: Request) {
    try {
        const { initData } = await req.json(); // Parse the request body
        console.log(initData, "initData");

        const BOT_TOKEN = process.env.BOT_TOKEN!;

        // Parse initData and generate a hash to compare
        const urlParams = new URLSearchParams(initData);
        const hash = urlParams.get('hash');

        urlParams.delete('hash');
        urlParams.sort();
        let dataCheckString = '';
        for (const [key, value] of urlParams.entries()) {
            dataCheckString += `${key}=${value}\n`;
        }
        dataCheckString = dataCheckString.slice(0, -1);

        // First hash check
        const secret = createHmac('sha256', 'WebAppData').update(BOT_TOKEN);
        const calculatedHash = createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');

        if (hash !== calculatedHash) {
            return NextResponse.json({
                success: false,
                message: 'Invalid InitData',
            }, { status: 401 });
        }

        // Continue with the second hash generation
        const clientId = process.env.CLIENT_ID!;
        const clientSecret = process.env.CLIENT_SECRET!;

        urlParams.append('client_id', clientId);
        urlParams.sort();

        dataCheckString = '';
        for (const [key, value] of urlParams.entries()) {
            dataCheckString += `${key}=${value}\n`;
        }
        dataCheckString = dataCheckString.slice(0, -1);

        const centralSecret = createHmac('sha256', 'WebAppData').update(clientSecret);
        const centralHash = createHmac('sha256', centralSecret.digest())
            .update(dataCheckString)
            .digest('hex');
        urlParams.append('hash', centralHash);

        // Return the result
        return NextResponse.json({
            success: true,
            initData: urlParams.toString(),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

