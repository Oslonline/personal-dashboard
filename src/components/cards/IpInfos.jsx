import React, { useState, useEffect } from "react";

const SecurityBadge = ({ active, message }) => {
    return <span className={`select-none rounded-full px-1.5 text-sm font-semibold ${active ? "bg-green-500" : "bg-red-500"} `}>{message}</span>;
};

export default function IpInfos({ ipInfo }) {
    const [masked, setMasked] = useState(false);

    useEffect(() => {
        const storedMasked = localStorage.getItem("ipInfoMasked");
        if (storedMasked !== null) {
            setMasked(storedMasked === "true");
        }
    }, []);

    const handleMaskToggle = () => {
        setMasked(!masked);
        localStorage.setItem("ipInfoMasked", !masked);
    };

    const securityParams = [
        { key: "vpn", trueMessage: "VPN connected", falseMessage: "No VPN" },
        { key: "proxy", trueMessage: "Proxy connected", falseMessage: "No proxy" },
        { key: "tor", trueMessage: "Tor node connected", falseMessage: "No Tor node" },
        { key: "relay", trueMessage: "Relay connected", falseMessage: "No relay" },
    ];

    const eyeIcon = (
        <svg className="h-6 w-6 stroke-gray-300 stroke-[1.5] group-hover:stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

    const eyeOffIcon = (
        <svg className="h-6 w-6 stroke-gray-300 stroke-[1.5] group-hover:stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const buttonIcon = masked ? eyeOffIcon : eyeIcon;

    return (
        <div className="col-start-5 row-span-2 rounded-xl border-zinc-800 bg-gradient-to-br from-zinc-950/80 to-zinc-950/40 p-5 pr-3 pt-3 shadow shadow-zinc-800 backdrop-blur-xl">
            <div className="flex h-full flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Ip Infos</h2>
                    <button className="group p-2" onClick={handleMaskToggle}>
                        {buttonIcon}
                    </button>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto pr-4">
                    <ul className="flex list-none flex-col gap-2 text-wrap">
                        <li className="lg:truncate">{masked && ipInfo ? "X".repeat(ipInfo?.ip.length) : ipInfo?.ip}</li>
                        <li className="lg:truncate">
                            {masked && ipInfo ? "X".repeat(ipInfo.location.country_code?.length) : ipInfo?.location.country_code} - {masked && ipInfo ? "X".repeat(ipInfo?.location.country.length) : ipInfo?.location.country}
                        </li>
                        <li className="lg:truncate">
                            {masked && ipInfo ? "X".repeat(ipInfo.location.city?.length) : ipInfo?.location.city} - {masked && ipInfo ? "X".repeat(ipInfo?.location.region.length) : ipInfo?.location.region}
                        </li>
                        <li className="lg:truncate">{masked && ipInfo ? "X".repeat(ipInfo?.network.autonomous_system_number.length) : ipInfo?.network.autonomous_system_number}</li>
                        <li className="lg:truncate">{masked && ipInfo ? "X".repeat(ipInfo?.network.autonomous_system_organization.length) : ipInfo?.network.autonomous_system_organization}</li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                        {securityParams.map((param) => (
                            <SecurityBadge key={param.key} active={ipInfo?.security[param.key]} message={ipInfo?.security[param.key] ? param.trueMessage : param.falseMessage} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
