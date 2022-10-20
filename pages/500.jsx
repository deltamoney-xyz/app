import classnames from "classnames";

import PageTitle from "components/common/PageTitle";
import Button from "components/common/Button";
import SeoMeta from "components/common/SeoMeta";

import styles from "styles/pages/not-found.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function page500() {
  return (
    <>
      <SeoMeta type="500" />
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
                500
              </PageTitle>
              <p>
                Woops,
                <br />
                something went wrong ...
              </p>
              <div>
                <Button
                  onClick={() => {
                    location.reload();
                  }}
                >
                  Try again
                </Button>
              </div>
            </div>
            <div className={classnames(styles.img, styles.img500)}>
              <Image
                src="/static/img/pages/500/500.svg"
                width={739}
                height={911}
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
