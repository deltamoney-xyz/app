import classnames from "classnames";

import styles from "./style.module.scss";

export default function Modal({
  children,
  isVisible = false,
  withHead = false,
  onClose = () => {},
  className,
}) {
  return (
    <div
      className={classnames(styles.background, className, {
        [styles.isVisible]: isVisible,
      })}
      onClick={() => onClose()}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          type="button"
          className={classnames(styles.btnClose, {
            [styles.withHead]: withHead,
          })}
          onClick={() => onClose()}
        >
          <IconClose />
        </button>
      </div>
    </div>
  );
}

const IconClose = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="#747888"
    strokeWidth="1.75"
    strokeMiterlimit="10"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 18L18 6" />
    <path d="M18 18L6 6" />
  </svg>
);
