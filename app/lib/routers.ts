export default () => ({
  main: {
    home: "/",
  },
  auth: {
    login: "/dang-nhap",
    dashboard: "/users",
    register: "/dang-ky",
    add: "/users/add",
    edit: (id?: number) => `/users/edit/${id}`,
    logout: "/dang-xuat",
  },
  forms: {
    signature: "/ky-nhan",
    index: "/tao-don",
    create: {
      out: "/tao-don/ra-cong",
      leave: "/tao-don/nghi-phep",
    },
    edit: (id: string) => "/tao-don/chinh-sua/" + id,
    view: (id: string) => "/tao-don/xem-don/" + id,
    detail: "/tao-don/chi-tiet",
    security: "/bao-ve",
  },
  overtime: {
    dashboard: "/tangca",
    create: "/tangca/taodon",
    detail: (id: string) => "/tangca/chitiet/" + id,
    edit: (id: string) => "/tangca/suadon/" + id,
    security: "/tangca/baove",
    detailSecurity: (id: string) => "/tangca/baove/chitiet/" + id,
  },
  meals: {
    line: "/ansang/bophan",
    dashboard: "/ansang",
    kitchen: "/ansang/nhaan",
    print: "/ansang/in",
  },
  employees: {
    edit: (id: string) => `/nhan-vien/chinh-sua/${id}`,
  },
  feedback: {
    dashboard: "/gop-y",
    create: "/gop-y/them",
  },
});
