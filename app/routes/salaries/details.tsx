import { format } from "date-fns";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useSalariesDetails, useSalaryCreateNote } from "~/hooks/salaries-hook";
import { formatMoney } from "~/lib/helpers";
import useSalaryStore from "~/stores/salary-store";

function SalaryDetailsPage() {
  const { cccd, msnv } = useSalaryStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const [note, setNote] = useState("");
  const { data, isLoading } = useSalariesDetails({
    month,
    msnv,
    cccd,
  });
  const mutationCreateNote = useSalaryCreateNote();
  const { salary, salaries } = data || {};
  const totalIncome =
    salaries?.reduce((acc, salary) => {
      return acc + (salary.tien_luong_thuc_linh || 0);
    }, 0) || 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (note && salary?.id) {
      mutationCreateNote.mutate({
        note,
        salaryId: salary.id,
      });
    }
  }
  return (
    <div className="bg-[#f4f7fd] min-h-screen w-screen flex flex-col">
      <div className="bg-primary p-1 md:p-2 flex items-center gap-2">
        <Link to="/luong">
          <img src="/images/logo.png" className="w-8 md:w-10" alt="Logo" />
        </Link>
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-white font-bold text-[18px] md:text-3xl text-center">
            CTY MAY HOÀ THỌ ĐÔNG HÀ
          </h1>
        </div>
      </div>
      {isLoading && <Loading fullScreen />}
      <div className="w-full md:w-2/3 mx-auto p-2 md:p-4">
        <div className="flex gap-4 items-center p-2 py-4 bg-white mb-4 rounded">
          <div className="flex-1">
            <Input
              type="month"
              value={month}
              onChange={(e) =>
                setSearchParams({
                  month: e.target.value,
                })
              }
            />
          </div>
        </div>
        {salary && (
          <div className="w-full rounded border p-1 md:p-2 bg-white shadow-lg">
            <div className="p-1 md:px-4 bg-white">
              <h1 className="text-xl font-bold uppercase tracking-wider text-center text-blue-900 my-1">
                PHIẾU CHI TIẾT LƯƠNG THÁNG {format(salary.thang, "MM/yyyy")}
              </h1>
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex gap-2">
                  <span className="font-semibold">Họ và tên:</span>
                  <span>{salary.hoten}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Tổ/BP:</span>
                  <span>{salary.to}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">MSNV:</span>
                  <span>{salary.msnv}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Lương tối thiểu:</span>
                  <span>{formatMoney(salary.luong_toi_thieu_cty)}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Ngày công bình thường:</span>
                  <span className="text-right">{salary.ngay_cong_binh_thuong}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Giờ công chủ nhật:</span>
                  <span className="text-right">{salary.gio_cong_chu_nhat}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Giờ công tăng ca:</span>
                  <span className="text-right">{salary.gio_cong_tang_ca}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Ngày, Giờ tăng ca 3:</span>
                  <span className="text-right">{salary.ngay_gio_cong_ca_dem_ca3 || 0}</span>
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
                      {formatMoney(salary.tien_luong_sp_theo_cong_doan)}
                    </span>
                  </div>
                  <div className="pl-6 space-y-1 mt-1 text-[15px]">
                    <div className="flex justify-between">
                      <span className="w-full">- Tiền lương sản phẩm trong giờ:</span>
                      <span>{formatMoney(salary.tien_luong_sp_trong_gio)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Tiền lương tăng ca, cn, ca 3:</span>
                      <span>{formatMoney(salary.tien_luong_tang_ca_cn_ca3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Ca 3, đêm:</span>
                      <span>{formatMoney(salary.phu_cap_ca3_ca_dem)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- Tiền lương huấn luyện cn mới / bổ sung lương:</span>
                      <span>{formatMoney(salary.bo_sung_luong_qd_943)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-1 border-t border-gray-300 mt-2">
                      <span>**Tổng tiền lương sp:</span>
                      <span>{formatMoney(salary.tong_cong_tien_luong_sp)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-[15px]">
                  <div className="flex gap-2 items-center justify-between">
                    <span>
                      <b>2.</b> Giờ nghỉ ăn ca:
                    </span>
                    <span>{salary.so_gio_nghi_tang_ca}</span>
                  </div>
                  <div className="flex gap-2 items-center justify-between ml-4">
                    <span>Tiền lương nghỉ ăn ca:</span>
                    <span>{formatMoney(salary.tien_luong_nghi_an_tang_ca)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="font-semibold">3. Các khoản phụ cấp tiền lương:</div>
                  <div className="pl-2 md:pl-6 space-y-1 mt-1 text-[15px]">
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương 1.5 giờ hành kinh cho phụ nữ:</span>
                      <span>{formatMoney(salary.tien_luong_1h5_hanh_kinh_nu)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Số giờ cho con bú dưới 1t, thai &gt;7t:</span>
                      <span>{salary.so_gio_cho_con_bu_thai_tren_7_thang || 0}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Số giờ bắt đầu mang thai:</span>
                      <span>{salary.so_gio_thai_duoi_7_thang || 0}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương con nhỏ dưới 1 tuổi, có thai:</span>
                      <span>{formatMoney(salary.tien_luong_1h_cho_con_bu)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ CN có con nhỏ dưới 1 tuổi:</span>
                      <span>
                        {formatMoney(salary.ho_tro_10_phan_tram_luong_sp_con_duoi_12_thang)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ công nhân mới:</span>
                      <span>{formatMoney(salary.ho_tro_cn_moi_thang_1_2)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương học tập huấn luyện PCCC, khám sức khỏe 0.5h:</span>
                      <span>{formatMoney(salary.tien_gio_hoc_tap_huan_luyen)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền thưởng chuyên cần:</span>
                      <span>{formatMoney(salary.tien_thuong_chuyen_can)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Bổ sung lương theo ngày công:</span>
                      <span>{formatMoney(salary.bo_sung_luong_theo_ngay_cong)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ tiền xăng xe:</span>
                      <span>{salary.ho_tro_tien_xang_xe}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Giờ nghỉ ngắn:</span>
                      <span>{salary.gio_nghi_ngan}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Tiền lương nghỉ ngắn:</span>
                      <span>{formatMoney(salary.tien_luong_nghi_ngan)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ con đi nhà trẻ:</span>
                      <span>{formatMoney(salary.tien_ho_tro_con_nha_tre)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ lương, bổ sung lương:</span>
                      <span>{formatMoney(salary.ho_tro_luong)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>- Hỗ trợ nóng:</span>
                      <span>{formatMoney(salary.phu_cap_nong)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mb-3 text-[15px]">
                  <div>
                    <b>4.</b> Phụ cấp mạng lưới atvsv:
                  </div>
                  <div>{formatMoney(salary.bo_sung_luong)}</div>
                </div>

                <div className="flex justify-between font-bold text-base border-t border-gray-400 pt-2">
                  <div>
                    <b>5.</b> Tổng cộng tiền lương: (1+2+3+4):
                  </div>
                  <div>{formatMoney(salary.tong_cong_tien_luong_sp_bu_luong_toi_thieu)} (*)</div>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-[15px]">
                <div className="flex justify-between">
                  <div>
                    <b>6.</b> Tiền lương bù:
                  </div>
                  <div>{formatMoney(salary.tien_luong_bu)}</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>7.</b> Hoàn trả 17.5% BHXH + 1% BHTN + 3% BHYT:
                  </div>
                  <div>{formatMoney(salary.hoan_tra_bhxh_bhtn_bhyt)} (*)</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <b>8.</b> Tổng cộng tiền lương nghỉ chế độ:
                  </div>
                  <div>{formatMoney(salary.ngay_che_do)}</div>
                </div>
                <div className="pl-6 space-y-1 flex flex-col">
                  <div className="flex gap-2 justify-between">
                    <span>- Ngày chế độ năm {format(salary.thang, "yyyy")}:</span>
                    <span>{salary.ngay_che_do}</span>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span>- Ngày phép năm {format(salary.thang, "yyyy")}:</span>
                    <span>{salary.ngay_phep_nam || 0}</span>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <span>- Tiền lương phép, lễ chế độ:</span>
                    <span>{formatMoney(salary.tien_luong_phep)} (*)</span>
                  </div>
                </div>
              </div>

              <div className="font-bold text-lg mb-4 border-t border-gray-400 pt-3 flex flex-col md:flex-row justify-between">
                <span>II. Tổng cộng tiền lương tháng: (5+6+7+8):</span>
                <span className="text-center">{formatMoney(salary.tong_cong_tien_luong)}</span>
              </div>

              <div className="flex justify-between mb-3 text-[15px]">
                <div className="font-bold text-lg mb-2">III. Lương bốc xếp:</div>
                <div>{formatMoney(salary.boc_xep)}</div>
              </div>

              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2 ">IV. Các khoản khấu trừ:</h2>
                <div className="space-y-1.5 text-[15px]">
                  <div className="flex justify-between">
                    <span>- Trừ ứng:</span>
                    <span>{formatMoney(salary.tru_ung_truy_thu)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- 8% BHXH + 1,5% BHYT + 1% BHTN:</span>
                    <span>{formatMoney(salary.bhxh_bhtn_bhyt)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-2 md:p-5 rounded-lg font-bold text-lg border border-gray-300 mb-2">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <span>V. Số tiền lương còn lại được nhận: (II+III-IV)</span>
                  <span className="text-red-700">{formatMoney(salary.tien_luong_thuc_linh)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center w-full border-t border-gray-300 py-4">
                <p className="text-red-700 text-sm">
                  Lưu ý: Nếu CBCNV nào có thắc mắc vui lòng nhập nội dung vào bên dưới để khiếu nại.
                </p>
                <form onSubmit={handleSubmit} className="flex items-center gap-4">
                  <Input
                    onChange={(e) => setNote(e.target.value)}
                    type="text"
                    required
                    className="border border-blue-500"
                  />
                  <Button type="submit">Phản hồi</Button>
                </form>
                <div className="mt-2 text-left w-full">
                  {salary.salaryNotes?.map((note, idx) => (
                    <div key={note.id} className="text-red-700 text-sm">
                      {idx + 1}. {note.note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {salaries && salaries?.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="flex flex-col gap-2 md:gap-4 justify-between items-center border p-2 bg-white shadow-lg">
              <span className="text-teal-600 font-bold uppercase text-xl">
                Tổng thu nhập năm {format(month, "yyyy")}:
              </span>
              <span className="text-blue-600 font-semibold text-3xl">
                {formatMoney(totalIncome)}
              </span>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 justify-between items-center border p-2 bg-white shadow-lg">
              <span className="text-teal-600 font-bold uppercase text-xl">
                TNBQ năm {format(month, "yyyy")}:
              </span>
              <span className="text-blue-600 font-semibold text-3xl">
                {formatMoney(totalIncome / salaries.length)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaryDetailsPage;
