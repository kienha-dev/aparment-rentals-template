"use client";

import queryClient from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="4px"
        color="#020617"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
};

export default Providers;
