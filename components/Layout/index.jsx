import AppMenu from "./AppMenu";
import AppHeader from "./AppHeader";
import Header from "./Header";
import Footer from "./Footer";

import styles from "./style.module.scss";

export default function Layout({ children, app = false }) {
  return app ? (
    <div className={styles.parent}>
      <AppMenu />
      <main className={styles.main}>
        <AppHeader />
        {children}
      </main>
    </div>
  ) : (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
