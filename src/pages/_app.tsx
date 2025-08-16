import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Niramit } from "next/font/google";

const niramit = Niramit({
  subsets: ["latin"],
  weight: ["400"], // pick what you need
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={niramit.className}>
      <Component {...pageProps} />
    </main>
  );
}