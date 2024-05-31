import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Crypto() {
    const [cryptoInfos, setCryptoInfos] = useState([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get("https://api.coincap.io/v2/assets?limit=5");
                const data = response.data.data;
                setCryptoInfos(data);
            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };

        fetchCryptoData();
    }, []);

    return (
        <div className="col-span-2 col-start-4 row-span-2 row-start-3 flex flex-col justify-between rounded-xl bg-gradient-to-br from-zinc-950/80 to-zinc-950/40 p-5 pr-3 backdrop-blur-xl">
            <h4 className="pb-2 text-lg font-semibold">Top 5 Cryptos</h4>
            <div className="flex touch-pan-y flex-col gap-2 overflow-y-auto overflow-x-hidden overscroll-contain pr-2">
                {cryptoInfos.map((crypto, index) => (
                    <div className="flex justify-between p-2" key={index}>
                        <div className="flex items-center gap-2">
                            <img className="h-8 w-8" src={`/static/crypto-icons/${crypto.symbol.toLowerCase()}.png`} alt="Crypto icon" />
                            <div>
                                <p className="font-semibold">{crypto.symbol}</p>
                                <p>{parseFloat(crypto.priceUsd).toFixed(2)}$</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-xs font-semibold">24h</p>
                            <p className={parseFloat(crypto.changePercent24Hr) >= 0 ? "text-lg font-semibold text-green-500" : "text-lg font-semibold text-red-500"}>
                                {parseFloat(crypto.changePercent24Hr) >= 0 ? "+" : ""}
                                {parseFloat(crypto.changePercent24Hr).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
