import classnames from "classnames";
import VisibilitySensor from "react-visibility-sensor";

import Title from "../../../common/Title";

import styles from "./style.module.scss";

export default function SectionEarn() {
  const data = [
    {
      src: "/static/img/pages/home/earn-1.svg",
      excerpt: "Automatically compound your capital",
    },
    {
      src: "/static/img/pages/home/earn-2.svg",
      excerpt: "Better capital efficiency with Delta",
    },
    {
      src: "/static/img/pages/home/earn-3.svg",
      excerpt: "Delta Rewards",
    },
    {
      src: "/static/img/pages/home/earn-4.svg",
      excerpt: "Low Gas Fees",
    },
  ];
  const Block = ({ children }) => {
    return (
      <VisibilitySensor partialVisibility="bottom" offset={{ top: 150 }}>
        {({ isVisible }) => (
          <div
            className={classnames(styles.item, {
              [styles.isVisible]: isVisible,
            })}
          >
            {children}
          </div>
        )}
      </VisibilitySensor>
    );
  };
  return (
    <section className={styles.section} id="section-earn">
      <div className="wrap">
        <div className={styles.block}>
          <div className={styles.content}>
            <Title type="h3" size="h2">
              Earn <br />
              Extra Yield
            </Title>
            <div className={styles.grid}>
              {data.map((item, idx) => (
                <Block key={idx}>
                  <img
                    src={item.src}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <p>{item.excerpt}</p>
                </Block>
              ))}
            </div>
          </div>
          <VisibilitySensor partialVisibility="bottom" offset={{ top: 150 }}>
            {({ isVisible }) => (
              <div
                className={classnames(styles.media, {
                  [styles.isVisible]: isVisible,
                })}
              >
                <img
                  src="/static/img/pages/home/earn-chart.svg"
                  alt=""
                  width={718}
                  height={680}
                  loading="lazy"
                />
              </div>
            )}
          </VisibilitySensor>
        </div>
      </div>
    </section>
  );
}
