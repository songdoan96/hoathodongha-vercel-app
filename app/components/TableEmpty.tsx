import { Ban } from "lucide-react";

function TableEmpty() {
  return (
    <div className="flex justify-center items-center gap-4">
      <Ban color="#f00" />
      <span className="uppercase text-2xl">Không tìm thấy dữ liệu.</span>
    </div>
  );
}

export default TableEmpty;
