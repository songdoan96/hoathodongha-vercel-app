export interface LineListType {
  value: string;
  name: string;
  isHelp?: boolean;
  needToTruong?: boolean;
  needQuanDoc?: boolean;
  onlyLanhDao?: boolean;
}
export const linesList: LineListType[] = [
  {
    value: "X1_01",
    name: "X1 - Tổ 1",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_02",
    name: "X1 - Tổ 2",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_03",
    name: "X1 - Tổ 3",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_04",
    name: "X1 - Tổ 4",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_05",
    name: "X1 - Tổ 5",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_06",
    name: "X1 - Tổ 6",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_07",
    name: "X1 - Tổ 7",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_08",
    name: "X1 - Tổ 8",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X1_09",
    name: "X1 - Tổ 9",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_01",
    name: "X2 - Tổ 1",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_02",
    name: "X2 - Tổ 2",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_03",
    name: "X2 - Tổ 3",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_04",
    name: "X2 - Tổ 4",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_05",
    name: "X2 - Tổ 5",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_06",
    name: "X2 - Tổ 6",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_07",
    name: "X2 - Tổ 7",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_08",
    name: "X2 - Tổ 8",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_09",
    name: "X2 - Tổ 9",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "daotao",
    name: "Tổ đào tạo",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  { value: "lanhdao", name: "Lãnh đạo" },
  {
    value: "quandoc",
    name: "Quản đốc",
    needToTruong: false,
    needQuanDoc: false,
  },
  {
    value: "kythuat",
    name: "Kỹ thuật",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "X1_chuyendung",
    name: "Chuyên dùng 1",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "X2_chuyendung",
    name: "Chuyên dùng 2",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
  },
  {
    value: "codien",
    name: "Cơ điện",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "tocat",
    name: "Tổ cắt",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "epkeo",
    name: "Ép keo",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "bvvs",
    name: "BVVS",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "hoanthanh",
    name: "Hoàn thành",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "kcs",
    name: "KCS",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "nguyenlieu",
    name: "Nguyên liệu",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "phulieu",
    name: "Phụ liệu",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "vanphong",
    name: "Văn phòng",
    needToTruong: false,
    needQuanDoc: false,
  },
  {
    value: "nhaan",
    name: "Nhà ăn",
    needToTruong: true,
    needQuanDoc: false,
  },
  {
    value: "X1_duphong",
    name: "Dự phòng X1",
    needToTruong: false,
    needQuanDoc: true,
  },
  {
    value: "X2_duphong",
    name: "Dự phòng X2",
    needToTruong: false,
    needQuanDoc: true,
  },
];
export const linesListFilter = linesList.filter(
  (line) =>
    line.value != "lanhdao" &&
    line.value != "quandoc" &&
    line.value != "daotao" &&
    line.value != "epkeo"
);
