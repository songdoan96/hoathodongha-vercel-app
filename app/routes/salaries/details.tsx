import { addMonths, format, subMonths } from "date-fns";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon, Ban } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useSalariesDetails, useSalaryCreateNote } from "~/hooks/salaries-hook";
import { formatMoney } from "~/lib/helpers";

export function meta() {
  return [
    { title: "Chi tiết lương trong tháng" },
    { name: "description", content: "Chi tiết lương trong tháng" },
  ];
}

function SalaryDetailsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mutationCreateNote = useSalaryCreateNote();
  const [note, setNote] = useState("");
  const msnv = searchParams.get("msnv");
  const cccd = searchParams.get("cccd");
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  if (!msnv || !cccd || !month) {
    return null;
  }
  const { data, isLoading } = useSalariesDetails({
    msnv,
    cccd,
    month: format(month, "yyyy-MM"),
  });
  const salaryInfo = data?.salary;
  const noteInfo = data?.note;
  console.log("🚀 ~ SalaryDetailsPage ~ noteInfo:", noteInfo);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (note && salaryInfo?.id) {
      mutationCreateNote.mutate({
        note,
        salaryId: salaryInfo.id,
      });
    }
  }
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="bg-[#ebeaea] h-full w-full min-h-screen">
      <div className="bg-blue-500 flex items-center p-2">
        <img src="/images/logo.png" className="w-8" alt="Logo" />
        <h1 className="text-xl md:text-2xl text-center text-white font-semibold flex-1 justify-center items-center">
          CÔNG TY MAY HOÀ THỌ ĐÔNG HÀ
        </h1>
      </div>
      <div className="p-2 flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-2 flex gap-8 items-center justify-between md:justify-end rounded">
          <span>Xem lương tháng:</span>
          <input
            type="month"
            className="p-1 border"
            value={month}
            onChange={(e) =>
              setSearchParams({
                month: e.target.value,
                msnv,
                cccd,
              })
            }
          />
        </div>
        <div className="bg-white p-2 rounded">
          <div className="text-center mb-8 flex gap-2 md:gap-8 justify-center items-center">
            <button
              onClick={() =>
                setSearchParams({
                  month: format(subMonths(month, 1), "yyyy-MM"),
                  msnv,
                  cccd,
                })
              }
            >
              <ArrowLeftSquareIcon color="#f00" />
            </button>
            <h1 className="text-xl font-bold uppercase tracking-wider">
              PHIẾU CHI TIẾT LƯƠNG THÁNG {format(month, "MM/yyyy")}
            </h1>
            <button
              onClick={() =>
                setSearchParams({
                  month: format(addMonths(month, 1), "yyyy-MM"),
                  msnv,
                  cccd,
                })
              }
            >
              <ArrowRightSquareIcon color="#f00" />
            </button>
          </div>
          {salaryInfo ? (
            <div className="p-2">
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex gap-2">
                  <span className="font-semibold">Họ và tên:</span>
                  <span>{salaryInfo.hoten}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Tổ/BP:</span>
                  <span>{salaryInfo.to}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">MSNV:</span>
                  <span>{salaryInfo.msnv}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Lương tối thiểu:</span>
                  <span>{formatMoney(salaryInfo.luong_toi_thieu_cty)}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Ngày công bình thường:</span>
                  <span className="text-right">{salaryInfo.ngay_cong_binh_thuong}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Giờ công chủ nhật:</span>
                  <span className="text-right">{salaryInfo.gio_cong_chu_nhat}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Giờ công tăng ca:</span>
                  <span className="text-right">{salaryInfo.gio_cong_tang_ca}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Ngày, Giờ tăng ca 3:</span>
                  <span className="text-right">{salaryInfo.ngay_gio_cong_ca_dem_ca3 || 0}</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2 uppercase">I. Tiền lương</h2>
                <div className="mb-2">
                  <div className="font-semibold flex">
                    <span className="flex-1 text-center md:text-left">
                      1. Tiền lương sản phẩm theo công đoạn sản xuất:
                    </span>
                    <span className="w-1/3 text-right">
                      {formatMoney(salaryInfo.tien_luong_sp_theo_cong_doan)}
                    </span>
                  </div>
                  <div className="pl-6 space-y-1 mt-1 text-[15px]">
                    <div className="flex justify-between">
                      <span className="w-full">- Tiền lương sản phẩm trong giờ:</span>
                      <span>{formatMoney(salaryInfo.tien_luong_sp_trong_gio)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Tiền lương tăng ca, cn, ca 3:</span>
                      <span>{formatMoney(salaryInfo.tien_luong_tang_ca_cn_ca3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Ca 3, đêm:</span>
                      <span>{formatMoney(salaryInfo.phu_cap_ca3_ca_dem)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Tiền lương huấn luyện cn mới / bổ sung lương:</span>
                      <span>{formatMoney(salaryInfo.bo_sung_luong_qd_943)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-1 border-t border-gray-300 mt-2">
                      <span>**Tổng tiền lương sp:</span>
                      <span>{formatMoney(salaryInfo.tong_cong_tien_luong_sp)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-[15px]">
                  <div className="flex gap-2 items-center justify-between">
                    <span>
                      <b>2.</b> Giờ nghỉ ăn ca:
                    </span>
                    <span>{salaryInfo.so_gio_nghi_tang_ca}</span>
                  </div>
                  <div className="flex gap-2 items-center justify-between ml-4">
                    <span>Tiền lương nghỉ ăn ca:</span>
                    <span>{formatMoney(salaryInfo.tien_luong_nghi_an_tang_ca)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-semibold">3. Các khoản phụ cấp tiền lương:</div>
                  <div className="pl-2 md:pl-6 space-y-1 mt-1 text-[15px]">
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương 1.5 giờ hành kinh cho phụ nữ:</span>
                      <span>{salaryInfo.tien_luong_1h5_hanh_kinh_nu}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Số giờ cho con bú dưới 1t, thai &gt;7t:</span>
                      <span>{salaryInfo.so_gio_cho_con_bu_thai_tren_7_thang || 0}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Số giờ bắt đầu mang thai:</span>
                      <span>{salaryInfo.so_gio_thai_duoi_7_thang || 0}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương con nhỏ dưới 1 tuổi, có thai:</span>
                      <span>{formatMoney(salaryInfo.tien_luong_1h_cho_con_bu)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ CN có con nhỏ dưới 1 tuổi:</span>
                      <span>
                        {formatMoney(salaryInfo.ho_tro_10_phan_tram_luong_sp_con_duoi_12_thang)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ công nhân mới:</span>
                      <span>{formatMoney(salaryInfo.ho_tro_cn_moi_thang_1_2)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương học tập huấn luyện PCCC, khám sức khỏe 0.5h:</span>
                      <span>{formatMoney(salaryInfo.tien_gio_hoc_tap_huan_luyen)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền thưởng chuyên cần:</span>
                      <span>{formatMoney(salaryInfo.tien_thuong_chuyen_can)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Bổ sung lương theo ngày công:</span>
                      <span>{formatMoney(salaryInfo.bo_sung_luong_theo_ngay_cong)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ tiền xăng xe:</span>
                      <span>{salaryInfo.ho_tro_tien_xang_xe}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Giờ nghỉ ngắn:</span>
                      <span>{salaryInfo.gio_nghi_ngan}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương nghỉ ngắn:</span>
                      <span>{formatMoney(salaryInfo.tien_luong_nghi_ngan)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ con đi nhà trẻ:</span>
                      <span>{formatMoney(salaryInfo.tien_ho_tro_con_nha_tre)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ lương, bổ sung lương:</span>
                      <span>{formatMoney(salaryInfo.ho_tro_luong)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ nóng:</span>
                      <span>{formatMoney(salaryInfo.phu_cap_nong)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mb-3 text-[15px]">
                  <div>
                    <b>4.</b> Phụ cấp mạng lưới atvsv:
                  </div>
                  <div>{formatMoney(salaryInfo.bo_sung_luong)}</div>
                </div>

                <div className="flex justify-between font-bold text-base border-t border-gray-400 pt-2">
                  <div>
                    <b>5.</b> Tổng cộng tiền lương: (1+2+...+4):
                  </div>
                  <div>
                    {formatMoney(salaryInfo.tong_cong_tien_luong_sp_bu_luong_toi_thieu)} (*)
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-[15px]">
                <div className="flex justify-between">
                  <div>
                    <b>6.</b> Tiền lương bù:
                  </div>
                  <div>{formatMoney(salaryInfo.tien_luong_bu)}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>7.</b> Hoàn trả 17.5% BHXH + 1% BHTN + 3% BHYT:
                  </div>
                  <div>{formatMoney(salaryInfo.hoan_tra_bhxh_bhtn_bhyt)} (*)</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>8.</b> Tổng cộng tiền lương nghỉ chế độ:
                  </div>
                  <div>{salaryInfo.ngay_che_do}</div>
                </div>
                <div className="pl-6 space-y-1 flex flex-col">
                  <div className="flex gap-2 justify-between">
                    <span>- Ngày chế độ năm {format(salaryInfo.thang, "yyyy")}:</span>
                    <span>{salaryInfo.ngay_che_do}</span>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span>- Ngày phép năm {format(salaryInfo.thang, "yyyy")}:</span>
                    <span>{salaryInfo.ngay_phep_nam || 0}</span>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span>- Tiền lương phép, lễ chế độ:</span>
                    <span>{formatMoney(salaryInfo.tien_luong_phep)} (*)</span>
                  </div>
                </div>
              </div>

              <div className="font-bold text-lg mb-4 border-t border-gray-400 pt-3">
                II. Tổng cộng tiền lương tháng: (5+6+7+8):
                <span className="float-right">{formatMoney(salaryInfo.tong_cong_tien_luong)}</span>
              </div>

              <div className="flex justify-between mb-3 text-[15px]">
                <div className="font-bold text-lg mb-2">III. Lương bốc xếp:</div>
                <div>{formatMoney(salaryInfo.boc_xep)}</div>
              </div>

              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2 uppercase">IV. Các khoản khấu trừ:</h2>
                <div className="space-y-1.5 text-[15px]">
                  <div className="flex justify-between">
                    <span>- Trừ ứng:</span>
                    <span>{formatMoney(salaryInfo.tru_ung_truy_thu)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- 8% BHXH + 1,5% BHYT + 1% BHTN:</span>
                    <span>{formatMoney(salaryInfo.bhxh_bhtn_bhyt)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-5 rounded-lg font-bold text-xl border border-gray-300">
                <div className="flex justify-between items-center">
                  <span>V. Số tiền lương còn lại được nhận: (II-III)</span>
                  <span className="text-blue-700">
                    {formatMoney(salaryInfo.tien_luong_thuc_linh)}
                  </span>
                </div>
              </div>

              <div className="mt-8 text-sm text-red-700 italic border-t border-gray-300 pt-4">
                Lưu ý: Nếu CBCNV nào có thắc mắc nộp lại tổ trưởng, tổ trưởng tập hợp nộp kế toán
                tiền lương để được giải thích rõ.
              </div>
              <div className="text-sm text-red-700 italic mt-2">
                (Hoặc có thể nhập nội dung thắc mắc vào bên dưới, rồi bấm <b>Khiếu nại</b>)
              </div>
              <div className="my-4">
                <div className="">
                  <form onSubmit={handleSubmit} className="flex items-center gap-4">
                    <Input
                      onChange={(e) => setNote(e.target.value)}
                      type="text"
                      required
                      className="border border-blue-500"
                    />
                    <Button type="submit">Khiếu nại</Button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center justify-center font-semibold text-red-700 text-2xl flex gap-4 items-center my-12 border-2 border-red-700 py-8 rounded-xl">
              <Ban /> <span>Không tìm thấy thông tin tra cứu</span>
            </div>
          )}
          <div className="my-4">
            {noteInfo?.map((note, idx) => (
              <div key={note.id} className="font-semibold text-red-700">
                {idx + 1}. {note.note}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen p-2 font-sans">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 p-2">
          <div className="bg-blue-600 text-white p-2 text-center font-bold tracking-wide flex flex-col gap-2 items-center justify-between hidden">
            <Link to={"/"}>
              <img src="/images/logo.png" className="w-12" alt="" />
            </Link>
            <h1 className="text-2xl md:text-3xl">CÔNG TY MAY HOÀ THỌ ĐÔNG HÀ</h1>
          </div>
        </div>
      </div> */}

      {/* <div className="max-w-4xl mx-auto p-2">
        <div className="header grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 text-gray-600 ">
          <div className="border-2 border-blue-500 p-2 text-center md:text-left md:p-8 rounded-2xl flex flex-col gap-2 bg-white shadow">
            <h3 className="uppercase font-bold">Tổng thu nhập {getYear(currentMonth)}</h3>
            <h1 className="text-blue-600 font-bold text-2xl">{formatMoney(totalSalary)}</h1>
          </div>
          <div className="border-2 border-blue-500 p-2 text-center md:text-left md:p-8 rounded-2xl flex flex-col gap-2 bg-white shadow">
            <h3 className="uppercase font-bold">TNBQ {getYear(currentMonth)}</h3>
            {data && (
              <h1 className="text-green-600 font-bold text-2xl">
                {formatMoney(totalSalary / data.length)}
              </h1>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default SalaryDetailsPage;
