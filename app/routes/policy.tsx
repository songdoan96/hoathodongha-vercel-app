import {
  Baby,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardPenLine,
  Clock,
  DollarSign,
  FileSpreadsheet,
  HatGlasses,
  HeartHandshake,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import routers from "~/lib/routers";

interface PolicyItem {
  id: number;
  title: string;
  summary: string;
  iconSrc: string;
  color: string;
  contents: {
    title: string;
    details: string[];
  }[];
}

export const POLICIES_DATA: PolicyItem[] = [
  {
    id: 1,
    title: "1. TIỀN LƯƠNG & THU NHẬP",
    summary: "Lương vùng, hình thức trả lương, ...",
    iconSrc: "money.png",

    color: "text-[#0D7D31]",
    contents: [
      {
        title: "Mức lương tối thiểu",
        details: [
          "Lương cơ bản áp dụng theo quy định Công ty thuộc vùng 2: 4.730.000 đồng.",
          "Hình thức trả lương: Theo sản phẩm.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "2. THỜI GIỜ LÀM VIỆC & NGHỈ NGƠI",
    summary: "Thời gian làm việc & Tăng ca, Nghỉ phép năm, ...",
    iconSrc: "time.png",
    color: "text-[#1968B6]",
    contents: [
      {
        title: "Thời gian làm việc & Tăng ca",
        details: [
          "Thời gian làm việc: Từ 7h30 đến 17h00 thứ 2 đến thứ 7 hàng tuần.",
          "Cam kết không làm việc vào các ngày Chủ nhật, lễ, Tết.",
          "Thời gian làm việc bình thường: 8 giờ/ngày và 48 giờ/tuần.",
          "Giới hạn tăng ca: Dệt may được phép làm thêm giờ tối đa 300 giờ/năm, nhưng tối đa không quá 40 giờ/tháng và phải được người lao động đồng ý.",
        ],
      },
      {
        title: "Nghỉ phép năm",
        details: [
          "Nghỉ phép 12 ngày/năm đối với điều kiện làm việc bình thường.",
          "Nghỉ phép 14 ngày/năm đối với điều kiện làm việc nặng nhọc.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "3. BẢO HIỂM & PHÚC LỢI",
    summary: "Bảo hiểm bắt buộc, Phụ cấp, Thưởng, ...",
    iconSrc: "bhxh.png",
    color: "text-[#6F44A1]",
    contents: [
      {
        title: "Bảo hiểm bắt buộc",
        details: [
          "Doanh nghiệp phải đóng BHXH, BHYT và BHTN cho người lao động có hợp đồng theo quy định của Pháp luật.",
          "Các chế độ được hưởng: Ốm đau, thai sản, tai nạn lao động, bệnh nghề nghiệp (bệnh phổi nhiễm bụi bông, suy giảm thính lực) và hưu trí.",
          "Trong thời gian thử việc, được hoàn trả 21,5% mức đóng BHXH vào lương.",
        ],
      },
      {
        title: "Phụ cấp & Hỗ trợ",
        details: [
          "Hỗ trợ chuyên cần 500.000 đồng/tháng và xăng xe 200.000 đồng/tháng.",
          "Miễn phí ăn sáng, ăn trưa, tăng ca, hỗ trợ 5000 cơm ca chiều.",
          "Phụ cấp môi trường đặc thù: Hỗ trợ thêm 5% - 10% lương sản phẩm cho công đoạn nóng (ép seam, ép nhiệt, lò hơi, kho nóng, ép keo).",
          "Hỗ trợ tiền nhà trẻ: 100.000 đồng/cháu (từ 6 tháng đến 6 tuổi).",
          "Hỗ trợ tiền lương nghỉ việc riêng: Bản thân kết hôn được hỗ trợ 03 ngày, con kết hôn 01 ngày, bố mẹ bên vợ hoặc bên chồng chết 03 ngày.",
        ],
      },
      {
        title: "Thưởng Lễ, Tết",
        details: [
          "Thưởng Lễ, Tết Dương lịch, 30/4, 1/5, 2/9 và 6 tháng đầu năm: 10% lương sản phẩm (tùy vào doanh thu).",
          "Thưởng Tết Âm lịch (lương tháng 13): ≥ 1,5 tháng lương",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "4. ỐM ĐAU & THAI SẢN",
    summary: "Thai sản đối với nữ - nam, Chế độ Ốm đau, ...",
    iconSrc: "thaisan.png",
    color: "text-[#FD8205]",
    contents: [
      {
        title: "Thai sản đối với Lao động nữ",
        details: [
          "Thời gian nghỉ trước và sau khi sinh tổng cộng là 06 tháng.",
          "Sinh đôi trở lên: Cứ mỗi con phát sinh thêm được nghỉ thêm 01 tháng.",
          "Nghỉ dưỡng sức sau thai sản: Sinh thường nghỉ tối đa 05 ngày; Sinh mổ nghỉ 07 ngày; Sinh đôi trở lên nghỉ 10 ngày.",
          "Khám thai: Được nghỉ 05 lần, mỗi lần 01 ngày( xa cơ sở y tế được nghỉ 02 ngày đi khám).",
          "Sẩy thai, nạo, hút, thai lưu: Nghỉ từ 10 - 50 ngày tùy thuộc vào tuần tuổi của thai nhi.",
          "Trợ cấp tả lót: Bằng 02 lần mức lương cơ sở cho mỗi con.",
        ],
      },
      {
        title: "Thai sản đối với Lao động nam",
        details: [
          "Khi vợ sinh con, được nghỉ việc hưởng chế độ thai sản trong 60 ngày đầu kể từ ngày vợ sinh.",
          "Vợ sinh thường: Nghỉ 05 ngày làm việc.",
          "Vợ sinh mổ hoặc sinh non: Nghỉ 07 ngày làm việc.",
          "Vợ sinh đôi (thường): Nghỉ 10 ngày; Vợ sinh đôi (mổ): Nghỉ 14 ngày.",
          "Vợ sinh ba trở lên: Cứ thêm 1 con thì nghỉ thêm 03 ngày.",
        ],
      },
      {
        title: "Chế độ Ốm đau (Nam & Nữ)",
        details: [
          "Thời gian nghỉ/năm: Đóng BHXH dưới 15 năm nghỉ tối đa 30 ngày; Từ 15 đến dưới 30 năm nghỉ 40 ngày; Từ 30 năm trở lên nghỉ 50 ngày.",
          "Làm công việc nặng nhọc, độc hại, nguy hiểm: Được cộng thêm 10 ngày cho mỗi mốc thời gian trên.",
          "Con ốm (dưới 7 tuổi): Dưới 03 tuổi nghỉ tối đa 20 ngày/năm/con; Từ 03 đến dưới 07 tuổi nghỉ tối đa 15 ngày/năm/con.",
          "Mức hưởng trợ cấp ốm đau: Bằng 75% mức tiền lương đóng BHXH chia 24 nhân với số ngày thực tế nghỉ.",
        ],
      },
      {
        title: "THỦ TỤC NỘP ĐỂ HƯỞNG CHẾ ĐỘ THAI SẢN",
        details: [
          `Đối với Lao động Nữ hưởng chế độ thai sản: - Giấy chứng sinh hoặc bản sao giấy khai sinh của con -	Phiếu phẩu thuật nếu sinh con là sinh mổ`,
          `Đối với Lao động Nam hưởng chế độ vợ sinh: - Giấy chứng sinh hoặc giấy khai sinh của con -	Phiếu phẩu thuật nếu sinh con là sinh mổ`,
          `=> những giấy tờ trên đều phải có dấu đỏ hoặc có mã QR`,
        ],
      },
    ],
  },
  {
    id: 5,
    title: "5. CHẾ ĐỘ ĐẶC THÙ & ƯU TIÊN NỮ",
    summary: "Nghỉ dưỡng hành kinh, thời gian làm việc, khám tầm soát,...",
    iconSrc: "female.png",
    color: "text-[#ED5685]",
    contents: [
      {
        title: "Thời gian làm việc & Nghỉ ngơi",
        details: [
          "Trong thời gian hành kinh: Được nghỉ 30 phút/ngày.",
          "Phụ nữ mang thai hoặc nuôi con dưới 12 tháng: Chỉ làm việc 7 giờ/ngày, không làm thêm giờ hoặc làm việc nặng, được nghỉ 1 tiếng vắt sữa/cho con bú (vẫn hưởng 1 giờ lương cơ bản).",
          "Không được yêu cầu nữ mang thai từ tháng thứ 7 (hoặc tháng thứ 6 nếu làm vùng sâu/xa) làm thêm giờ hoặc làm việc ban đêm.",
        ],
      },
      {
        title: "Bảo vệ việc làm & Hỗ trợ riêng",
        details: [
          "Bảo vệ việc làm: Doanh nghiệp không được sa thải hoặc đơn phương chấm dứt hợp đồng vì lý do kết hôn, mang thai, nghỉ thai sản hay nuôi con dưới 12 tháng tuổi.",
          "Lao động nữ có con nhỏ dưới 1 tuổi được hỗ trợ thêm 10% lương sản phẩm( đối với công nhân sản xuất).",
          "Được khám tầm soát ung thư định kỳ hàng tháng nếu có nhu cầu.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "6. AN TOÀN & VỆ SINH LAO ĐỘNG",
    summary: "Huấn luyện an toàn, trang bị bảo hộ, Khám sức khỏe định kỳ, ...",
    iconSrc: "antoanlaodong.png",
    color: "text-[#028E93]",
    contents: [
      {
        title: "Trang bị bảo hộ & Môi trường",
        details: [
          "Người lao động được chi trả, hỗ trợ tiền lương khi tham gia các khóa học tập, huấn luyện do Nhà máy tổ chức.",
          "Công nhân phải được phát miễn phí đồ bảo hộ như khẩu trang chống bụi bông, găng tay...",
          "Xưởng may phải đảm bảo các tiêu chuẩn khắt khe về ánh sáng, độ thông gió, kiểm soát tiếng ồn và bụi công nghiệp",
        ],
      },
      {
        title: "Khám sức khỏe",
        details: ["Khám sức khỏe định kỳ 02 lần/năm."],
      },
    ],
  },
  {
    id: 7,
    title: "7. TUYỂN DỤNG & ĐÀO TẠO",
    summary: "Thưởng giới thiệu, hỗ trợ lao động mới, thưởng quay lại...",
    iconSrc: "tuyendung.png",
    color: "text-[#1A73C1]",
    contents: [
      {
        title: "Thưởng giới thiệu",
        details: [
          "Giới thiệu thợ may: Thưởng 1.000.000 đồng (nhận 50% khi ký HĐLĐ, 50% sau 3 tháng).",
          "Giới thiệu Tổ trưởng, Kỹ thuật chuyền: Thưởng 2.000.000 đồng.",
        ],
      },
      {
        title: "Chế độ hỗ trợ lao động mới tuyển",
        details: [
          "Lao động chưa có tay nghề: Đảm bảo thu nhập thực nhận tối thiểu 5.344.900 đồng/tháng. Nếu lương sản phẩm và phụ cấp cao hơn thì nhận theo thực tế.",
          "Lao động có tay nghề (mới vào): Hưởng 100% lương sản phẩm. Hỗ trợ thêm lương sản phẩm 03 tháng đầu: Tháng đầu 40%, tháng thứ hai 20%, tháng thứ ba 10% lương sản phẩm.",
          "Lao động chưa có tay nghề vào đào tạo may và chuyên dùng được hỗ trợ 03 tháng đầu mỗi tháng 2.000.000đồng.",
          "Lao động cũ quay lại: Thưởng nóng tháng đầu theo xếp loại tay nghề từ 500.000 đồng (Loại C), 1.000.000 đồng (Loại B) đến 1.500.000 đồng (Loại A).",
          "Ban điều hành chuyền may (Tổ trưởng, Kỹ thuật): Thưởng gia nhập 3.000.000 đồng sau khi ký HĐLĐ 3 tháng.",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "8. CHẾ ĐỘ HIẾU HỶ",
    summary: "Chế độ đám cưới, đám ma, ...",
    iconSrc: "hieuhy.png",

    color: "text-[#DD932B]",
    contents: [
      {
        title: "Đám tang",
        details: [
          "Người lao động có thời gian công tác dưới 3 năm đi viếng 2.000.000 đồng+ vòng hoa. Trên 3 năm đến dưới 10 năm đi viếng 3.000.000 đồng+ vòng hoa. Từ 10 năm trở lên đi viếng 5.000.000 đồng.",
          "Tứ thân phụ mẫu, vợ, chồng, con người lao động qua đời đi viếng 500.000 đồng + vòng hoa. Nếu gia đình có nhiều người lao động trở lên làm việc tại Công ty đi viếng với tiền phúng điếu tăng lên tương ứng. Trường họp nơi tổ chức tang lễ ở các tỉnh thành xa mà không thể đi viếng Công ty đi viếng bằng tiền thay thế vòng hoa.",
        ],
      },
      {
        title: "Đám cưới",
        details: [
          "Làm việc dưới 1 năm Công ty tặng phẩm 500.000 đồng/người. 01 năm đến dưới 03 năm tặng phẩm 1.000.000 đồng/người. Từ 03 năm trở lên tặng phẩm 1.500.000 đồng/người.",
          "Người lao động đang làm việc tại Công ty nghỉ hưu tặng phẩm 2.000.000 đồng/người.",
        ],
      },
      {
        title: "Chế độ khác",
        details: [
          "Người lao động đang làm việc tại Công ty mắc bệnh ung thư thì được hỗ trợ thăm hỏi với mức 1.000.000 đồng/người.",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "9. ĐÀO TẠO NÂNG CAO KIẾN THỨC",
    summary: "Hỗ trợ tập huấn, học nghiệp vụ, ...",
    iconSrc: "hoctap.png",
    color: "text-[#02abb1]",
    contents: [
      {
        title:
          "Người lao động được cử đi tập huấn/ học nghiệp vụ được hưởng 100% lương",
        details: [
          "Các trưởng hợp Công ty chi trả, hỗ trợ tiền học phí, thời gian, tiền lương và các chi phí liên quan đến học tập, nếu người lao động không làm việc tại Công ty theo thời gian cam kết sau đào tạo sẽ phải hoàn 100% tổng tiền Công ty đã chi cho học tập ( Người lao động phải làm việc tại công ty trên 05 năm kể từ ngày cấp bằng chứng nhận).",
        ],
      },
    ],
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  Wallet: Wallet,
  Clock: Clock,
  HeartHandshake: HeartHandshake,
  Baby: Baby,
  UserRound: UserRound,
  ShieldCheck: ShieldCheck,
  FileSpreadsheet: FileSpreadsheet,
};
export default function policy() {
  const [openId, setOpenId] = useState<number | null>(); // 1 is expanded by default to show interactive behavior

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="bg-white md:w-2/3 mx-auto dark:bg-neutral-900 min-h-screen text-neutral-800 dark:text-neutral-100 flex flex-col pb-10">
        <div className="relative w-full overflow-hidden bg-linear-to-r from-blue-900 to-blue-950 text-white p-2 md:p-8 pb-10 rounded-b-3xl shadow-lg">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="col-span-1 md:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5 z-10 text-left">
              <div
                className="space-y-2 md:space-y-3"
                style={{ opacity: 1, transform: "none" }}
              >
                <div className="flex w-full flex-col sm:flex-row gap-4">
                  <img
                    src="/images/logo.png"
                    className="w-12 h-12 mx-auto lg:mx-0"
                  />
                  <h1 className="text-3xl text-center flex sm:text-4xl font-black tracking-tight text-white">
                    CHÍNH SÁCH LAO ĐỘNG
                  </h1>
                </div>

                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-sky-400 uppercase">
                  CÔNG TY May <br /> HÒA THỌ Đông Hà
                </div>
                <p className="text-sm text-center md:text-left md:text-base text-neutral-200/90 leading-relaxed font-normal max-w-md">
                  Môi trường làm việc ổn định – thu nhập tốt – phúc lợi cao
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="https://www.facebook.com/people/C%C3%94NG-TY-MAY-HO%C3%80-TH%E1%BB%8C-%C4%90%C3%94NG-H%C3%80/100080357102119"
                  className="px-6 py-3 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transform active:scale-95 transition-all text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clipboard-check w-5 h-5 text-white"
                    aria-hidden="true"
                  >
                    <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <path d="m9 14 2 2 4-4" />
                  </svg>
                  ỨNG TUYỂN NGAY
                </Link>
                {/* 0905187559 */}
                <a
                  href="tel:0905187559"
                  className="px-6 py-3 cursor-pointer rounded-xl bg-white hover:bg-neutral-100 text-blue-900 border border-white/95 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transform active:scale-95 transition-all text-center shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone-call w-5 h-5 text-blue-800"
                    aria-hidden="true"
                  >
                    <path d="M13 2a9 9 0 0 1 9 9" />
                    <path d="M13 6a5 5 0 0 1 5 5" />
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                  GỌI TƯ VẤN
                </a>
              </div>
            </div>
            <div className="col-span-1 md:col-span-5 relative w-full h-[250px] md:h-[290px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="mx-auto h-full relative overflow-hidden rounded bg-linear-to-br from-amber-50 to-amber-100 border border-amber-150 p-2 lg:p-5 flex flex-col justify-between group transition-all hover:shadow-lg">
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-red-500 text-white font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-flame w-3.5 h-3.5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
                  </svg>
                  HOT
                </div>
                <div className="z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm shadow-amber-500/25">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-flame h-4.5 w-4.5 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
                      </svg>
                    </div>
                    <h3 className="text-[14px] sm:text-lg font-black tracking-tight uppercase text-amber-700 dark:text-amber-400">
                      TUYỂN DỤNG
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle />
                      </div>
                      <span className="text-[12px] sm:text-lg font-bold text-neutral-800 dark:text-neutral-200 leading-snug">
                        Lao động may
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle />
                      </div>
                      <span className="text-[12px] sm:text-lg font-bold text-neutral-800 dark:text-neutral-200 leading-snug">
                        Lao động đào tạo may
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle />
                      </div>
                      <span className="text-[12px] sm:text-lg font-bold text-neutral-800 dark:text-neutral-200 leading-snug">
                        Lao động chuyên dùng, ủi
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center items-center w-full">
                    <div className="mx-auto text-center space-y-1 bg-amber-500 border border-amber-200 p-2 rounded-lg shadow-2xl border-b-4">
                      <p className="text-lg font-extrabold text-white uppercase w-full">
                        Chưa có tay nghề ? <br /> Được đào tạo miễn phí
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-6 flex items-center justify-between z-10">
                  <button className="px-5 py-3 cursor-pointer rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md transform active:scale-95 transition-all shadow-amber-600/10">
                    ỨNG TUYỂN NGAY
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right w-4.5 h-4.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <div className="relative h-12 w-12 text-amber-600/35 dark:text-amber-400/20 mr-2 -mb-1 animate-pulse">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-megaphone h-full w-full -rotate-12 transform"
                      aria-hidden="true"
                    >
                      <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                      <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
                      <path d="M8 6v8" />
                    </svg>
                    <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-dashed border-amber-400 opacity-60 animate-ping" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full p-2 lg:px-4 -mt-8 relative z-20">
          <div className="bg-gray-100/90 rounded-2xl border border-neutral-100 lg:p-2 shadow-xl shadow-neutral-100">
            <div className="flex flex-col gap-1 md:gap-4 mx-auto">
              {POLICIES_DATA.map((item) => {
                const isExpanded = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white dark:bg-neutral-900 dark:border-neutral-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-colors"
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="flex w-full items-center justify-between p-1 md:p-3.5 cursor-pointer text-left select-none"
                    >
                      <div className="flex items-center gap-3 w-[95%]">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl  shadow-[0_3px_8px_rgba(0,0,0,0.02)]`}
                        >
                          <img
                            src={"/images/" + item.iconSrc}
                            className="h-10 w-10"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4
                            className={`text-lg md:text-xl font-extrabold tracking-tight uppercase leading-snug ${item.color}`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[14px] font-semibold text-gray-400 truncate mt-0.5">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <div className="text-neutral-400 dark:text-neutral-600 rounded-full p-1">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 stroke-[2.25]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 stroke-[2.25]" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="transition">
                        <div className="border-t border-neutral-100 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-950/15 p-2 lg:p-4.5 space-y-3">
                          {item.contents.map((item, index) => (
                            <div key={index}>
                              <p className="text-sky-500 text-lg uppercase font-bold pb-2 text-center w-full">
                                {item.title}
                              </p>
                              {item.details.map((detail, index) => (
                                <div key={index} className="gap-2.5">
                                  <div className="inline-flex items-center mr-1">
                                    <CheckCircle2
                                      className={`h-4 w-4 text-emerald-700`}
                                    />
                                  </div>
                                  <span className="leading-relaxed text-black">
                                    {detail}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="hidden mt-2 md:w-2/3 mx-auto relative overflow-hidden rounded bg-linear-to-br from-amber-50/70 to-amber-100/55 dark:from-amber-950/20 dark:to-amber-900/10 border border-amber-150 dark:border-amber-900/35 p-5 flex flex-col justify-between group transition-all hover:shadow-lg">
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-red-500 text-white font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-flame w-3.5 h-3.5 fill-current"
              aria-hidden="true"
            >
              <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
            </svg>
            HOT
          </div>
          <div className="z-10 pr-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm shadow-amber-500/25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-flame h-4.5 w-4.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
                </svg>
              </div>
              <h3 className="text-[14px] sm:text-[15px] font-[900] tracking-tight uppercase text-amber-700 dark:text-amber-400">
                TUYỂN DỤNG
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle />
                </div>
                <span className="text-[12px] sm:text-[12.5px] font-bold text-neutral-800 dark:text-neutral-200 leading-snug">
                  Lao động may
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle />
                </div>
                <span className="text-[12px] sm:text-[12.5px] font-bold text-neutral-800 dark:text-neutral-200 leading-snug">
                  Lao động đào tạo may
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-4.5 w-4.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle />
                </div>
                <span className="text-[12px] sm:text-[12.5px] font-bold text-neutral-800 dark:text-neutral-200 leading-snug">
                  Lao động chuyên dùng, ủi
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between z-10">
            <Link
              to="https://www.facebook.com/people/C%C3%94NG-TY-MAY-HO%C3%80-TH%E1%BB%8C-%C4%90%C3%94NG-H%C3%80/100080357102119"
              className="px-5 py-3 cursor-pointer rounded-xl bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md transform active:scale-95 transition-all shadow-amber-600/10"
            >
              ỨNG TUYỂN NGAY
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right w-4.5 h-4.5"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <div className="relative h-12 w-12 text-amber-600/35 dark:text-amber-400/20 mr-2 -mb-1 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-megaphone h-full w-full -rotate-12 transform"
                aria-hidden="true"
              >
                <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
                <path d="M8 6v8" />
              </svg>
              <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-dashed border-amber-400 opacity-60 animate-ping" />
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="flex hidden flex-col gap-1 md:gap-4 md:w-2/3 mx-auto bg-white p-2 md:p-4 shadow">
        {POLICIES_DATA.map((item) => {
          const isExpanded = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white dark:bg-neutral-900 dark:border-neutral-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-colors"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="flex w-full items-center justify-between p-1 md:p-3.5 cursor-pointer text-left select-none"
              >
                <div className="flex items-center gap-3 w-[95%]">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl  shadow-[0_3px_8px_rgba(0,0,0,0.02)]`}
                  >
                    <img src={"/images/" + item.iconSrc} className="h-10 w-10" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4
                      className={`text-lg md:text-xl font-extrabold tracking-tight uppercase leading-snug ${item.color}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[14px] font-semibold text-gray-400 truncate mt-0.5">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="text-neutral-400 dark:text-neutral-600 rounded-full p-1">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 stroke-[2.25]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 stroke-[2.25]" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="transition">
                  <div className="border-t border-neutral-100 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-950/15 p-4.5 space-y-3">
                    {item.contents.map((item, index) => (
                      <div key={index}>
                        <p className="text-sky-500 text-lg uppercase font-bold pb-2 text-center w-full">
                          {item.title}
                        </p>
                        {item.details.map((detail, index) => (
                          <div key={index} className="gap-2.5">
                            <div className="inline-flex items-center mr-1">
                              <CheckCircle2 className={`h-4 w-4 text-emerald-700 shrink-0`} />
                            </div>
                            <span className="leading-relaxed text-black">{detail}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div> */}
      <div className="mt-4 py-4 flex flex-wrap justify-center gap-2 lg:w-2/3 mx-auto">
        <Link
          to="/luong"
          className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
        >
          <DollarSign /> <span>Tra cứu lương</span>
        </Link>
        <Link
          to="/tao-don"
          className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
        >
          <ClipboardPenLine /> <span>Tạo đơn nghỉ phép</span>
        </Link>
        <Link
          to={routers().feedback.create}
          className="text-red-600 bg-red-100 rounded border-red-600 border flex items-center gap-2 p-1"
        >
          <HatGlasses /> <span className="font-semibold">Hòm thư góp ý</span>
        </Link>
      </div>
    </div>
  );
}
