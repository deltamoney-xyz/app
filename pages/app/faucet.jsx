import styles from "../../styles/pages/app.module.scss";
import httpAuthCheck from "logic/httpAuthCheck";

export default function PageFaucet() {
  return (
    <div className="wrap-fluid">
      <div className={styles.head}>
        <div className={styles.balance} data-color="blue">
          <div className={styles.balanceTitle}>Coming soon...</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;

  // await httpAuthCheck(req, res);
  if (ctx.req) {
    await httpAuthCheck(req, res);
  }

  return {
    props: {
      app: true,
    },
  };
}
