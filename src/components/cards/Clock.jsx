import { useState, useEffect } from "react";

export default function Clock() {
    let [date, setDate] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    const getMonthName = (monthIndex) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[monthIndex];
    };

    const getDayName = (dayIndex) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayIndex];
    };

    return (
        <div className="col-span-2 row-span-1 rounded-xl border border-zinc-800 bg-clock bg-cover bg-center bg-no-repeat shadow shadow-zinc-800 backdrop-blur-xl lg:row-span-2">
            <div className="h-full w-full rounded-xl bg-gradient-to-br from-zinc-950/60 to-transparent p-5">
                <p className=" font-semibold md:text-3xl lg:text-4xl xl:text-5xl">
                    {getDayName(date.getDay())} {date.getDate()} {getMonthName(date.getMonth())} {date.getFullYear()}
                </p>
                <p></p>
                <p className="md: font-mono font-bold lg:text-7xl xl:text-8xl">{date.toLocaleTimeString()}</p>
            </div>
        </div>
    );
}
