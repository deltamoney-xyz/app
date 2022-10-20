import classnames from "classnames";

import styles from "./style.module.scss";

export default function PageTitle({
  className,
  children,
  level,
  type = "serif",
  size,
  tac = false,
  gradient = false,
  ...props
}) {
  const classes = classnames(styles.title, className, {
    [styles.serif]: type !== "serif",
    [styles.tiny]: size === "tiny",
    [styles.small]: size === "small",
    [styles.large]: size === "large",
    [styles.extralarge]: size === "extralarge",
    [styles.huge]: size === "huge",
    [styles.tac]: tac,
    [styles.gradient]: gradient,
  });
  return level === "H4" ? (
    <h4 className={classes} {...props}>
      {children}
    </h4>
  ) : level === "H3" ? (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  ) : level === "H2" ? (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  ) : (
    <h1 className={classes} {...props}>
      {children}
    </h1>
  );
}
