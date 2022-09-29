import classnames from "classnames";
import styles from "./style.module.scss";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={classnames(styles.wrap, "wrap")}>
        <div className={styles.heading}>Join Our Community</div>
        <ul className={styles.socials}>
          <li>
            <a
              href="https://twitter.com/wearedeltamoney"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/static/img/svg/icons/socials-twitter.svg"
                alt=""
                width={19}
                height={15}
                loading="lazy"
              />
            </a>
          </li>
          {/*<li>*/}
          {/*  <a href="#" target="_blank" rel="noreferrer">*/}
          {/*    <img*/}
          {/*      src="/static/img/svg/icons/socials-discord.svg"*/}
          {/*      alt=""*/}
          {/*      width={20}*/}
          {/*      height={14}*/}
          {/*      loading="lazy"*/}
          {/*    />*/}
          {/*  </a>*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  <a href="#" target="_blank" rel="noreferrer">*/}
          {/*    <img*/}
          {/*      src="/static/img/svg/icons/socials-medium.svg"*/}
          {/*      alt=""*/}
          {/*      width={26}*/}
          {/*      height={14}*/}
          {/*      loading="lazy"*/}
          {/*    />*/}
          {/*  </a>*/}
          {/*</li>*/}
          <li>
            <a
              href="https://t.me/deltamoneyofficial"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/static/img/svg/icons/socials-telegram.svg"
                alt=""
                width={22}
                height={18}
                loading="lazy"
              />
            </a>
          </li>
        </ul>
        <small className={styles.copyright}>
          © 2022 Delta Money, All rights reserved.
        </small>
        <div className={styles.top} onClick={scrollToTop}>
          <img src="/static/img/svg/icons/arrow-down--dm.svg" />
        </div>
      </div>
    </footer>
  );
}
