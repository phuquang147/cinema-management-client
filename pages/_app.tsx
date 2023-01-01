import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Source_Sans_Pro } from "@next/font/google";

const ssp = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ssp.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
