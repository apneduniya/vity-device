import PrivyWalletProvider from "@/context/PrivyProvider";
import UserAuthContext from "@/context/UserAuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PrivyWalletProvider>
                <UserAuthContext>
                    {children}
                </UserAuthContext>
            </PrivyWalletProvider>
        </>
    );
}


