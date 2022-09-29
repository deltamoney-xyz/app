import Title from "../../../common/Title";

import styles from './style.module.scss';

export default function SectionEarn() {
	return <section className={styles.section} id="section-earn">
		<div className="wrap">
			<div className={styles.block}>
				<div className={styles.content}>
					<Title type="h3" size="h2">Earn <br/>Extra Yield</Title>
					<div className={styles.grid}>
						<div className={styles.item}>
							<img src="/static/img/pages/home/earn-1.svg" alt="" width={64} height={64} loading="lazy"/>
							<p>Automatically compound your capital</p>
						</div>
						<div className={styles.item}>
							<img src="/static/img/pages/home/earn-2.svg" alt="" width={64} height={64} loading="lazy"/>
							<p>Better capital efficiency with Delta</p>
						</div>
						<div className={styles.item}>
							<img src="/static/img/pages/home/earn-3.svg" alt="" width={64} height={64} loading="lazy"/>
							<p>Delta Rewards</p>
						</div>
						<div className={styles.item}>
							<img src="/static/img/pages/home/earn-4.svg" alt="" width={64} height={64} loading="lazy"/>
							<p>Low Gas Fees</p>
						</div>
					</div>
				</div>
				<div className={styles.media}>
					<img src="/static/img/pages/home/earn-chart.svg" alt="" width={718} height={680} loading="lazy"/>
				</div>
			</div>
		</div>
	</section>
}