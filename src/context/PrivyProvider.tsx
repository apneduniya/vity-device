"use client";

import { defineChain } from "viem";

import { useCallback, useEffect } from "react";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useUserDetails } from "./UserAuthContext";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import api from "@/utils/api";


const Capx = defineChain({
    id: Number(process.env.NEXT_PUBLIC_CAPX_CHAIN_ID),
    name: process.env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME!,
    network: process.env.NEXT_PUBLIC_CAPX_CHAIN_NETWORK_NAME!,
    logoUrl: "https://internal.app.capx.fi/favicon.png",
    nativeCurrency: {
        decimals: 18,
        name: "ether",
        symbol: process.env.NEXT_PUBLIC_CAPX_CHAIN_CURRENCY!,
    },
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL!],
            webSocket: [process.env.NEXT_PUBLIC_CAPX_WEB_SOCKET_URL!],
        },
        public: {
            http: [process.env.NEXT_PUBLIC_CAPX_CHAIN_RPC_URL!],
            webSocket: [process.env.NEXT_PUBLIC_CAPX_WEB_SOCKET_URL!],
        },
    },
    blockExplorers: {
        default: {
            name: "Explorer",
            url: process.env.NEXT_PUBLIC_CAPX_CHAIN_EXPLORE_URL!,
        },
    },
});

const PrivyWrapper = ({ children }: { children: React.ReactNode }) => {
    const { txDetails, userDetails, getUserDetails } = useUserDetails();
    const { wallets } = useWallets();
    const { user, authenticated, createWallet } = usePrivy();

    const mintXId = async () => {
        const startTime = performance.now();
        if (Object.keys(txDetails).length > 0) {
            try {
                await api.post("/wallet/faucet");
            } catch (error) {
                console.log(error, "request faucet error");
            }
            try {
                const wallet = wallets.find(
                    (wallet) => wallet.walletClientType === "privy"
                );
                if (wallet) {
                    await wallet.switchChain(Number(process.env.NEXT_PUBLIC_CAPX_CHAIN_ID));
                } else {
                    throw new Error("Wallet not found");
                }
                const providerInstance = await wallet.getEthersProvider();
                const signer = providerInstance.getSigner();
                const contract = new ethers.Contract(
                    txDetails.contract_address,
                    txDetails.contract_abi,
                    signer as unknown as ethers.Signer
                );
                const txResponse = await signer.sendTransaction({
                    to: txDetails.contract_address,
                    data: contract.interface.encodeFunctionData("createProfile", [
                        txDetails.input_params._profileParams,
                        txDetails.input_params._profileData,
                    ]),
                    chainId: 10245,
                });

                const recipt = await txResponse.wait();
                const endTime = performance.now();
                console.log(endTime - startTime, "XID transaction time");
                console.log(recipt, "mint tx recipt");
                await getUserDetails();
                return true;
            } catch (error) {
                console.log(error, "mint transaction error");
                return false;
            }
        }
    };

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        (async () => {
            if (txDetails && userDetails?.version < 3 && wallets.length > 0) {
                const isMinted = await mintXId();
                if (!isMinted) {
                    timer = setInterval(async () => {
                        const isXIdMinted = await mintXId();
                        if (isXIdMinted) {
                            clearInterval(timer);
                        }
                    }, 300000);
                }
            }
        })();

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Object.keys(txDetails).length, wallets.length]);

    useEffect(() => {
        (async () => {
            if (authenticated) {
                if (!user?.wallet) {
                    await createWallet();
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]);
    return <>{wallets.length > 0 ? children : <p>Loading...</p>}</>;
};

export default function PrivyWalletProvider({ children }: { children: React.ReactNode }) {
    const { isUserCreated } = useUserDetails();

    const getCustomToken = useCallback(async () => {
        if (isUserCreated) {
            const idToken = Cookies.get("access_token");
            return idToken;
        } else {
            return undefined;
        }
    }, [isUserCreated]);

    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={{
                supportedChains: [Capx],
                defaultChain: Capx,
                appearance: {
                    theme: "dark",
                    accentColor: "#676FFF",
                    logo: "https://internal.app.capx.fi/favicon.png",
                    showWalletLoginFirst: false,
                },
                customAuth: {
                    isLoading: false,
                    // isAuthReady: isUserCreated,
                    getCustomAccessToken: getCustomToken,
                },
            }}
        >
            <PrivyWrapper>{children}</PrivyWrapper>
        </PrivyProvider>
    );
}
