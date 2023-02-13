import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../client/components/Container/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextWrapper } from "../client/state/context";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppContextWrapper>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </AppContextWrapper>
    </SessionProvider>
  );
}
