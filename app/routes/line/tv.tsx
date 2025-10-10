import { useEffect, useState } from "react";
import TvComponent from "~/components/Line/TvComponent";
import TVFreeTimeComponent from "~/components/Line/TVFreeTime";
import { timeAfter, timeBefore } from "~/lib/helpers";
import { linesList } from "~/lib/variables";
import type { Route } from "./+types/tv";

export async function loader({ params: { line } }: Route.LoaderArgs) {
  return line.toLocaleUpperCase();
}

export function meta({ params: { line } }: Route.MetaArgs) {
  return [
    { title: "TV " + (linesList.find((l) => l.value === line)?.name || "") },
    { name: "description", content: "TV " + (linesList.find((l) => l.value === line)?.name || "") },
  ];
}

export default function TVPage({ loaderData: line }: Route.ComponentProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (
    timeAfter("17:10:00", currentTime) ||
    (timeAfter("11:20:00", currentTime) && timeBefore("12:35:00", currentTime)) ||
    timeBefore("07:25:00", currentTime)
  ) {
    return <TVFreeTimeComponent currentTime={currentTime} />;
  }
  return <TvComponent line={line} currentTime={currentTime} />;
}
