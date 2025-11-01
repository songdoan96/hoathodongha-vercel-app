import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import OneSignal from "react-onesignal";
import { Toaster } from "~/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function QueryProvider({ children }: { children: React.ReactNode }) {
  // f382b427-c4a5-4133-8969-a3522ade9829
  // "396ec33d-241a-453b-86e1-326b1db338ad"
  // .then(() => {
  //       OneSignal.Debug.setLogLevel("trace");
  //     });
  /*
 Authorization: 'os_v2_app_ybzwcdgs45g43elh6xw7vdvspe4vjobaizruv4mbqdfnymf3rtchyjmtxlkqf57ksxijhwcq5xcdf75kqepwmr2eqkj45fxsyqn4dtq',

 os_v2_app_ybzwcdgs45g43elh6xw7vdvspe4vjobaizruv4mbqdfnymf3rtcmum5fvghwfk5kvwycb7a6jjwvpfcdz5tg7ulkckiv3n6gr33mxga
    
 "app_id":"c073610c-d2e7-4dcd-9167-f5edfa8eb279"
 */
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: "c073610c-d2e7-4dcd-9167-f5edfa8eb279",
        // You can add other initialization options here
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
}

export default QueryProvider;
