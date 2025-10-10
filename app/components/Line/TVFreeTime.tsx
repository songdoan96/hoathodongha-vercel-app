import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { apiWelcomeGetAll } from "~/apis/welcome.api";
import ENV_CONFIG from "~/lib/env";
import { QUERY_KEY } from "~/lib/queryKey";
import type { WelcomeType } from "~/types/welcome.type";
import RandomQuoteComponentV2 from "./RandomQuoteV2";
import Loading from "../Loading";

export default function TVFreeTimeComponent({ currentTime }: { currentTime: Date }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading } = useQuery<WelcomeType[]>({
    queryKey: [QUERY_KEY.welcome.WELCOME_FIND_ALL],
    queryFn: apiWelcomeGetAll,
  });
  useEffect(() => {
    if (!data || data.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    }, 300000);
    return () => clearInterval(interval);
  }, [currentTime]);
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <>
      {data?.length ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <img
            className="w-full h-full bg-cover bg-center"
            src={ENV_CONFIG.LARAVEL_URL + "/storage/" + data[currentIndex].path}
            alt="Ảnh"
          />
        </div>
      ) : (
        <RandomQuoteComponentV2 />
      )}
    </>
  );
}
