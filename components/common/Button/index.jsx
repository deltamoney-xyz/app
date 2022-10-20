import Link from "next/link";
import classnames from "classnames";

import styles from "./style.module.scss";

export default function Button({
  children,
  href = "",
  target = "",
  type = "button",
  secondary = false, // variant
  disabled = false,
  prelaunch = false,
  red = false,
  loading = false,
  size = "md",
  className,
  onClick,
}) {
  // Sizes: xs, sm, md, lg

  const classes = classnames(styles.btn, className, {
    [styles.xs]: size === "xs",
    [styles.sm]: size === "sm",
    [styles.md]: size === "md",
    [styles.lg]: size === "lg",
    [styles.hg]: size === "hg",
    [styles.isDisabled]: disabled,
    [styles.prelaunch]: prelaunch,
    [styles.secondary]: secondary,
    [styles.red]: red,
  });

  if (href) {
    return (
      <Link href={href}>
        <a target={target} className={classes}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        disabled={disabled}
        className={classes}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
