import Title from "components/common/Title";
import Button from "components/common/Button";
import InternalLink from "components/common/InternalLink";

import SeoMeta from "components/common/SeoMeta";
import SectionWhy from "components/pages/home/SectionWhy";
import SectionEarn from "components/pages/home/SectionEarn";
import SectionEcosystem from "components/pages/home/SectionEcosystem";
import SectionNews from "components/pages/home/SectionNews";

import styles from "styles/pages/home.module.scss";

export default function Home({ data }) {
  return (
    <>
      <SeoMeta type="home" />

      <section className={styles.hero}>
        <div className="wrap">
          <Title
            size="h1"
            type="h1"
            tac
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          {/*<p className={styles.description}>{data.description}</p>*/}
          <ul className={styles.buttons}>
            <li>
              <Button size="md" disabled>
                Launch app
              </Button>
              <span>Coming Soon</span>
            </li>
            {/*<li><InternalLink href="/" target>View Docs</InternalLink></li>*/}
          </ul>
          <div className={styles.screenshot} id="section-overview">
            <img
              src="/static/img/pages/home/screenshot.png"
              alt=""
              width={1036}
              height={736}
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <SectionWhy />
      <SectionEarn />
      <SectionEcosystem />
      {/*<SectionNews/>*/}
    </>
  );
}

export async function getServerSideProps() {
  const data = {
    title: "Aptos Yield on <br/>Autopilot",
    description: "The placeholder text, beginning with the line lorem",
  };

  return {
    props: {
      data: data,
    },
  };
}
