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
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useMealsFindAll } from "~/hooks/meals-hook";
import routers from "~/lib/routers";
import { linesListFilterSortName } from "~/lib/variables";

function MealsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const { data: meals, isLoading } = useMealsFindAll(format(month, "yyyy-MM-dd"));
  const mealLines = meals?.flatMap((meal) => meal.mealLines);
  const prevMonth = format(subMonths(new Date(month), 1), "yyyy-MM");
  const nextMonth = format(addMonths(new Date(month), 1), "yyyy-MM");

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent>
        <h1 className="uppercase text-2xl text-white font-semibold mx-auto">
          Đăng ký ăn sáng tháng {format(month, "MM/yyyy")}
        </h1>
        <Link to={routers().meals.print} className="mr-2">
          <Printer color="#fff" />
        </Link>
      </HeaderComponent>
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
                  return (
                    <tr
                      key={index}
                      className={`${isSameDay(day, new Date()) ? "bg-yellow-50 font-semibold text-blue-900" : ""}`}
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
                          <span className="border-b truncate pl-1">
                            {meals?.find((meal) => isSameDay(meal.ngay, day))?.first}
                          </span>
                          <span className="truncate pl-1">
                            {meals?.find((meal) => isSameDay(meal.ngay, day))?.second}
                          </span>
                        </div>
                      </td>
                      {linesListFilterSortName.map((line, index) => {
                        const meal = meals?.find((meal) => isSameDay(meal.ngay, day));
                        return (
                          <td key={index} className="border border-black">
                            <div className="flex flex-col">
                              <span className="border-b text-center">
                                {
                                  meal?.mealLines.find((mealLine) => mealLine.bophan === line.value)
                                    ?.firstQty
                                }
                              </span>
                              <span className="text-center">
                                {
                                  meal?.mealLines.find((mealLine) => mealLine.bophan === line.value)
                                    ?.secondQty
                                }
                              </span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="border border-black text-center">
                        {(findMealDay?.reduce(
                          (total, meal) =>
                            total +
                            meal.mealLines.reduce(
                              (t, mealLine) => t + mealLine.firstQty + mealLine.secondQty,
                              0,
                            ),
                          0,
                        ) || 0) * 3}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index} className="bg-red-50 text-red-700 font-semibold uppercase">
                      <td className="border border-black p-1">{format(day, "dd/MM")}</td>
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
                    {(mealLines?.reduce(
                      (total, mealLine) =>
                        mealLine.bophan === line.value
                          ? total + mealLine.firstQty + mealLine.secondQty
                          : total,
                      0,
                    ) || 0) * 3}
                  </td>
                );
              })}
              <td className="border border-black text-center p-1 bg-red-200 ">
                {(meals?.reduce(
                  (total, meal) =>
                    total +
                    meal.mealLines.reduce(
                      (t, mealLine) => t + mealLine.firstQty + mealLine.secondQty,
                      0,
                    ),
                  0,
                ) || 0) * 3}
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
