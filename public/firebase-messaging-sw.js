importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBd3X7P-zXUaLaQrhJ2hB_Rzv-lVx-VWjE",
  authDomain: "hoathodongha-7aeb3.firebaseapp.com",
  projectId: "hoathodongha-7aeb3",
  storageBucket: "hoathodongha-7aeb3.firebasestorage.app",
  messagingSenderId: "108625565576",
  appId: "1:108625565576:web:77c8bbef9894f870bf0c3d",
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/images/favicon.ico",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
