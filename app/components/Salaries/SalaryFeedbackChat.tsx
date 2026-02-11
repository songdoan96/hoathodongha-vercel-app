import { format } from "date-fns";
import type { SalariesType } from "~/types/salaries-type";

export default function SalaryFeedbackChat({ salary }: { salary: SalariesType }) {
  return (
    <div className="flex flex-col gap-1">
      {salary.salaryNotes?.map((chat) => (
        <div key={chat.id} className={!chat.isEmployee ? "items-end flex justify-end" : ""}>
          <div className="flex gap-2 items-center">
            <div
              className={`w-8 h-8  rounded-full flex justify-center items-center ${chat.isEmployee ? "bg-gray-500" : "order-1 bg-blue-300"}`}
            >
              <span className={`font-semibold ${chat.isEmployee ? "text-white" : "text-blue-700"}`}>
                {chat.isEmployee ? salary.hoten.split(" ").pop()?.charAt(0) : "KT"}
              </span>
            </div>
            <div
              className={`${chat.isEmployee ? "bg-white" : "bg-blue-100"} border p-1 px-4 rounded-xl`}
            >
              <p className="mb-1">{chat.chat}</p>
              <p className="text-[10px]">{format(chat.createdAt, "HH:mm dd/MM/yyyy")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
