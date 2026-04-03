export interface LineListType {
  value: string;
  name: string;
  isHelp?: boolean;
  needToTruong?: boolean;
  needQuanDoc?: boolean;
  onlyLanhDao?: boolean;
  sortName?: string;
}
export const linesList: LineListType[] = [
  {
    value: "X1_01",
    name: "X1 - Tổ 1",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "1X1",
  },
  {
    value: "X1_02",
    name: "X1 - Tổ 2",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "2X1",
  },
  {
    value: "X1_03",
    name: "X1 - Tổ 3",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "3X1",
  },
  {
    value: "X1_04",
    name: "X1 - Tổ 4",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "4X1",
  },
  {
    value: "X1_05",
    name: "X1 - Tổ 5",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "5X1",
  },
  {
    value: "X1_06",
    name: "X1 - Tổ 6",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "6X1",
  },
  {
    value: "X1_07",
    name: "X1 - Tổ 7",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "7X1",
  },
  {
    value: "X1_08",
    name: "X1 - Tổ 8",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "8X1",
  },
  {
    value: "X1_09",
    name: "X1 - Tổ 9",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "9X1",
  },
  {
    value: "X1_duphong",
    name: "Dự phòng X1",
    needToTruong: false,
    needQuanDoc: true,
    sortName: "DP1",
  },

  {
    value: "X2_01",
    name: "X2 - Tổ 1",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "1X2",
  },
  {
    value: "X2_02",
    name: "X2 - Tổ 2",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "2X2",
  },
  {
    value: "X2_03",
    name: "X2 - Tổ 3",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "3X2",
  },
  {
    value: "X2_04",
    name: "X2 - Tổ 4",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "4X2",
  },
  {
    value: "X2_05",
    name: "X2 - Tổ 5",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "5X2",
  },
  {
    value: "X2_06",
    name: "X2 - Tổ 6",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "6X2",
  },
  {
    value: "X2_07",
    name: "X2 - Tổ 7",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "7X2",
  },
  {
    value: "X2_08",
    name: "X2 - Tổ 8",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "8X2",
  },
  {
    value: "X2_09",
    name: "X2 - Tổ 9",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "9X2",
  },
  {
    value: "X2_duphong",
    name: "Dự phòng X2",
    needToTruong: false,
    needQuanDoc: true,
    sortName: "DP2",
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
    // needToTruong: true,
    // needQuanDoc: false,
    needToTruong: false,
    needQuanDoc: false,
    sortName: "KT",
  },
  {
    value: "X1_chuyendung",
    name: "C.Dùng 1",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "CD1",
  },
  {
    value: "X2_chuyendung",
    name: "C.Dùng 2",
    isHelp: true,
    needToTruong: true,
    needQuanDoc: true,
    sortName: "CD2",
  },
  {
    value: "codien",
    name: "Cơ điện",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "CĐ",
  },
  {
    value: "tocat",
    name: "Tổ cắt",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "CẮT",
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
    needToTruong: false,
    needQuanDoc: false,
    sortName: "BVVS",
  },
  {
    value: "hoanthanh",
    name: "Hoàn thành",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "HT",
  },
  {
    value: "kcs",
    name: "KCS",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "KCS",
  },
  {
    value: "nguyenlieu",
    name: "Nguyên liệu",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "NL",
  },
  {
    value: "phulieu",
    name: "Phụ liệu",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "PL",
  },
  {
    value: "vanphong",
    name: "Văn phòng",
    needToTruong: false,
    needQuanDoc: false,
    sortName: "VP",
  },
  {
    value: "nhaan",
    name: "Nhà ăn",
    needToTruong: true,
    needQuanDoc: false,
    sortName: "BẾP",
  },
];
export const linesListFilter = linesList.filter(
  (line) =>
    line.value != "lanhdao" &&
    line.value != "quandoc" &&
    line.value != "daotao" &&
    line.value != "epkeo",
);
export const linesListFilterSortName = linesList.filter(
  (line) =>
    line.value != "lanhdao" &&
    line.value != "quandoc" &&
    line.value != "daotao" &&
    line.value != "epkeo" &&
    line.sortName,
);
