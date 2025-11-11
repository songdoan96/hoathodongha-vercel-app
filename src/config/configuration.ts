type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

type ExpiresIn =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8888,
  jwt: {
    secret: process.env.JWT_SECRET || 'd2b67382-8f59-4c5f-9536-ff96c9bd1996',
    expiresIn: (process.env.JWT_EXPIRES as ExpiresIn) || '10d',
  },
  onesignal: {
    app_id: process.env.ONESIGNAL_APP_ID,
    auth: process.env.ONESIGNAL_AUTH,
  },
});

/*
export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8888,
  jwt: {
    // d2b67382-8f59-4c5f-9536-ff96c9bd1996
    secret: process.env.JWT_SECRET || 'd2b67382-8f59-4c5f-9536-ff96c9bd1996',
    expiresIn: process.env.JWT_EXPIRES || '10d',
    // maxAge: Number(process.env.MAX_AGE),
  },
  frontendUrl: process.env.FRONTEND_URL,
  onesignal: {
    app_id: process.env.ONESIGNAL_APP_ID,
    auth: process.env.ONESIGNAL_AUTH,
  },
});

// TEST
// 6661b28a-59c8-44f2-90d1-48e8981b281d
// os_v2_app_mzq3fcszzbcpfegrjdujqgzidxqr6ldodbpufuea4lef6c2hj2vfbypm5ydxiwd6m6bc2i3ea3gs7sqnyjnxcjfufktn2wua7qwe5rq

// PRODUCTION
// 97778f54-120f-414b-a4d6-bd6883637e41
// os_v2_app_s53y6vasb5auxjgwxvuigy36ihycz4uny5keve4e22nla3pqyfwlil5wwepzw7gcwfssopcotgroglwkz475fp4ge3k42momuahtfgq
*/
