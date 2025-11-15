import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import configuration from "./configuration";

const firebaseConfig = {
  apiKey: configuration().FIREBASE.API_KEY,
  authDomain: configuration().FIREBASE.AUTH_DOMAIN,
  projectId: configuration().FIREBASE.PROJECT_ID,
  storageBucket: configuration().FIREBASE.STORAGE_BUCKET,
  messagingSenderId: configuration().FIREBASE.MESSAGING_SENDER_ID,
  appId: configuration().FIREBASE.APP_ID,
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const getFCMToken = async () => {
  try {
    const isFCMSupported = await isSupported();
    if (!isFCMSupported) return null;

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: configuration().FIREBASE.VAPID_KEY,
    });

    return token;
  } catch (error) {
    return null;
  }
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     isSupported().then((supported) => {
//       if (supported) {
//         const messaging = getMessaging(app);
//         onMessage(messaging, (payload) => {
//           resolve(payload);
//         });
//       }
//     });
//   });
