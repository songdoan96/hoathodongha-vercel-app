const routers = {
  main: {
    home: "/",
  },
  auth: {
    dashboard: "/users",
    login: "/dang-nhap",
    register: "/dang-ky",
    add: "/users/add",
    edit: (id?: number) => `/users/edit/${id}`,
    logout: "/dang-xuat",
  },
  form: {
    index: "/tao-don",
    signature: "/ky-nhan",
    leaveCreate: "/tao-don/xin-phep",
    outCreate: "/tao-don/ra-cong",
    security: "/bao-ve",
    view: (id?: number) => `/tao-don/xem-don/${id}`,
    edit: (id?: number) => `/tao-don/chinh-sua/${id}`,
  },
  employee: {
    dashboard: "/nhan-vien",
    add: "/nhan-vien/them-moi",
    edit: (id?: number) => `/nhan-vien/chinh-sua/${id}`,
  },
  overtime: {
    dashboard: "/chuyen/tang-ca",
    view: (id?: number) => `/chuyen/tang-ca/${id}`,
  },

  // Cutting
  // Table
  cutting: {
    table: {
      index: () => "/tocat/bancat",
      add: () => "/tocat/bancat/them",
      detail: () => `/tocat/bancat/chitiet`,
    },
  },
};

export default routers;
