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
  FRONTEND_URL: process.env.FRONTEND_URL,
  FIREBASE: {
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
});
