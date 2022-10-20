import Link from "next/link";
import Image from "next/image";

import PageTitle from "components/common/PageTitle";
import Button from "components/common/Button";
import SeoMeta from "components/common/SeoMeta";

import styles from "styles/pages/not-found.module.scss";

export default function page404() {
  return (
    <>
      <SeoMeta type="404" />
      <div className={styles.page}>
        <div className="wrap">
          <div className={styles.blocks}>
            <div className={styles.text}>
              <Link href="/">
                <a className={styles.logo}>
                  <Image
                    src="/static/img/svg/logo.svg"
                    alt=""
                    width={157}
                    height={28}
                  />
                </a>
              </Link>
              <PageTitle level="H1" size="huge" className={styles.title}>
                404
              </PageTitle>
              <p>
                Unfortunately, <br />
                we couldn&apos;t find the page,
                <br /> that you need
              </p>
              <div>
                <Button href="/">Back to Home</Button>
              </div>
            </div>
            <div className={styles.img}>
              <Image
                src="/static/img/pages/404/404.svg"
                width={938}
                height={985}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
