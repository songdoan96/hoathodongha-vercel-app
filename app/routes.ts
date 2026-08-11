import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  //   Auth
  route("dang-nhap", "./routes/auth/login.tsx"),
  route("dang-xuat", "./routes/auth/logout.tsx"),
  // End Auth

  route("/chinhsach", "./routes/policy.tsx"),

  // Forms
  route("bao-ve", "./routes/forms/security.tsx"),

  ...prefix("tao-don", [
    index("./routes/forms/index.tsx"),
    route("ra-cong", "./routes/forms/out.tsx"),
    route("nghi-phep", "./routes/forms/leave.tsx"),

    route("/chi-tiet", "./routes/forms/detail.tsx"),
  ]),
  // End Forms

  ...prefix("luong", [
    index("./routes/salaries/search.tsx"),
    route("/chitiet", "./routes/salaries/details.tsx"),
    route("/chitiet-tong", "./routes/salaries/overview.tsx"),
  ]),

  ...prefix("tangca", [
    index("./routes/overtime/dashboard.tsx"),
    route("/chitiet/:id", "./routes/overtime/detail.tsx"),
    route("/baove", "./routes/overtime/security-dashboard.tsx"),
    route("/baove/chitiet/:id", "./routes/overtime/security-detail.tsx"),
  ]),

  ...prefix("ansang", [
    index("./routes/meals/dashboard.tsx"),
    route("/nhaan", "./routes/meals/kitchen.tsx"),
    route("/in", "./routes/meals/print.tsx"),
    route("/them", "./routes/meals/add.tsx"),
    route("/file", "./routes/meals/export.tsx"),
  ]),

  ...prefix("gop-y", [
    // index("./routes/feedback/dashboard.tsx"),
    route("/them", "./routes/feedback/create.tsx"),
  ]),

  ...prefix("hanghoa", [
    index("./routes/goods/dashboard.tsx"),
    route("/taophieu", "./routes/goods/create.tsx"),
    route("/baove", "./routes/goods/security.tsx"),

    route("/chitiet/:id", "./routes/goods/detail.tsx"),
  ]),

  layout("./components/providers/PrivateProvider.tsx", [
    // Meals
    ...prefix("ansang", [route("/bophan", "./routes/meals/line.tsx")]),

    //tangca
    ...prefix("tangca", [
      route("/taodon", "./routes/overtime/create.tsx"),
      route("/suadon/:id", "./routes/overtime/edit.tsx"),
    ]),
    //luong
    ...prefix("luong", [
      route("/tailen", "./routes/salaries/upload.tsx"),
      route("/phanhoi", "./routes/salaries/feedback.tsx"),
      route("/thongtin", "./routes/salaries/info.tsx"),
      route("/bangluong/:id", "./routes/salaries/salary-table.tsx"),
    ]),
    // Forms
    route("/to-chuc", "./routes/forms/organization.tsx"),
    route("ky-nhan", "./routes/forms/signature.tsx"),
    ...prefix("tao-don", [
      route("/xem-don/:id", "./routes/forms/view.tsx"),
      route("/chinh-sua/:id", "./routes/forms/edit.tsx"),
    ]),
    // End Forms

    ...prefix("users", [
      index("./routes/auth/dashboard.tsx"), //ok
      route("/chinh-sua/:id", "./routes/auth/edit.tsx"), //ok
      route("/add", "./routes/auth/add.tsx"), //ok
    ]),
    ...prefix("nhan-vien", [
      index("./routes/employee/dashboard.tsx"),
      route("/chinh-sua/:id", "./routes/employee/edit.tsx"),
      route("/them-moi", "./routes/employee/add.tsx"),
    ]),

    ...prefix("gop-y", [index("./routes/feedback/dashboard.tsx")]),
  ]),
] satisfies RouteConfig;
