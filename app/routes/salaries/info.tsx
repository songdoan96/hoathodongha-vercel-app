import { FileInput, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { useSalariesDetail } from "~/hooks/salaries-hook";

export default function SalaryInfoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month");
  if (!month) return;

  const { isLoading, data } = useSalariesDetail(month);
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div>
      <div className="h-12 bg-blue-500 flex gap-4 items-center justify-between px-4">
        <img src="/images/logo.png" alt="" className="w-10" />
        <div className="flex flex-1 justify-center items-center gap-12">
          <h1 className="text-white text-2xl uppercase text-center font-bold">
            Chi tiết lương tháng {month}
          </h1>
          <input
            value={month}
            className="border p-2 text-white"
            type="month"
            onChange={(e) =>
              setSearchParams({
                month: (e.target as HTMLInputElement).value,
              })
            }
          />
        </div>
        <Link to={"/luong"} className="text-white flex items-center gap-1">
          <Search />
          <span>Tra cứu</span>
        </Link>
        <Link
          to={"/luong/tai-len"}
          className="text-white flex items-center gap-1"
        >
          <FileInput />
          <span>Tải file lên</span>
        </Link>
      </div>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full overflow-scroll">
          <thead>
            <tr>
              <th className="border border-black p-1" data-key="h1">
                Tổ
              </th>
              <th className="border border-black p-1" data-key="h2">
                MSNV
              </th>
              <th className="border border-black p-1" data-key="h3">
                Họ và tên
              </th>
              <th className="border border-black p-1" data-key="h4">
                Lương tối thiểu Cty
              </th>
              <th className="border border-black p-1" data-key="h5">
                Ngày công bình thường
              </th>
              {/* <th className="border border-black p-1" data-key="h6">
                Giờ công chủ nhật
              </th> */}
              <th className="border border-black p-1" data-key="h7">
                Giờ công tăng ca
              </th>
              {/* <th className="border border-black p-1" data-key="h8">
                ngày, giờ công ca đêm+ca3
              </th> */}
              <th className="border border-black p-1" data-key="h9">
                Tiền lương sản phẩm theo công đoạn sản xuất
              </th>
              <th className="border border-black p-1" data-key="h10">
                Tiền lương sản phẩm trong giờ
              </th>
              <th className="border border-black p-1" data-key="h11">
                Tiền lương tăng ca, chủ nhật, ca 3
              </th>
              {/* <th className="border border-black p-1" data-key="h12">
                Phụ cấp ca 3 ca đêm
              </th>
              <th className="border border-black p-1" data-key="h13">
                BỔ SUNG LƯƠNG theo QĐ 943 QĐ/VP/HT
              </th> */}
              <th className="border border-black p-1" data-key="h14">
                Tổng cộng tiền lương sản phẩm
              </th>
              {/* <th className="border border-black p-1" data-key="h15">
                Số giờ nghỉ tăng ca
              </th>
              <th className="border border-black p-1" data-key="h16">
                Tiền lương nghỉ ăn tăng ca
              </th> */}
              <th className="border border-black p-1" data-key="h17">
                Tiền lương 1.5giờ hành kinh cho CN nữ
              </th>
              {/* <th className="border border-black p-1" data-key="h18">
                Số giờ thai 7 tháng
              </th> */}
              <th className="border border-black p-1" data-key="h19">
                Số giờ cho con bú, thai 7 tháng, tt
              </th>
              <th className="border border-black p-1" data-key="h20">
                TIEN LUONG 1H CHO CON BU
              </th>
              <th className="border border-black p-1" data-key="h21">
                hổ trợ 10 % trên lương sản phẩm cho công nhân có con dưới 12
                tháng tuổi
              </th>
              {/* <th className="border border-black p-1" data-key="h22">
                hổ trợ công nhân mới tháng thứ nhất 30% tháng thứ hai 15% trên lương sản phẩm
              </th> */}
              <th className="border border-black p-1" data-key="h23">
                Tiền giờ học tập huấn luyện PCCC, khám sức khỏe
              </th>
              <th className="border border-black p-1" data-key="h24">
                Tiền thưởng chuyên cần
              </th>
              <th className="border border-black p-1" data-key="h25">
                Bổ sung lương theo ngày công
              </th>
              <th className="border border-black p-1" data-key="h26">
                Hổ trợ tiền xăng xe
              </th>
              <th className="border border-black p-1" data-key="h27">
                Giờ nghỉ ngắn
              </th>
              <th className="border border-black p-1" data-key="h28">
                Tiền lương nghỉ ngắn
              </th>
              <th className="border border-black p-1" data-key="h29">
                Tiền hổ trợ có con đi nhà trẻ
              </th>
              <th className="border border-black p-1" data-key="h30">
                Hổ trợ lương
              </th>
              <th className="border border-black p-1" data-key="h31">
                Phụ cấp nóng
              </th>
              <th className="border border-black p-1" data-key="h32">
                Bổ sung lương
              </th>
              <th className="border border-black p-1" data-key="h33">
                Tổng cộng tiền lương sản phẩm căn cứ bù lương tối thiểu
              </th>
              <th className="border border-black p-1" data-key="h34">
                Tiền lương bù
              </th>
              {/* <th className="border border-black p-1" data-key="h35">
                Hoàn trả 18% BHXH+1% BHTN+3% BHYT
              </th> */}
              <th className="border border-black p-1" data-key="h36">
                Ngay chế độ
              </th>
              <th className="border border-black p-1" data-key="h37">
                Ngày Phép năm
              </th>
              <th className="border border-black p-1" data-key="h38">
                Tiền lương phép 2015
              </th>
              <th className="border border-black p-1" data-key="h39">
                Tổng cộng tiền lương
              </th>
              {/* <th className="border border-black p-1" data-key="h40">
                Bốc xếp
              </th> */}
              <th className="border border-black p-1" data-key="h41">
                Trừ ứng+ truy thu BHXH+BHYT+BHTN
              </th>
              <th className="border border-black p-1" data-key="h42">
                8% BHXH 1.5% BHYT 1% BHTN
              </th>
              <th className="border border-black p-1" data-key="h43">
                Tiền lương thực lĩnh cuối kỳ
              </th>
              <th className="border border-black p-1" data-key="h44">
                CCCD
              </th>
              <th className="border border-black p-1" data-key="h44">
                Phản hồi
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((salary) => (
              <tr key={salary.id} data-id={salary.id}>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b1"
                >
                  {salary.to}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b2"
                >
                  {salary.msnv}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b3"
                >
                  {salary.hoten}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b4"
                >
                  {salary.luong_toi_thieu_cty}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b5"
                >
                  {salary.ngay_cong_binh_thuong}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b6">
                  {salary.gio_cong_chu_nhat}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b7"
                >
                  {salary.gio_cong_tang_ca}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b8">
                  {salary.ngay_gio_cong_ca_dem_ca3}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b9"
                >
                  {salary.tien_luong_sp_theo_cong_doan}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b10"
                >
                  {salary.tien_luong_sp_trong_gio}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b11"
                >
                  {salary.tien_luong_tang_ca_cn_ca3}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b12">
                  {salary.phu_cap_ca3_ca_dem}
                </td>
                <td className="border border-black text-center p-1" data-hey="b13">
                  {salary.bo_sung_luong_qd_943}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b14"
                >
                  {salary.tong_cong_tien_luong_sp}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b15">
                  {salary.so_gio_nghi_tang_ca}
                </td>
                <td className="border border-black text-center p-1" data-hey="b16">
                  {salary.tien_luong_nghi_an_tang_ca}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b17"
                >
                  {salary.tien_luong_1h5_hanh_kinh_nu}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b18">
                  {salary.so_gio_thai_duoi_7_thang}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b19"
                >
                  {salary.so_gio_cho_con_bu_thai_tren_7_thang}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b20"
                >
                  {salary.tien_luong_1h_cho_con_bu}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b21"
                >
                  {salary.ho_tro_10_phan_tram_luong_sp_con_duoi_12_thang}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b22">
                  {salary.ho_tro_cn_moi_thang_1_2}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b23"
                >
                  {salary.tien_gio_hoc_tap_huan_luyen}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b24"
                >
                  {salary.tien_thuong_chuyen_can}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b25"
                >
                  {salary.bo_sung_luong_theo_ngay_cong}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b26"
                >
                  {salary.ho_tro_tien_xang_xe}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b27"
                >
                  {salary.gio_nghi_ngan}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b28"
                >
                  {salary.tien_luong_nghi_ngan}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b29"
                >
                  {salary.tien_ho_tro_con_nha_tre}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b30"
                >
                  {salary.ho_tro_luong}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b31"
                >
                  {salary.phu_cap_nong}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b32"
                >
                  {salary.bo_sung_luong}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b33"
                >
                  {salary.tong_cong_tien_luong_sp_bu_luong_toi_thieu}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b34"
                >
                  {salary.tien_luong_bu}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b35">
                  {salary.hoan_tra_bhxh_bhtn_bhyt}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b36"
                >
                  {salary.ngay_che_do}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b37"
                >
                  {salary.ngay_phep_nam}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b38"
                >
                  {salary.tien_luong_phep}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b39"
                >
                  {salary.tong_cong_tien_luong}
                </td>
                {/* <td className="border border-black text-center p-1" data-hey="b40">
                  {salary.boc_xep}
                </td> */}
                <td
                  className="border border-black text-center p-1"
                  data-hey="b41"
                >
                  {salary.tru_ung_truy_thu}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b42"
                >
                  {salary.bhxh_bhtn_bhyt}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b43"
                >
                  {salary.tien_luong_thuc_linh}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b44"
                >
                  {salary.cccd}
                </td>
                <td
                  className="border border-black text-center p-1"
                  data-hey="b44"
                >
                  <div className="flex">
                    {salary.salaryNotes?.map((note) => (
                      <span key={note.id}>{note.note},</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
