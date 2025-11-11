import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "../ui/sonner";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  // useEffect(() => {
  //   const initializeOneSignal = async () => {
  //     try {
  //       if (typeof window !== "undefined") {
  //         await OneSignal.init({
  //           appId: configuration().ONESIGNAL_APP_ID,
  //           allowLocalhostAsSecureOrigin: process.env.NODE_ENV !== "production",
  //         });
  //         await OneSignal.Slidedown.promptPush();
  //       }
  //     } catch (error) {
  //       console.error("Error initializing OneSignal:", error);
  //     }
  //   };
  //   initializeOneSignal();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors closeButton duration={1000} />
    </QueryClientProvider>
  );
}
