import Layout from "components/Layout";
import Providers from "wrappers/Providers";

import "styles/style.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      switch (router.pathname) {
        case "/404":
          document.body.classList.add("hide-header-footer");
          break;
        case "/500":
          document.body.classList.add("hide-header-footer");
          break;
        default:
          document.body.classList.remove("hide-header-footer");
      }
    }
  }, [router]);

  return (
    <Providers>
      <Layout app={pageProps.app || false}>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

export default MyApp;
