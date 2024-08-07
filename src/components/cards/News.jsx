import React, { useState, useEffect } from "react";
import axios from "axios";

export default function News({ countryCode }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${import.meta.env.VITE_NEWSAPI_APIKEY}`);
                setNews(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, [countryCode]);

    return (
        <div className="col-span-3 row-span-3 row-start-3 flex flex-col rounded-xl border-zinc-800 bg-gradient-to-br from-zinc-950/80 to-zinc-950/40 p-5 shadow shadow-zinc-800 backdrop-blur-xl">
            <h3 className="pb-2 text-lg font-semibold">Last News</h3>
            <ul className="flex touch-pan-y flex-col gap-2 overflow-y-auto overflow-x-hidden overscroll-contain rounded-md bg-zinc-950/50 p-2 pr-4">
                {news.map((article, index) => (
                    <a className="group flex items-center justify-between rounded-md p-2 duration-100 hover:bg-gray-50/10" key={index} href={article.url} target="_blank" rel="noopener noreferrer">
                        <li className="flex flex-col">
                            <p className="font-semibold">{article.title}</p>
                            <p className="text-sm">Source - {article.source.name}</p>
                        </li>
                        <div>
                            <svg className="duration-250 h-8 w-8 fill-gray-300 group-hover:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.7281 3.88396C17.1624 2.44407 19.2604 2.41383 20.4219 3.57981C21.5856 4.74798 21.5542 6.85922 20.1189 8.30009L17.6951 10.7333C17.4028 11.0268 17.4037 11.5017 17.6971 11.794C17.9906 12.0863 18.4655 12.0854 18.7578 11.7919L21.1816 9.35869C23.0929 7.43998 23.3329 4.37665 21.4846 2.5212C19.6342 0.663551 16.5776 0.905664 14.6653 2.82536L9.81768 7.69182C7.90639 9.61053 7.66643 12.6739 9.5147 14.5293C9.80702 14.8228 10.2819 14.8237 10.5754 14.5314C10.8688 14.2391 10.8697 13.7642 10.5774 13.4707C9.41376 12.3026 9.4451 10.1913 10.8804 8.75042L15.7281 3.88396Z" />
                                <path d="M14.4846 9.4707C14.1923 9.17724 13.7174 9.17632 13.4239 9.46864C13.1305 9.76097 13.1296 10.2358 13.4219 10.5293C14.5856 11.6975 14.5542 13.8087 13.1189 15.2496L8.27129 20.1161C6.83696 21.556 4.73889 21.5862 3.57742 20.4202C2.41376 19.2521 2.4451 17.1408 3.8804 15.6999L6.30424 13.2666C6.59657 12.9732 6.59565 12.4983 6.30219 12.206C6.00873 11.9137 5.53386 11.9146 5.24153 12.208L2.81769 14.6413C0.906387 16.56 0.666428 19.6234 2.5147 21.4788C4.36518 23.3365 7.42173 23.0944 9.334 21.1747L14.1816 16.3082C16.0929 14.3895 16.3329 11.3262 14.4846 9.4707Z" />
                            </svg>
                        </div>
                    </a>
                ))}
            </ul>
        </div>
    );
}
