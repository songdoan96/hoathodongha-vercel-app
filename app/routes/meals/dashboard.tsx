import { eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useMealsFindAll } from "~/hooks/meals-hook";
import { linesListFilterSortName } from "~/lib/variables";

function MealsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = new Date(searchParams.get("month") || format(new Date(), "yyyy-MM"));
  const { data: meals, isLoading } = useMealsFindAll(format(month, "yyyy-MM-dd"));

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent>a</HeaderComponent>
      <div className="w-full overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr className="uppercase text-blue-800">
              <th className="border p-1">Ngày</th>
              <th className="border p-1">Món</th>
              {linesListFilterSortName.map((line, index) => (
                <th key={index} className="border p-1 px-0.5">
                  {line.sortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(
              (day, index) => {
                if (getDay(day) !== 0) {
                  return (
                    <tr
                      key={index}
                      className={`${isSameDay(day, new Date()) ? "bg-yellow-50" : ""}`}
                    >
                      <td className="border p-1 truncate font-semibold">{format(day, "dd-MM")}</td>
                      <td className="border">
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
                          <td key={index} className="border">
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
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index} className="bg-red-50 text-red-700 font-semibold">
                      <td className="border p-1">{format(day, "dd/MM")}</td>
                      <td
                        colSpan={linesListFilterSortName.length + 1}
                        className="text-center text-xl"
                      >
                        {format(day, "EE", { locale: vi })}
                      </td>
                    </tr>
                  );
                }
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MealsDashboard;
