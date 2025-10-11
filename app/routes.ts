import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/PublicLayout.tsx", [
    index("routes/home.tsx"), //ok
    // index("routes/form/index.tsx"),

    // route("/freetime", "./routes/freetime.tsx"), //chua

    route("/dang-nhap", "./routes/auth/login.tsx"), //ok
    // route("/dang-ky", "./routes/auth/register.tsx"),
    route("/bao-ve", "./routes/form/security.tsx"), //ok

    ...prefix("/tao-don", [
      index("routes/form/index.tsx"), //ok
      route("/xin-phep", "./routes/form/leave-create.tsx"), //ok
      route("/ra-cong", "./routes/form/out-create.tsx"), //ok
      route("/xem-don/:id", "./routes/form/view.tsx"), //ok
    ]),
    // ...prefix("/chuyen", [
    //   // route("/quote", "./routes/line/quote.tsx"),
    //   route("/tv/:line", "./routes/line/tv.tsx"), //ok

    //   ...prefix("tang-ca", [
    //     index("./routes/overtime/dashboard.tsx"),
    //     route("/:id", "./routes/overtime/view.tsx"),
    //   ]),
    // ]),
    // ...prefix("/kcs", [
    //   index("./routes/kcs/dashboard.tsx"), //ok
    //   route("/bao-cao/:id", "./routes/kcs/report.tsx"), //ok

    //   //can dang nhap
    //   route("/them-chi-tieu", "./routes/kcs/add-target-day.tsx"), //ok
    // ]),

    // ...prefix("/sanxuat", [
    //   index("./routes/produce/dashboard.tsx"), //ok
    //   route("/tv/:line", "./routes/produce/tv-info.tsx"), //ok
    //   // route("/bao-cao/:id", "./routes/kcs/report.tsx"),
    // ]),

    // // Cutting
    // ...prefix("/tocat", [
    //   ...prefix("/bancat", [
    //     index("./routes/cutting/table/index.tsx"),
    //     route("/chitiet", "./routes/cutting/table/detail.tsx"),
    //   ]),
    // ]),
  ]),

  layout("./layouts/PrivateLayout.tsx", [
    // Auth
    route("/dang-xuat", "./routes/auth/logout.tsx"), //ok

    route("/ky-nhan", "./routes/form/signature.tsx"), //ok
    route("/to-chuc", "./routes/form/organization.tsx"), //ok
    route("/tao-don/chinh-sua/:id", "./routes/form/edit.tsx"), //ok

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

    // ...prefix("/chuyen", [
    //   ...prefix("tang-ca", [route("/tao-don", "./routes/overtime/create.tsx")]),
    // ]),
    // layout("./layouts/AdminLayout.tsx", [
    //   ...prefix("admin", [
    //     index("./routes/admin/index.tsx"),
    //     ...prefix("/quote", [
    //       index("./routes/admin/quote/index.tsx"),
    //       // route("/create", "./routes/admin/quote/create.tsx"),
    //       //
    //     ]),
    //     //
    //   ]),
    // ]),

    // Cutting
    // Table
    // ...prefix("/tocat", [...prefix("/bancat", [route("/them", "./routes/cutting/table/add.tsx")])]),
  ]),
] satisfies RouteConfig;
