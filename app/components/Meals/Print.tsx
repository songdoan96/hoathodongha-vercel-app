import { useMealsPrintNextDay } from "~/hooks/meals-hook";
import { linesListFilterSortName } from "~/lib/variables";
import Loading from "../Loading";

export default function PrintComponent({ day }: { day: string }) {
  const { data: meal, isLoading } = useMealsPrintNextDay(day);

  if (isLoading) return <Loading />;
  return (
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
            {meal?.isSpecial && <img src="/images/star.svg" className="w-6 mx-auto" />}
          </th>
          <th className="border border-black text-center p-2 bg-blue-100 text-blue-700 font-semibold">
            Suất ăn
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
              <td className="border border-black p-1 text-center">{findMealLine?.firstQty}</td>
              <td className="border border-black p-1 text-center">{findMealLine?.secondQty}</td>
              <td className="border border-black p-1 text-center">
                {findMealLine && findMealLine.firstQty + findMealLine.secondQty}
              </td>
              <td className="border border-black p-1 text-center">
                {findMealLine &&
                  findMealLine.firstQty * 3 +
                    (meal?.isSpecial ? findMealLine.secondQty * 4 : findMealLine.secondQty * 3)}
              </td>
            </tr>
          );
        })}
        <tr className="bg-blue-100 text-blue-700 font-semibold text-xl">
          <td className="border border-black p-1 text-center uppercase font-semibold">Tổng</td>
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
              (total, ml) =>
                total + (ml.firstQty * 3 + (meal?.isSpecial ? ml.secondQty * 4 : ml.secondQty * 3)),
              0,
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
