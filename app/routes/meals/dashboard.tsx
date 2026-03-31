import { eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useMealsFindAll } from "~/hooks/meals-hook";
import { linesListFilter } from "~/lib/variables";

function MealsDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = new Date(searchParams.get("month") || format(new Date(), "yyyy-MM"));
  const { data, isLoading } = useMealsFindAll(format(month, "yyyy-MM-dd"));
  const [meals, setMeals] = useState<{ ngay: string; first: string; second: string }[]>([]);

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent>a</HeaderComponent>
      <div className="w-full overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr className="uppercase">
              <th className="border p-2">Ngày</th>
              <th className="border p-2">Món</th>
              {linesListFilter.map((line) => (
                <th className="border p-2 px-0.5">{line.value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(
              (day, index) => {
                if (getDay(day) !== 0) {
                  return (
                    <tr key={index} className={`${getDay(day) === 0 ? "bg-red-50" : ""}`}>
                      <td className="border p-1 truncate">{format(day, "dd-MM")}</td>
                      <td className="border px-0.5">
                        <div className="flex flex-col justify-center">
                          <span className="border-b truncate">
                            {data?.find((meal) => isSameDay(meal.ngay, day))?.first}
                          </span>
                          <span className="truncate">
                            {data?.find((meal) => isSameDay(meal.ngay, day))?.second}
                          </span>
                        </div>
                      </td>
                      {linesListFilter.map((line) => (
                        <td key={line.name} className="border">
                          <div className="flex flex-col">
                            <span className="border-b text-center">1</span>
                            <span className="text-center">2</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index} className="bg-red-50 text-red-700 font-semibold">
                      <td className="border p-2">{format(day, "dd/MM")}</td>
                      <td colSpan={linesListFilter.length + 1} className="text-center text-xl">
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
