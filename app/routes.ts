import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  //   Auth
  route("dang-nhap", "./routes/auth/login.tsx"),
  route("dang-xuat", "./routes/auth/logout.tsx"),
  // End Auth

  // Forms
  route("bao-ve", "./routes/forms/security.tsx"),

  ...prefix("tao-don", [
    index("./routes/forms/index.tsx"),
    route("ra-cong", "./routes/forms/out.tsx"),
    route("nghi-phep", "./routes/forms/leave.tsx"),
  ]),
  // End Forms

  ...prefix("luong", [index("./routes/salaries/search.tsx")]),

  layout("./components/providers/PrivateProvider.tsx", [
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
  ]),
] satisfies RouteConfig;
