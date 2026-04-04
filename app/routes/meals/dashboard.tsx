import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { vi } from "date-fns/locale/vi";
import { ChevronsLeft, ChevronsRight, Printer } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { useMealsFindAll } from "~/hooks/meals-hook";
import routers from "~/lib/routers";
import { linesListFilterSortName } from "~/lib/variables";

function MealsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const { data: meals, isLoading } = useMealsFindAll(format(month, "yyyy-MM-dd"));
  const prevMonth = format(subMonths(new Date(month), 1), "yyyy-MM");
  const nextMonth = format(addMonths(new Date(month), 1), "yyyy-MM");

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <div className="bg-blue-600 text-white flex flex-wrap items-center justify-between p-2 gap-2">
        <Link to={routers().meals.print} className="w-8">
          <img src="/images/logo.png" className="w-full" alt="" />
        </Link>
        <h1 className="uppercase text-lg lg:text-2xl text-white font-semibold mx-auto text-center">
          ăn sáng tháng 04/2026
        </h1>
        <Link to={routers().meals.print} className="">
          <Printer color="#fff" />
        </Link>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr className="uppercase text-blue-800">
              <th className="border border-black p-1">Ngày</th>
              <th className="border border-black p-1">Món</th>
              {linesListFilterSortName.map((line, index) => (
                <th key={index} className="border border-black p-1 px-0.5">
                  {line.sortName}
                </th>
              ))}
              <th className="border border-black p-1">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(
              (day, index) => {
                if (getDay(day) !== 0) {
                  const findMealDay = meals?.filter((meal) => isSameDay(meal.ngay, day));
                  const isToday = isSameDay(day, new Date());
                  const findMeal = meals?.find((meal) => isSameDay(meal.ngay, day));
                  return (
                    <tr
                      key={index}
                      className={`${isToday ? "bg-yellow-50 font-semibold text-blue-900" : "bg-gray-100"}`}
                    >
                      <td className="border border-black">
                        <div className="flex flex-col justify-center items-center">
                          <span className="font-semibold text-green-700">
                            {format(day, "dd-MM")}
                          </span>
                          <span>{format(day, "EEEEE", { locale: vi })}</span>
                        </div>
                      </td>
                      <td className="border border-black">
                        <div className="flex flex-col justify-center">
                          <span className="border-b truncate pl-1">{findMeal?.first}</span>
                          <div className="flex items-center gap-1 pl-1">
                            <span className="truncate">{findMeal?.second}</span>
                            {findMeal?.isSpecial && <img src="/images/star.svg" className="w-4" />}
                          </div>
                        </div>
                      </td>

                      {linesListFilterSortName.map((line, index) => {
                        // const meal = meals?.find((meal) => isSameDay(meal.ngay, day));
                        const findMealLine = findMeal?.mealLines.find(
                          (mealLine) => mealLine.bophan === line.value,
                        );
                        return (
                          <td key={index} className="border border-black">
                            <div className="flex flex-col">
                              <span className="border-b text-center">{findMealLine?.firstQty}</span>
                              <span className="text-center">{findMealLine?.secondQty}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="border border-black text-center">
                        {findMealDay?.reduce(
                          (total, meal) =>
                            total +
                            meal.mealLines.reduce(
                              (t, mealLine) =>
                                t +
                                mealLine.firstQty * 3 +
                                (findMeal?.isSpecial
                                  ? mealLine.secondQty * 4
                                  : mealLine.secondQty * 3),
                              0,
                            ),
                          0,
                        )}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index} className="bg-red-50 text-red-700 font-semibold uppercase">
                      <td className="border border-black p-1 text-center">
                        {format(day, "dd/MM")}
                      </td>
                      <td
                        colSpan={linesListFilterSortName.length + 2}
                        className="border border-black text-center text-xl"
                      >
                        {format(day, "EEEE", { locale: vi })}
                      </td>
                    </tr>
                  );
                }
              },
            )}
            <tr className="font-semibold">
              <td className="border border-black text-center bg-blue-200" colSpan={2}>
                TỔNG
              </td>
              {linesListFilterSortName.map((line, index) => {
                return (
                  <td key={index} className="border border-black text-center p-1 bg-blue-200 ">
                    {meals?.reduce((total, meal) => {
                      const isSpecial = meal.isSpecial;
                      const findMealLine = meal.mealLines.find(
                        (mealLine) => mealLine.bophan === line.value,
                      );
                      return (
                        total +
                        (isSpecial
                          ? (findMealLine?.firstQty || 0) * 3 + (findMealLine?.secondQty || 0) * 4
                          : (findMealLine?.firstQty || 0) * 3 + (findMealLine?.secondQty || 0) * 3)
                      );
                    }, 0)}
                  </td>
                );
              })}
              <td className="border border-black text-center p-1 bg-red-200 ">
                {meals?.reduce((total, meal) => {
                  const isSpecial = meal.isSpecial;
                  const mealsLineTotal = meal.mealLines.reduce(
                    (t, l) => t + l.firstQty * 3 + (isSpecial ? l.secondQty * 4 : l.secondQty * 3),
                    0,
                  );
                  return total + mealsLineTotal;
                }, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between px-4 my-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded"
          onClick={() => {
            setSearchParams({
              month: prevMonth,
            });
          }}
        >
          <ChevronsLeft />
          <span>{prevMonth}</span>
        </button>
        <button
          disabled={month === format(new Date(), "yyyy-MM")}
          className={`${month === format(new Date(), "yyyy-MM") ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white flex items-center gap-2 px-4 py-2 rounded`}
          onClick={() => {
            setSearchParams({
              month: nextMonth,
            });
          }}
        >
          <span>{nextMonth}</span>
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}

export default MealsDashboard;
