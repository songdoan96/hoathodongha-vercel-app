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
import React from "react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { useMealsFindAll } from "~/hooks/meals-hook";
import routers from "~/lib/routers";
import { linesListFilterSortName } from "~/lib/variables";

export function meta() {
  return [{ title: "CHI TIẾT ĂN SÁNG" }];
}

function MealsExport() {
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
              <th className="border border-black p-1">Tổ</th>
              {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(
                (day, index) => {
                  return (
                    <th key={index} className="border border-black p-1 text-sm">
                      {format(day, "dd/MM")}
                    </th>
                  );
                },
              )}
            </tr>
          </thead>
          <tbody>
            {linesListFilterSortName.map((line, index) => {
              return (
                <tr key={index}>
                  <td className="border border-black p-1 text-center">{line.sortName}</td>
                  {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(
                    (day, _) => {
                      const findMealDay = meals?.find((meal) => isSameDay(meal.ngay, day));
                      const mealLine = findMealDay?.mealLines.find(
                        (mealLine) => mealLine.bophan === line.value,
                      );
                      return (
                        <td key={_} className="border border-black p-1 text-sm text-center">
                          {mealLine
                            ? mealLine.firstQty * 3 +
                              mealLine.secondQty * (findMealDay?.isSpecial ? 4 : 3) +
                              mealLine.thirdQty!
                            : null}
                        </td>
                      );
                    },
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MealsExport;
