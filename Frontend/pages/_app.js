import Head from "next/head";
import "../styles/globals.css";
import "../pages/App.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EventSplIIT</title>
        <link rel="icon" href="https://i.ibb.co/JvG6Lzn/logo-new.png" />
      </Head>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
