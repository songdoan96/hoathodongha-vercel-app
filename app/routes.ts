import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/PublicLayout.tsx", [
    index("./routes/home.tsx"), //ok
    route("/dang-nhap", "./routes/auth/login.tsx"), //ok
    // route("/dang-ky", "./routes/auth/register.tsx"),
    route("/bao-ve", "./routes/form/security.tsx"), //ok

    ...prefix("/tao-don", [
      index("routes/form/index.tsx"), //ok
      route("/xin-phep", "./routes/form/leave-create.tsx"), //ok
      route("/ra-cong", "./routes/form/out-create.tsx"), //ok
      // route("/xem-don/:id", "./routes/form/view.tsx"), //ok
    ]),
  ]),

  layout("./layouts/PrivateLayout.tsx", [
    // Auth
    route("/dang-xuat", "./routes/auth/logout.tsx"), //ok

    route("/ky-nhan", "./routes/form/signature.tsx"), //ok
    route("/to-chuc", "./routes/form/organization.tsx"), //ok

    ...prefix("/tao-don", [
      route("/chinh-sua/:id", "./routes/form/edit.tsx"), //ok
      route("/xem-don/:id", "./routes/form/view.tsx"), //ok
    ]),

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
