import "@/styles/main.scss";
import "@fontsource/k2d";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
