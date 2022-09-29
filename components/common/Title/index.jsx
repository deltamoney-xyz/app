import classnames from "classnames";

import styles from "./style.module.scss";

export default function Title({
  children,
  size,
  type,
  block = false,
  tac = false,
  className,
  ...props
}) {
  const classes = classnames(styles.title, className, {
    [styles.h1]: size === "h1",
    [styles.h2]: size === "h2",
    [styles.h3]: size === "h3",
    [styles.h4]: size === "h4",
    [styles.h5]: size === "h5",
    [styles.h6]: size === "h6",
    [styles.tac]: tac,
  });

  if (block) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  } else {
    if (type === "h1") {
      return (
        <h1 className={classes} {...props}>
          {children}
        </h1>
      );
    } else if (type === "h2") {
      return (
        <h2 className={classes} {...props}>
          {children}
        </h2>
      );
    } else if (type === "h3") {
      return (
        <h3 className={classes} {...props}>
          {children}
        </h3>
      );
    } else if (type === "h4") {
      return (
        <h4 className={classes} {...props}>
          {children}
        </h4>
      );
    } else if (type === "h5") {
      return (
        <h5 className={classes} {...props}>
          {children}
        </h5>
      );
    } else if (type === "h6") {
      return (
        <h6 className={classes} {...props}>
          {children}
        </h6>
      );
    }
  }
}
