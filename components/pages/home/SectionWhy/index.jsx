import Title from "../../../common/Title";

import styles from './style.module.scss';

export default function SectionWhy() {
	return <section className={styles.section} id="section-why">
		<div className="wrap">
			<Title type="h3" size="h2" tac>Why <br/>Delta Money?</Title>
			<div className={styles.grid}>
				<div className={styles.block}>
					<h4 className={styles.title}>Earn Yield On Multiple Tokens</h4>
					<p className={styles.description}>Delta helps users generate sustainable yields on upcoming Aptos tokens.</p>
					<img src="/static/img/pages/home/why-1.svg" alt="" loading="lazy"/>
				</div>
				<div className={styles.block}>
					<h4 className={styles.title}>Vaults and Structured Products</h4>
					<p className={styles.description}>Simple and easy to use vaults.</p>
					<img src="/static/img/pages/home/why-2.svg" alt="" loading="lazy"/>
				</div>
				<div className={styles.block}>
					<h4 className={styles.title}>Community Driven</h4>
					<p className={styles.description}>Become a strategist and earn with us.</p>
					<img src="/static/img/pages/home/why-3.svg" alt="" loading="lazy"/>
				</div>
			</div>
		</div>
	</section>
}