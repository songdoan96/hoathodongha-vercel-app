import { format } from "date-fns";
import { memo } from "react";

function LineClock({ currentTime }: { currentTime: Date }) {
  return (
    <div className="bg-[#1c398e] flex flex-col justify-evenly text-3xl p-2 h-full">
      <div className="flex justify-between">
        <span className="text-[yellow]">Date</span>
        <span>{format(currentTime, "dd/MM")}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[yellow]">Time</span>
        <span id="time" className="min-w-10">
          {format(currentTime, "HH:mm")}
        </span>
      </div>
    </div>
  );
}

export default memo(LineClock);
