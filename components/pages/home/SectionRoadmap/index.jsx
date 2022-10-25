import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import classnames from "classnames";

import Title from "components/common/Title";

import styles from "./style.module.scss";

export default function SectionRoadmap() {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <VisibilitySensor partialVisibility="bottom" offset={{ top: 150 }}>
          {({ isVisible }) => (
            <span
              className={classnames(styles.year, {
                [styles.isVisible]: isVisible,
              })}
            >
              <b>2022</b>
            </span>
          )}
        </VisibilitySensor>
        <Title type="h3" size="h2" tac>
          Road map
        </Title>
        <VisibilitySensor partialVisibility="bottom" offset={{ top: 150 }}>
          {({ isVisible }) => (
            <p
              className={classnames(styles.desc, {
                [styles.isVisible]: isVisible,
              })}
            >
              Delta Money Roadmap
            </p>
          )}
        </VisibilitySensor>
        <RoadMap />
      </div>
    </section>
  );
}

const RoadMap = () => {
  const list = [
    { done: true, label: "Launch Website V1" },
    { done: true, label: "DApp design and frontend" },
    { done: true, label: "Single Sided Vault smart contract" },
    { done: true, label: "Liquidity pool smart contract" },
    { done: true, label: "Multi-token pool smart contracts" },
    {
      done: true,
      label: "Internal smart contract security audit",
      children: [
        "Internal smart contract security audit",
        "Audit network connections",
      ],
    },
    { done: true, label: "Popular Aptos Wallets integration" },
    { done: true, label: "Website UI updates" },
    { done: false, label: "Build out community discord" },
    { done: false, label: "Deploy Delta Money to the testnet" },
    { done: false, label: "Release limited size Discord for Alpha testers" },
    { done: false, label: "Alpha testing stage" },
    { done: false, label: "Collate and execute on Alpha testers feedback" },
    { done: false, label: "Full Discord Release" },
    { done: false, label: "Stress test the Delta Money platform" },
    { done: false, label: "External smart contracts security audits" },
    { done: false, label: "Bug bounty program" },
    { done: false, label: "Deploy Delta Money on to the Aptos Mainnet" },
    { done: false, label: "Delta token swap optimizer smart contract" },
    { done: false, label: "Create UI for Delta token swap optimizer" },
    { done: false, label: "Vault expansion" },
    {
      done: false,
      label: "Release NFT fee share Utility, distribution to all vault users",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const done = list.filter((item) => item.done).length;
  const progress = isVisible ? Math.round((done * 100) / list.length) : 0;

  return (
    <div className={styles.block}>
      <div className={styles.label}>Progress</div>
      <VisibilitySensor partialVisibility="bottom">
        {({ isVisible }) => {
          setIsVisible(isVisible);
          return (
            <div className={styles.progress}>
              <div
                className={styles.fill}
                style={{ width: progress + "%" }}
                data-value={progress}
              />
            </div>
          );
        }}
      </VisibilitySensor>
      <div className={styles.list}>
        {list.map((item, idx) => {
          const { done, label, children } = item;
          return (
            <VisibilitySensor partialVisibility="bottom" key={idx}>
              {({ isVisible }) => (
                <div
                  className={classnames(styles.item, {
                    [styles.isDone]: done,
                    [styles.isVisible]: isVisible,
                  })}
                >
                  <p>{label}</p>
                  {children && (
                    <ul>
                      {children.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </VisibilitySensor>
          );
        })}
        <ul className={styles.additional}>
          <li>
            <p>Start building for 2023</p>
            <span>Delta Neutral Strategies Leveraged Vaults</span>
          </li>
          <li>
            <p>2023</p>
            <span>Token release</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
