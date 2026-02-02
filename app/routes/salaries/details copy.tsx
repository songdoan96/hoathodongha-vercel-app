// import { FileInput, Search } from "lucide-react";
// import { Link, useSearchParams } from "react-router";
// import Loading from "~/components/Loading";
// import { useSalariesDetail } from "~/hooks/salaries-hook";

// export default function SalariesDetails() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const month = searchParams.get("month");
//   if (!month) return;

//   const { isLoading, data } = useSalariesDetail(month);
//   console.log("🚀 ~ SalariesDetails ~ data:", data);
//   console.log("🚀 ~ SalariesDetails ~ isLoading:", isLoading);
//   if (isLoading) {
//     return <Loading fullScreen />;
//   }
//   return (
//     <div>
//       <div className="h-12 bg-blue-500 flex gap-4 items-center justify-between px-4">
//         <img src="/images/logo.png" alt="" className="w-10" />
//         <div className="flex flex-1 justify-center items-center gap-12">
//           <h1 className="text-white text-2xl uppercase text-center font-bold">
//             Chi tiết lương tháng {month}
//           </h1>
//           <input
//             value={month}
//             className="border p-2 text-white"
//             type="month"
//             onChange={(e) =>
//               setSearchParams({
//                 month: (e.target as HTMLInputElement).value,
//               })
//             }
//           />
//         </div>
//         <Link to={"/luong"} className="text-white flex items-center gap-1">
//           <Search />
//           <span>Tra cứu</span>
//         </Link>
//         <Link to={"/luong/tai-len"} className="text-white flex items-center gap-1">
//           <FileInput />
//           <span>Tải file lên</span>
//         </Link>
//       </div>
//       <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
//         <table className="w-full overflow-scroll">
//           <thead>
//             <tr>
//               <th className="border border-black p-1">Tổ</th>
//               <th className="border border-black p-1">MSNV</th>
//               <th className="border border-black p-1">Họ và tên</th>
//               <th className="border border-black p-1">Lương tối thiểu Cty</th>
//               <th className="border border-black p-1">Ngày công bình thường</th>
//               <th className="border border-black p-1">Giơ công chủ nhât</th>
//               <th className="border border-black p-1">Giờ công tăng ca</th>
//               <th className="border border-black p-1">ngày, giờ công ca đêm+ca3</th>
//               <th className="border border-black p-1">
//                 Tiền lương sản phẩm theo công đoạn sản xuất
//               </th>
//               <th className="border border-black p-1">Tiền lương sản phẩm trong giờ</th>
//               <th className="border border-black p-1">Tiền lương tăng ca, chủ nhật, ca 3</th>
//               <th className="border border-black p-1">Phụ cấp ca 3 ca đêm</th>
//               <th className="border border-black p-1">BỔ SUNG LƯƠNG theo QĐ 943 QĐ/VP/HT</th>
//               <th className="border border-black p-1">Tổng cộng tiền lương sản phẩm</th>
//               <th className="border border-black p-1">Số giờ nghỉ tăng ca</th>
//               <th className="border border-black p-1">Tiền lương nghỉ ăn tăng ca</th>
//               <th className="border border-black p-1">Tiền lương 1.5giờ hành kinh cho CN nữ</th>
//               <th className="border border-black p-1">Số giờ thai 7 tháng</th>
//               <th className="border border-black p-1">Số giờ cho con bú, thai 7 tháng, tt</th>
//               <th className="border border-black p-1">TIEN LUONG 1H CHO CON BU</th>
//               <th className="border border-black p-1">
//                 hổ trợ 10 % trên lương sản phẩm cho công nhân có con dưới 12 tháng tuổi
//               </th>
//               <th className="border border-black p-1">
//                 hổ trợ công nhân mới tháng thứ nhất 30% tháng thứ hai 15% trên lương sản phẩm
//               </th>
//               <th className="border border-black p-1">
//                 Tiền giờ học tập huấn luyện PCCC, khám sức khỏe
//               </th>
//               <th className="border border-black p-1">Tiền thưởng chuyên cần</th>
//               <th className="border border-black p-1">Bổ sung lương theo ngày công</th>
//               <th className="border border-black p-1">Hổ trợ tiền xăng xe</th>
//               <th className="border border-black p-1">Giờ nghỉ ngắn</th>
//               <th className="border border-black p-1">Tiền lương nghỉ ngắn</th>
//               <th className="border border-black p-1">Tiền hổ trợ có con đi nhà trẻ</th>
//               <th className="border border-black p-1">Hổ trợ lương</th>
//               <th className="border border-black p-1">Phụ cấp nóng</th>
//               <th className="border border-black p-1">Bổ sung lương</th>
//               <th className="border border-black p-1">
//                 Tổng cộng tiền lương sản phẩm căn cứ bù lương tối thiểu
//               </th>
//               <th className="border border-black p-1">Tiền lương bù</th>
//               <th className="border border-black p-1">Hoàn trả 18% BHXH+1% BHTN+3% BHYT</th>
//               <th className="border border-black p-1">Ngay chế độ</th>
//               <th className="border border-black p-1">Ngày Phép năm</th>
//               <th className="border border-black p-1">Tiền lương phép 2015</th>
//               <th className="border border-black p-1">Tổng cộng tiền lương</th>
//               <th className="border border-black p-1">Bốc xếp</th>
//               <th className="border border-black p-1">Trừ ứng+ truy thu BHXH+BHYT+BHTN</th>
//               <th className="border border-black p-1">8% BHXH 1.5% BHYT 1% BHTN</th>
//               <th className="border border-black p-1">Tiền lương thực lĩnh cuối kỳ</th>
//               <th className="border border-black p-1">CCCD</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((salary) => (
//               <tr>
//                 <td className="border border-black text-center p-1">{salary.to}</td>
//                 <td className="border border-black text-center p-1">{salary.msnv}</td>
//                 <td className="border border-black text-center p-1">{salary.hoten}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.luong_toi_thieu_cty}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.ngay_cong_binh_thuong}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.gio_cong_chu_nhat}</td>
//                 <td className="border border-black text-center p-1">{salary.gio_cong_tang_ca}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.ngay_gio_cong_ca_dem_ca3}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_sp_theo_cong_doan}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_sp_trong_gio}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_tang_ca_cn_ca3}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.phu_cap_ca3_ca_dem}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.bo_sung_luong_qd_943}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tong_cong_tien_luong_sp}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.so_gio_nghi_tang_ca}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_nghi_an_tang_ca}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_1h5_hanh_kinh_nu}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.so_gio_thai_duoi_7_thang}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.so_gio_cho_con_bu_thai_tren_7_thang}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_1h_cho_con_bu}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.ho_tro_10_phan_tram_luong_sp_con_duoi_12_thang}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.ho_tro_cn_moi_thang_1_2}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_gio_hoc_tap_huan_luyen}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_thuong_chuyen_can}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.bo_sung_luong_theo_ngay_cong}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.ho_tro_tien_xang_xe}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.gio_nghi_ngan}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_nghi_ngan}
//                 </td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_ho_tro_con_nha_tre}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.ho_tro_luong}</td>
//                 <td className="border border-black text-center p-1">{salary.phu_cap_nong}</td>
//                 <td className="border border-black text-center p-1">{salary.bo_sung_luong}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tong_cong_tien_luong_sp_bu_luong_toi_thieu}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.tien_luong_bu}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.hoan_tra_bhxh_bhtn_bhyt}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.ngay_che_do}</td>
//                 <td className="border border-black text-center p-1">{salary.ngay_phep_nam}</td>
//                 <td className="border border-black text-center p-1">{salary.tien_luong_phep}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tong_cong_tien_luong}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.boc_xep}</td>
//                 <td className="border border-black text-center p-1">{salary.tru_ung_truy_thu}</td>
//                 <td className="border border-black text-center p-1">{salary.bhxh_bhtn_bhyt}</td>
//                 <td className="border border-black text-center p-1">
//                   {salary.tien_luong_thuc_linh}
//                 </td>
//                 <td className="border border-black text-center p-1">{salary.cccd}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
