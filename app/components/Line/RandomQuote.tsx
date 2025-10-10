import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { apiQuoteRandomOne } from "~/apis/quote.api";
import { QUERY_KEY } from "~/lib/queryKey";
import type { QuoteType } from "~/types/quote.type";
import type { CurrentWeatherType, WeatherType } from "~/types/weather.type";
import Loading from "../Loading";

export default function RandomQuoteComponent() {
  const [weather, setWeather] = useState<WeatherType>();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType>();
  async function getWeather() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=16.79046448163847&lon=107.11369981925334&appid=b00421981f4e56a652c4808810cfdc69&lang=vi&units=metric`
    );
    const data = await res.json();
    setWeather(data);
  }
  async function getCurrentWeather() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=16.79046448163847&lon=107.11369981925334&appid=b00421981f4e56a652c4808810cfdc69&lang=vi&units=metric`
    );
    const data = await res.json();
    setCurrentWeather(data);
  }
  const { data, isLoading } = useQuery<QuoteType>({
    queryKey: [QUERY_KEY.quote.RANDOM_ONE],
    queryFn: apiQuoteRandomOne,
    // refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    getWeather();
    getCurrentWeather();
  }, []);

  if (isLoading) return <Loading fullScreen />;
  return (
    <div className="h-screen w-screen relative">
      <img
        src={`https://picsum.photos/1920/1080?t=` + Date.now()}
        className="absolute z-0 w-full h-full bg-cover bg-center"
        alt="BG"
      />

      <div className="absolute z-10 w-full h-full bg-black opacity-75 flex flex-col justify-start items-center"></div>
      <div className="absolute flex-1 h-[calc(100vh-11rem)] z-50 mx-auto px-12 flex justify-center items-center flex-col my-auto w-full">
        <q
          id="danhngon"
          className={`text-white ${data && data.content.length > 100 ? "text-5xl" : "text-6xl"} text-center font-bold leading-relaxed`}
        >
          {data?.content}
        </q>
        {data?.author && (
          <p id="tacgia" className="text-white text-4xl mt-2 italic text-right ml-auto">
            -- {data?.author} --
          </p>
        )}
      </div>
      <img src="/images/logo.png" alt="Logo" className="absolute top-2 left-2 w-10 z-50" />

      {weather && currentWeather && (
        <div className="weather flex gap-8 px-8 h-44 w-full text-black absolute bottom-2 z-50">
          <div className="bg-[#32B3D1] border-2 text-white rounded-2xl shadow-2xl w-1/2 flex items-center p-2">
            <div className="flex flex-col justify-between items-center h-full">
              <p className="uppercase text-5xl font-extrabold">{currentWeather.name}</p>
              <p className="uppercase text-3xl ">{format(new Date(), "EEEE", { locale: vi })}</p>
              <p className="uppercase text-3xl ">
                {format(new Date(), "dd/MM/yyyy", { locale: vi })}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center mx-auto">
              <img
                src={`/images/weather/${currentWeather.weather[0].icon}.svg`}
                alt=""
                className="w-30 h-30 bg-orange-200 my-auto bg-cover bg-center rounded-full border-2"
              />
            </div>
            <div className="flex flex-col justify-around items-center h-full ml-auto mx-4 flex-1 max-w-2/5">
              <p className="text-8xl text-center font-black text-[#fff]">
                {currentWeather.main.temp.toFixed(0)}&deg;C
              </p>
              <p className="capitalize text-center text-2xl font-semibold bg-white text-black px-2 py-1 w-full line-clamp-1">
                {currentWeather.weather[0].description}
              </p>
            </div>
          </div>
          <div className="bg-[#32B3D1] border-2 text-white rounded-2xl shadow-2xl w-1/2 grid grid-cols-5">
            {weather.list.map((item, index) => {
              if (item.dt_txt.includes("12:00:00")) {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-around gap-2 text-2xl p-1"
                  >
                    <div className="font-semibold bg-white text-black px-2 rounded shadow-2xl">
                      <span>{format(new Date(item.dt_txt), "eeee", { locale: vi })}</span>
                    </div>
                    <img
                      className="w-20 border rounded-full border-white"
                      src={`/images/weather/${item.weather[0].icon}.svg`}
                      alt=""
                    />
                    <p className="font-black">{item.main.temp.toFixed(0)}&deg;C</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
