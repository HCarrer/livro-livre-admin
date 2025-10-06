import { ToastProvider } from "@/contexts/toast";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Niramit } from "next/font/google";

const niramit = Niramit({
  subsets: ["latin"],
  weight: ["400"], // font weight padrão. Pode ser sobrescrito
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={niramit.className}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </main>
  );
}
