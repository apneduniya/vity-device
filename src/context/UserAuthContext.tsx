/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import Cookies from "js-cookie";
import { setTokenCookiesFunction } from "@/utils/setTokenCookies";
import api from "@/utils/api";

const UserDetailsContext = createContext<any | undefined>(undefined);
const UserAuthContext = ({ children }: { children: React.ReactNode }) => {
    const [userDetails, setUserDetails] = useState({});
    const [isUserCreated, setIsUserCreated] = useState(false);
    const [txDetails, setTxDetails] = useState({});

  const initDataRaw = useLaunchParams()?.initDataRaw;

    const createUser = useCallback(async (initData: any) => {
        const { data: userInfo } = await api.post(
            `/users/auth`,
            {},
            {
                headers: {
                    "x-initdata": initData,
                },
            }
        );
        console.log(userInfo, "userInfo");

        setTokenCookiesFunction(
            userInfo?.result.access_token,
            userInfo?.result.refresh_token
        );

        setUserDetails(userInfo?.result?.user);
        setIsUserCreated(true);
        setTxDetails(userInfo?.result?.signup_tx || {});
    }, []);

    const getUserDetails = useCallback(async () => {
        const { data: userInfo } = await api.get("/users");
        setUserDetails(userInfo?.result?.user);
        setIsUserCreated(true);
        setTxDetails(userInfo?.result?.signup_tx || {});
    }, []);

    useEffect(() => {
        (async () => {
            if (initDataRaw) {
                try {
                    // Verify init data with MAB
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_VERIFY_API_ENDPOINT}/verify`,
                        {
                            initData: initDataRaw,
                        }
                    );
                    const refresh_token = Cookies.get("refresh_token");
                    if (!refresh_token) {
                        await createUser(data.initData);
                    } else {
                        await getUserDetails();
                    }
                } catch (err: any) {
                    console.log(err.message);
                }
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initDataRaw]);

    return (
        <UserDetailsContext.Provider
            value={{ userDetails, isUserCreated, txDetails, getUserDetails }}
        >
            {children}
        </UserDetailsContext.Provider>
    );
};

export default UserAuthContext;

export const useUserDetails = () => useContext(UserDetailsContext);