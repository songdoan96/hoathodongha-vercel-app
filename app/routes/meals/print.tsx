import { addDays, format } from "date-fns";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useMealsPrintNextDay } from "~/hooks/meals-hook";
import routers from "~/lib/routers";
import { linesListFilterSortName } from "~/lib/variables";

export default function MealsPrint() {
  const [searchParams, setSearchParams] = useSearchParams();
  const day = searchParams.get("day") || format(addDays(new Date(), 1), "yyyy-MM-dd");
  const { data: meal, isLoading } = useMealsPrintNextDay(day);
  if (isLoading) return <Loading />;
  const preDay = format(addDays(new Date(day), -1), "yyyy-MM-dd");
  const nextDay = format(addDays(new Date(day), 1), "yyyy-MM-dd");
  return (
    <div>
      <HeaderComponent logoLink={routers().meals.dashboard}>
        <h1 className="uppercase text-2xl text-white font-semibold mx-auto">
          Số lượng ăn sáng ngày
          <span className="ml-2 p-1 font-bold bg-blue-50 text-blue-700">
            {format(new Date(day), "dd/MM")}
          </span>
        </h1>
      </HeaderComponent>
      <div className="w-full">
        {meal && (
          <table className="table w-full bg-white lg:max-w-2xl mx-auto">
            <thead>
              <tr className="uppercase">
                <th className="border border-black text-center p-2 bg-blue-100 text-blue-700 font-semibold">
                  BỘ PHẬN
                </th>
                <th className="border border-black text-center p-2 bg-blue-100 text-blue-700 font-semibold">
                  {meal?.first}
                </th>
                <th className="border border-black text-center p-2 bg-blue-100 text-blue-700 font-semibold">
                  {meal?.second}
                </th>
                <th className="border border-black text-center p-2 bg-blue-100 text-blue-700 font-semibold">
                  Tổng
                </th>
                <th className="border border-black text-center p-2 bg-blue-100 text-blue-700 font-semibold">
                  Số phiếu
                </th>
              </tr>
            </thead>
            <tbody>
              {linesListFilterSortName.map((line, index) => {
                const findMealLine = meal?.mealLines?.find((ml) => ml.bophan === line.value);
                return (
                  <tr key={index} className="odd:bg-gray-100">
                    <td className="border border-black p-1 pl-1 lg:pl-4 truncate">
                      <div className="flex">
                        <span className="w-6">{index + 1}.</span>
                        <span>{line.name}</span>
                      </div>
                    </td>
                    <td className="border border-black p-1 text-center">
                      {findMealLine?.firstQty}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {findMealLine?.secondQty}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {findMealLine && findMealLine.firstQty + findMealLine.secondQty}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {findMealLine && (findMealLine.firstQty + findMealLine.secondQty) * 3}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-blue-100 text-blue-700 font-semibold">
                <td className="border border-black p-1 text-center uppercase font-semibold">
                  Tổng
                </td>
                <td className="border border-black p-1 text-center">
                  {meal?.mealLines?.reduce((total, ml) => total + ml.firstQty, 0)}
                </td>
                <td className="border border-black p-1 text-center">
                  {meal?.mealLines?.reduce((total, ml) => total + ml.secondQty, 0)}
                </td>
                <td className="border border-black p-1 text-center">
                  {meal?.mealLines?.reduce((total, ml) => total + ml.firstQty + ml.secondQty, 0)}
                </td>
                <td className="border border-black p-1 text-center">
                  {meal?.mealLines?.reduce(
                    (total, ml) => total + (ml.firstQty + ml.secondQty) * 3,
                    0,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}

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
