import Layout from "components/Layout";
import Providers from "wrappers/Providers";

import "styles/style.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Layout app={pageProps.app || false}>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

export default MyApp;
