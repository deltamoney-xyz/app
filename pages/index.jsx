import Title from "components/common/Title";
import Button from "components/common/Button";
import InternalLink from "components/common/InternalLink";

import SeoMeta from "components/common/SeoMeta";
import SectionWhy from "components/pages/home/SectionWhy";
import SectionRoadmap from "components/pages/home/SectionRoadmap";
import SectionEarn from "components/pages/home/SectionEarn";
import SectionEcosystem from "components/pages/home/SectionEcosystem";
import SectionNews from "components/pages/home/SectionNews";

import styles from "styles/pages/home.module.scss";
import Image from "next/image";

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
              <Button
                size="hg"
                href="https://tally.so/r/wMek0g"
                target="_blank"
              >
                Join Waitlist
              </Button>
            </li>
            <li>
              <Button size="hg" disabled prelaunch>
                Launch app
              </Button>
              <span>Coming Soon</span>
            </li>
            {/*<li><InternalLink href="/" target>View Docs</InternalLink></li>*/}
          </ul>
          <div className={styles.screenshot} id="section-overview">
            <Image
              src="/static/img/pages/home/screenshot-app-2x.png"
              alt=""
              width={1036}
              height={704}
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <SectionWhy />
      <SectionRoadmap />
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
