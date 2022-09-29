import classnames from "classnames";

import styles from './style.module.scss';

export default function InternalLink({children, href = "", target = false, className}) {
	return <a href={href} target={target} className={classnames(styles.link, className)}>{children}</a>
}