import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import styles from "./style.module.scss";

export default function PrimaryMenu({ opened }) {
  const router = useRouter();

  const menu = [
    {
      label: "Overview",
      anch: "#section-overview",
    },
    {
      label: "Why",
      anch: "#section-why",
    },
    {
      label: "Earn",
      anch: "#section-earn",
    },
    {
      label: "Ecosystem",
      anch: "#section-ecosystem",
    },
    // {
    //   label: "News",
    //   anch: "#section-news",
    // },
  ];

  const checkActiveClass = (route) => {
    return router.route === route.slice(0, -1) ? styles.active : "";
  };

  const onScrollTo = (anchor) => {
    if (typeof window !== "undefined") {
      const block = document.querySelector(anchor);
      if (block) {
        const offset = block.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  const MenuLink = ({ item, noIcon = false }) => {
    return (
      <Link href={item.link}>
        <a
          className={checkActiveClass(item.link)}
          data-disabled={item.disabled}
        >
          {item.label}
        </a>
      </Link>
    );
  };

  return (
    <nav
      className={classnames(styles.menu, "js__mobile-menu", {
        [styles.opened]: opened,
      })}
    >
      <ul className={styles.list}>
        {menu.map((item, idx) => (
          <li key={idx} onClick={() => onScrollTo(item.anch)}>
            {/*<MenuLink item={item} />*/}
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// const IconCarret = () => (
//   <svg
//     width="9"
//     height="6"
//     viewBox="0 0 9 6"
//     fill="#BCC2C9"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M0.472243 0.910841C0.716321 0.666764 1.11205 0.666764 1.35613 0.910841L4.49997 4.05469L7.64382 0.910841C7.88789 0.666764 8.28362 0.666764 8.5277 0.910841C8.77178 1.15492 8.77178 1.55065 8.5277 1.79472L4.94191 5.38051C4.69784 5.62459 4.30211 5.62459 4.05803 5.38051L0.472243 1.79472C0.228165 1.55065 0.228165 1.15492 0.472243 0.910841Z" />
//   </svg>
// );
