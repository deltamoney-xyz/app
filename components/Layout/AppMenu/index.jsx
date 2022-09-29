import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

import styles from "./style.module.scss";

export default function AppMenu() {
  const router = useRouter();

  const menu = [
    {
      href: "/app",
      label: "Staking",
      icon: "/static/img/svg/icons/menu-staking.svg",
    },
    {
      href: "/app/borrow",
      label: "Borrow",
      icon: "/static/img/svg/icons/menu-dashboard.svg",
    },
    {
      href: "/app/faucet",
      label: "Faucet",
      icon: "/static/img/svg/icons/menu-faucet.svg",
    },
  ];

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.logo}>
          <img src="/static/img/svg/logo.svg" alt="" width={157} height={28} />
        </a>
      </Link>
      <nav className={styles.menu}>
        <ul>
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={`${item.href}/`}>
                <a
                  className={
                    router.route === item.href ? styles.isActive : undefined
                  }
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
