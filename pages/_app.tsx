import { Nunito } from "@next/font/google";
import "@splidejs/react-splide/css/core";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import Layout from "~/layout";
import { store } from "~/redux/store";
import "~/styles/globals.scss";

const ssp = Nunito({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    const handleChangeMode = () => {
      console.log(localStorage.getItem("theme"));

      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleChangeMode);
    }

    return () => {
      window.removeEventListener("storage", handleChangeMode);
    };
  });

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
