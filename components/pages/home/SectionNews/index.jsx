import Title from "../../../common/Title";
import Button from "../../../common/Button";

import styles from "./style.module.scss";

export default function SectionNews() {
  const articles = [
    {
      img: "/static/img/del/article-1.png",
      category: "Announcement",
      date: {
        readable: "August 18, 2022",
        machine: "2022-08-18 19:00",
      },
      title: "UNI Drops on Report That SEC is Investigating Uniswap Labs",
      link: "/",
      description:
        "UNI took a dive following the reports that the US Securities and Exchange Commission (SEC) is ...",
    },
  ];

  return (
    <section className={styles.section} id="section-news">
      <div className="wrap">
        <Title type="h3" size="h2" tac>
          News
        </Title>
        <p className={styles.description}>Follow the news with Delta Money</p>
        <div className={styles.loop}>
          {articles &&
            articles.length > 0 &&
            articles.map((item, idx) => <Article key={idx} data={item} />)}
          <SoonBlock />
          <MoreBlock />
        </div>
      </div>
    </section>
  );
}

const Article = ({ data }) => (
  <article className={styles.article}>
    <img
      src={data.img}
      alt=""
      width={400}
      height={256}
      loading="lazy"
      className={styles.thumbnail}
    />
    <ul className={styles.meta}>
      <li>{data.category}</li>
      <li>
        <time dateTime={data.date.machine}>{data.date.readable}</time>
      </li>
    </ul>
    <h4 className={styles.title}>
      <a href={data.link} target="_blank" rel="noreferrer">
        {data.title}
      </a>
    </h4>
    <p className={styles.description}>{data.description}</p>
  </article>
);

const SoonBlock = () => (
  <div className={styles.soonBlock}>
    <span>Coming Soon</span>
    <img
      src="/static/img/pages/home/news-soon.png"
      alt=""
      width={400}
      height={448}
      loading="lazy"
    />
  </div>
);

const MoreBlock = () => (
  <div className={styles.moreBlock}>
    <Button href="/" target size="lg">
      View all Articles
    </Button>
  </div>
);
