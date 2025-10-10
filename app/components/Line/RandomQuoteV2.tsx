import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { apiQuoteRandomOne } from "~/apis/quote.api";
import ENV_CONFIG from "~/lib/env";
import { convertWeatherDescription, convertWeatherIcon } from "~/lib/helpers";
import { QUERY_KEY } from "~/lib/queryKey";
import type { MeteoWeatherType } from "~/types/meteo-weather.type";
import type { QuoteType } from "~/types/quote.type";
import Loading from "../Loading";

export default function RandomQuoteComponentV2() {
  const [weather, setWeather] = useState<MeteoWeatherType>();
  async function getWeather() {
    const res = await fetch(ENV_CONFIG.METEO_WEATHER_URL);
    const data = await res.json();
    setWeather(data);
  }

  const { data, isLoading } = useQuery<QuoteType>({
    queryKey: [QUERY_KEY.quote.RANDOM_ONE],
    queryFn: apiQuoteRandomOne,
    // refetchInterval: 1000 * 60 * 5,
    // refetchOnWindowFocus: false,
  });
  useEffect(() => {
    getWeather();
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
      {weather && (
        <div className="weather flex gap-8 px-8 h-44 w-full text-black absolute bottom-2 z-50">
          <div className="bg-[#409AC7] w-full h-full rounded-xl flex items-center">
            <div className="flex-1 h-full flex justify-between overflow-hidden">
              <div className="flex flex-col w-full flex-1 items-center">
                <p className="text-white font-black text-4xl mt-2 flex items-center gap-2 underline underline-offset-2">
                  ĐÔNG HÀ
                </p>
                <p className="text-white text-3xl italic">
                  {format(new Date(weather.current.time), "EEEEEE, dd/MM", { locale: vi })}
                </p>
                <img
                  src={`/images/weather/${convertWeatherIcon(weather.current.weather_code, weather.current.is_day)}.svg`}
                  alt=""
                  className="bg-cover bg-center h-2/3 -mt-4"
                />
              </div>
              <div className="flex flex-col h-full justify-evenly w-1/2 items-center ">
                <p className="text-white text-7xl font-black">
                  {weather.current.temperature_2m.toFixed(0)}&deg;C
                </p>
                <p className="text-white text-2xl">
                  {convertWeatherDescription(weather.current.weather_code)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 w-2/3 gap-4 h-full p-2">
              {weather.daily.time.map((_, index) => {
                if (index !== 0 && index < 6) {
                  return (
                    <div
                      key={index}
                      className="flex flex-col h-full items-center text-2xl bg-gray-100 border-2 overflow-hidden rounded-xl rounded-tl-none"
                    >
                      <div className="font-semibold w-full bg-[#409AC7] text-white flex justify-between">
                        <span className="w-10 border-r-2 text-white text-center font-bold">
                          {format(new Date(weather.daily.time[index]), "dd", { locale: vi })}
                        </span>
                        <span className="text-center flex-1">
                          {format(new Date(weather.daily.time[index]), "EEEE", { locale: vi })}
                        </span>
                      </div>
                      <div className="h-full w-full flex flex-col items-center justify-evenly p-1">
                        <img
                          className="w-16 border-2 rounded-full border-orange-500 bg-[#409AC7]"
                          src={`/images/weather/${convertWeatherIcon(weather.daily.weather_code[index], 0)}.svg`}
                          alt=""
                        />
                        <p className="text-base line-clamp-1">
                          {convertWeatherDescription(weather.daily.weather_code[index])}
                        </p>
                        <div className="flex text-xl gap-1">
                          <span className="font-bold">
                            {weather.daily.temperature_2m_min[index].toFixed(0)}&deg;C
                          </span>
                          <span>/</span>
                          <span className="font-bold">
                            {weather.daily.temperature_2m_max[index].toFixed(0)}&deg;C
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
      {/* {weather && (
        <div className="hidden weather flex gap-8 px-8 h-44 w-full text-black absolute bottom-2 z-50">
          <div className="bg-[#32B3D1] border-2 text-white rounded-2xl shadow-2xl w-1/2 flex items-center p-2">
            <div className="flex flex-col justify-between items-center h-full">
              <p className="uppercase text-5xl font-extrabold">ĐÔNG HÀ</p>
              <p className="uppercase text-3xl ">{format(new Date(), "EEEE", { locale: vi })}</p>
              <p className="uppercase text-3xl ">
                {format(new Date(), "dd/MM/yyyy", { locale: vi })}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center mx-auto">
              <img
                src={`/images/weather/${convertWeatherIcon(weather.current.weather_code, weather.current.is_day)}.svg`}
                alt=""
                className="w-30 h-30 bg-orange-200 my-auto bg-cover bg-center rounded-full border-2"
              />
            </div>
            <div className="flex flex-col justify-around items-center h-full ml-auto mx-4 flex-1 max-w-2/5">
              <p className="text-8xl text-center font-black text-[#fff]">
                {weather.current.temperature_2m.toFixed(0)}&deg;C
              </p>
              <p className="capitalize text-center text-2xl font-semibold bg-white text-black px-2 py-1 w-full line-clamp-1">
                {convertWeatherDescription(weather.current.weather_code)}
              </p>
            </div>
          </div>
          <div className="bg-[#32B3D1] border-2 text-white rounded-2xl shadow-2xl w-1/2 grid grid-cols-5">
            {weather.daily.time.map((_, index) => {
              if (index !== 0 && index < 6) {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-around gap-2 text-2xl p-1"
                  >
                    <div className="font-semibold bg-white text-black px-2 rounded shadow-2xl">
                      <span>
                        {format(new Date(weather.daily.time[index]), "eeee", { locale: vi })}
                      </span>
                    </div>
                    <img
                      className="w-20 border rounded-full border-white"
                      src={`/images/weather/${convertWeatherIcon(weather.daily.weather_code[index], 0)}.svg`}
                      alt=""
                    />
                    <div className="flex text-xl gap-1">
                      <span className="font-bold">
                        {weather.daily.temperature_2m_min[index].toFixed(0)}&deg;C
                      </span>
                      <span>/</span>
                      <span className="font-bold">
                        {weather.daily.temperature_2m_max[index].toFixed(0)}&deg;C
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )} */}
    </div>
  );
}
