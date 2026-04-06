import { addDays, format } from "date-fns";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import PrintComponent from "~/components/Meals/Print";
import routers from "~/lib/routers";

export function meta() {
  return [{ title: "ĂN SÁNG IN" }];
}

export default function MealsPrint() {
  const [searchParams, setSearchParams] = useSearchParams();
  const day = searchParams.get("day") || format(addDays(new Date(), 1), "yyyy-MM-dd");
  const preDay = format(addDays(new Date(day), -1), "yyyy-MM-dd");
  const nextDay = format(addDays(new Date(day), 1), "yyyy-MM-dd");
  return (
    <div>
      <HeaderComponent logoLink={routers().meals.dashboard}>
        <h1 className="uppercase text-2xl text-white font-semibold mx-auto text-center">
          Số lượng ăn sáng ngày
          <span className="ml-2 p-1 font-bold bg-blue-50 text-blue-700">
            {format(new Date(day), "dd/MM")}
          </span>
        </h1>
      </HeaderComponent>
      <div className="w-full">
        {<PrintComponent day={day} />}
        <div className="flex justify-between my-4 lg:max-w-2xl mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-2 py-2 rounded"
            onClick={() => {
              setSearchParams({
                day: preDay,
              });
            }}
          >
            <ChevronsLeft />
            <span>{format(preDay, "dd/MM")}</span>
          </button>
          <button
            //   disabled={month === format(new Date(), "yyyy-MM")}
            className={`bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-2 py-2 rounded`}
            onClick={() => {
              setSearchParams({
                day: nextDay,
              });
            }}
          >
            <span>{format(nextDay, "dd/MM")}</span>
            <ChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
}
