"use client"

import UserAuthContext from "@/context/UserAuthContext";
import PrivyWalletProvider from "@/context/PrivyProvider";


export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UserAuthContext>
                <PrivyWalletProvider>
                    {children}
                </PrivyWalletProvider>
            </UserAuthContext>
        </>
    );
}


