import Link from "next/link";
import classnames from "classnames";
import { useState, useEffect } from "react";

import Button from "../../common/Button";
import PrimaryMenu from "./PrimaryMenu";

import styles from "./style.module.scss";

export default function Header() {
  const [openedMenu, setOpenedMenu] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener(
        "click",
        (e) => {
          if (
            !e.target.closest(".js__mobile-menu") &&
            !e.target.closest(".js__menu-toggle") &&
            openedMenu === true
          ) {
            setOpenedMenu(false);
          }
        },
        { passive: true }
      );
    }
  }, [openedMenu]);

  return (
    <>
      {/*<div className={styles.advert}>*/}
      {/*  Aptos World Solution - Retweet DeltaMoney & win a new MacBook 🎁*/}
      {/*</div>*/}
      <header className={styles.header}>
        <div className={classnames(styles.wrap, "wrap")}>
          <Link href="/">
            <a className={styles.logo}>
              <img
                src="/static/img/svg/logo.svg"
                alt=""
                width={157}
                height={28}
              />
            </a>
          </Link>
          <PrimaryMenu opened={openedMenu} />
          <div className={styles.controls}>
            <div className={styles.button}>
              <Button disabled prelaunch size="sm">
                Launch App
              </Button>
              <span>Coming Soon</span>
            </div>
            <button
              className={classnames(styles.toggleMenu, "js__menu-toggle", {
                [styles.isPressed]: openedMenu,
              })}
              type="button"
              onClick={() => setOpenedMenu(!openedMenu)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
