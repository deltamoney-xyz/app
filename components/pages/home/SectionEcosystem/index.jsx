import Title from "../../../common/Title";

import styles from './style.module.scss';

export default function SectionEcosystem() {
	return <section className={styles.section} id="section-ecosystem">
		<div className="wrap">
			<Title type="h3" size="h2" tac>Aptos Ecosystem</Title>
			<img src="/static/img/pages/home/ecosystem.png" alt="" width={1248} height={555} loading="lazy"/>
		</div>
	</section>
}