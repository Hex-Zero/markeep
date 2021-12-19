import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Markeep</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
