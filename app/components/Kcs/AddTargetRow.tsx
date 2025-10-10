import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { apiKCSAddTargetDate, apiKCSUpdate } from "~/apis/kcs.api";
import { QUERY_KEY } from "~/lib/queryKey";
import type { KcType } from "~/types/kcs.type";
import type { PlanType } from "~/types/plan.type";

function AddTargetRowComponent({ plan }: { plan: PlanType }) {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<number | undefined>(plan.kcs?.[0]?.chitieungay);

  const mutation = useMutation({
    mutationFn: (formData: Partial<KcType> & { plan_id?: number }) => apiKCSAddTargetDate(formData),
    retry: false,
    onSuccess: async (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.plan.DOING] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });

  function handleSubmit() {
    if (plan.kcs?.[0]?.id) {
      mutation.mutate({ chitieungay: inputValue, id: plan.kcs[0].id });
    } else {
      mutation.mutate({ chitieungay: inputValue, plan_id: plan.id });
    }
  }
  return (
    <tr className="hover:bg-gray-200 transition">
      <td className="py-1 px-2 border border-black">
        <Link
          title={plan.id.toString()}
          className={`underline font-bold text-lg ${plan.chuyen.startsWith("X1_") ? "text-blue-500" : "text-pink-500"}`}
          to={`/sanxuat/tv/${plan.chuyen}`}
        >
          {plan.chuyen}
        </Link>
      </td>
      <td className="py-1 px-2 border border-black">{plan.khachhang}</td>
      <td className="py-1 px-2 border border-black">{plan.mahang}</td>
      <td className="py-1 px-2 border border-black">{plan.sltacnghiep}</td>
      <td className="py-1 px-2 border border-black">{plan.thuchien}</td>
      <td className="py-1 px-2 border border-black">{plan.nhaphoanthanh}</td>
      <td className="py-1 px-2 border border-black">
        <input
          id={`target-input-${plan.id}`}
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          onKeyDown={(e) => (e.key === "Enter" && inputValue ? handleSubmit() : null)}
          type="number"
          min={0}
          className="w-24 border px-2 border-blue-500"
        />
      </td>
      {/* <td className="py-1 px-2 border border-black">
        <button
          disabled={!inputValue || mutation.isPending}
          type="submit"
          onClick={handleSubmit}
          className={`min-w-20 text-white bg-white-700 ${plan.kcs?.length ? "bg-green-700" : "bg-red-700"} font-medium rounded text-sm w-full sm:w-auto p-1 text-center`}
        >
          {plan.kcs?.length ? "Cập nhật" : "Thêm"}
        </button>
      </td> */}
    </tr>
  );
}

export default memo(AddTargetRowComponent);
