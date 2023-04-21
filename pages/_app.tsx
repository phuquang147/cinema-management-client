import { Nunito } from "@next/font/google";
import "@splidejs/react-splide/css/core";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Layout from "~/layout";
import { store } from "~/redux/store";
import "~/styles/globals.scss";

const ssp = Nunito({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ssp.style.fontFamily};
        }
      `}</style>
      <SessionProvider>
        <Provider store={store}>
          <NextNProgress color="#ff5860" height={2} />
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}
