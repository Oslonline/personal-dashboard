import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather({ country, city }) {
    const [currentWeather, setCurrentWeather] = useState({});
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const currentWeatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_APIKEY}&units=metric&lang=${country}`);
                setCurrentWeather({
                    city: currentWeatherResponse.data.name,
                    temp: currentWeatherResponse.data.main.temp,
                    humidity: currentWeatherResponse.data.main.humidity,
                    description: currentWeatherResponse.data.weather[0].description,
                    icon: currentWeatherResponse.data.weather[0].icon,
                });

                const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_APIKEY}&units=metric`);
                const filteredForecast = forecastResponse.data.list.filter((forecast) => {
                    const forecastDate = new Date(forecast.dt * 1000);
                    const currentDate = new Date();
                    if (forecastDate.getDate() === currentDate.getDate()) {
                        return false;
                    }
                    return forecastDate > currentDate;
                });

                const groupedForecast = groupForecastByDay(filteredForecast);
                setWeatherForecast(groupedForecast);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setLoading(false);
            }
        };
        if (city) {
            fetchWeatherData();
        }
    }, [city, country]);

    const groupForecastByDay = (forecastList) => {
        const groupedForecastMap = new Map();
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        forecastList.forEach((forecast) => {
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDay = daysOfWeek[forecastDate.getDay()];
            if (!groupedForecastMap.has(forecastDay)) {
                groupedForecastMap.set(forecastDay, {
                    date: forecastDay,
                    tempMax: -Infinity,
                    tempMin: Infinity,
                    weather: forecast.weather[0].description,
                    icon: forecast.weather[0].icon,
                });
            }
            const forecastDayData = groupedForecastMap.get(forecastDay);
            forecastDayData.tempMax = Math.max(forecastDayData.tempMax, forecast.main.temp_max);
            forecastDayData.tempMin = Math.min(forecastDayData.tempMin, forecast.main.temp_min);
        });

        return Array.from(groupedForecastMap.values());
    };

    return (
        <div className="col-span-2 col-start-3 row-span-2 rounded-xl bg-gradient-to-br from-zinc-950 to-zinc-950/40 p-5 pb-1 backdrop-blur-xl">
            {loading ? (
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <p>Loading weather...</p>
                    <svg className="h-10 w-10 animate-spin fill-gray-50" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z"></path>
                    </svg>
                </div>
            ) : (
                <div className="flex h-full w-full flex-col justify-between">
                    {currentWeather.temp ? (
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold">{currentWeather.city}</h1>
                                <p className="text-6xl font-bold">{currentWeather.temp.toFixed(1)}°C</p>
                            </div>
                            <div>
                                <img className="h-28 w-28" src={`/static/weathericons/${currentWeather.icon}.svg`} alt="" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>No weather data available</p>
                        </div>
                    )}
                    <div className="flex touch-pan-x gap-2 overflow-x-auto overflow-y-hidden overscroll-contain pb-4">
                        {weatherForecast.map((forecast, index) => (
                            <div key={index} className="flex h-fit w-28 min-w-28 flex-col items-center rounded-xl bg-gray-50/10 p-2 align-bottom">
                                <img className="h-16 w-16" src={`/static/weathericons/${forecast.icon}.svg`} alt="" />
                                <div className="flex w-full justify-around">
                                    <div className="flex flex-col items-center">
                                        <p>Min</p>
                                        <p>{forecast.tempMin.toFixed(0)}°C</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p>Max</p>
                                        <p>{forecast.tempMax.toFixed(0)}°C</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{forecast.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
