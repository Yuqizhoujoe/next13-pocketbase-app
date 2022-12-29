import "@/styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../client/components/Container/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextWrapper } from "../client/state/context";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextWrapper>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AppContextWrapper>
  );
}
