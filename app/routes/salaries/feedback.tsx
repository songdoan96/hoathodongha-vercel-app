import { format, subMonths } from "date-fns";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { useSalariesFeedback } from "~/hooks/salaries-hook";

function SalaryFeedback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(subMonths(new Date(), 1), "yyyy-MM");
  const { data: salaries, isLoading } = useSalariesFeedback(month);
  return (
    <div className="bg-[#f4f7fd] min-h-screen w-screen flex flex-col">
      <div className="bg-primary p-1 flex items-center gap-2">
        <Link to="/luong">
          <img src="/images/logo.png" className="w-8 md:w-10" alt="Logo" />
        </Link>
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-white font-bold text-2xl text-center uppercase">Phản hồi lương</h1>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <Loading fullScreen />
        ) : (
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body bg-white">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium border">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium border">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium border">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium border">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium border">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {salaries &&
                  salaries.map((salary) => (
                    <tr key={salary.id} className="bg-neutral-primary border-b border-default">
                      <th
                        scope="row"
                        className="px-6 py-4 border font-medium text-heading whitespace-nowrap"
                      >
                        {salary.to}
                      </th>
                      <td className="px-6 py-4 border">{salary.hoten}</td>
                      <td className="px-6 py-4 border">{salary.msnv}</td>
                      <td className="px-6 py-4 border">{salary.tien_luong_thuc_linh}</td>
                      <td className="px-6 py-4 border">
                        <div className="flex">
                          {salary.salaryNotes?.map((note) => (
                            <div key={note.id} className="mr-2 p-2 bg-yellow-100 rounded">
                              <p className="text-sm font-semibold">{note.note}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaryFeedback;
