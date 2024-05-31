import React, { useState, useEffect } from "react";
import axios from "axios";
import Clock from "./components/cards/Clock";
import Weather from "./components/cards/Weather";
import IpInfos from "./components/cards/IpInfos";
import News from "./components/cards/News";
import Crypto from "./components/cards/Crypto";

export default function App() {
    const [ipInfo, setIpInfo] = useState({});
    const [loadingIpInfo, setLoadingIpInfo] = useState(true);

    useEffect(() => {
        const fetchIPInfo = async () => {
            try {
                const response = await axios.get(`https://vpnapi.io/api/?key=${import.meta.env.VITE_VPNAPI_APIKEY}`);
                setIpInfo(response.data);
                setLoadingIpInfo(false);
            } catch (error) {
                console.error("Error fetching IP info:", error);
                setLoadingIpInfo(false);
            }
        };
        fetchIPInfo();
    }, []);

    return (
        <div className="grid h-screen w-screen grid-cols-5 grid-rows-5 gap-5 bg-gradient-radial p-5 text-gray-50 2xl:p-10">
            {loadingIpInfo ? (
                <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
                    <p className="text-2xl font-semibold">Loading...</p>
                    <svg className="h-10 w-10 animate-spin fill-gray-50" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z"></path>
                    </svg>
                </div>
            ) : (
                <>
                    <Clock />
                    <Weather country={ipInfo.location.country_code} city={ipInfo.location.city} />
                    <IpInfos ipInfo={ipInfo} />
                    <News countryCode={ipInfo.location.country_code} />
                    <Crypto />
                </>
            )}
        </div>
    );
}
