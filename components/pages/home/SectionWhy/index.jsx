import VisibilitySensor from "react-visibility-sensor";
import classnames from "classnames";

import Title from "../../../common/Title";

import styles from "./style.module.scss";

export default function SectionWhy() {
  const data = [
    {
      title: "Earn Yield On Multiple Tokens",
      description:
        "Delta helps users generate sustainable yields on upcoming Aptos tokens.",
      icon: <WhyOne />,
    },
    {
      title: "Vaults and Structured Products",
      description: "Simple and easy to use vaults.",
      icon: <WhyTwo />,
    },
    {
      title: "Community Driven",
      description: "Become a strategist and earn with us.",
      icon: <WhyThree />,
    },
  ];
  const Block = ({ children }) => (
    <VisibilitySensor partialVisibility="bottom" offset={{ bottom: -150 }}>
      {({ isVisible }) => (
        <div
          className={classnames(styles.block, {
            [styles.isVisible]: isVisible,
          })}
        >
          {children}
        </div>
      )}
    </VisibilitySensor>
  );
  return (
    <section className={styles.section} id="section-why">
      <div className="wrap">
        <Title type="h3" size="h2" tac>
          Why <br />
          Delta Money?
        </Title>
        <div className={styles.grid}>
          {data.map((item, idx) => (
            <Block key={idx}>
              <h4 className={styles.title}>{item.title}</h4>
              <p className={styles.description}>{item.description}</p>
              {item.icon}
            </Block>
          ))}
        </div>
      </div>
    </section>
  );
}

const WhyOne = () => (
  <svg
    width="222"
    height="222"
    viewBox="0 0 222 222"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.svgWhyOne}
  >
    <path stroke="#181939" strokeWidth="16" d="M8 8L214 8V214H8L8 8Z" />
    <path
      fill="#282947"
      mask="url(#path-3-inside-1_125_1735)"
      d="M29.3838 35.8923L29.3838 17.8923H11.3838V35.8923L29.3838 35.8923ZM187.955 35.8923H205.955V17.8923H187.955V35.8923ZM187.955 194.464V212.464H205.955V194.464H187.955ZM29.3838 194.464H11.3838V212.464H29.3838V194.464ZM29.3838 53.8923L187.955 53.8923V17.8923L29.3838 17.8923L29.3838 53.8923ZM169.955 35.8923V194.464H205.955V35.8923H169.955ZM187.955 176.464H29.3838V212.464H187.955V176.464ZM47.3838 194.464L47.3838 35.8923L11.3838 35.8923L11.3838 194.464H47.3838Z"
    />
    <path
      stroke="#414363"
      strokeWidth="16"
      d="M66.7675 78.7848H145.91V157.928H66.7675V78.7848Z"
    />
    <mask id="path-3-inside-1_125_1735" fill="white">
      <path d="M29.3838 35.8923L187.955 35.8923V194.464H29.3838L29.3838 35.8923Z" />
    </mask>
  </svg>
);

const WhyTwo = () => (
  <svg
    width="212"
    height="212"
    viewBox="0 0 212 212"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.svgWhyTwo}
  >
    <circle fill="#181939" cx="106" cy="106" r="106" />
    <path
      fill="#282947"
      d="M174.714 29C179.843 29 184 33.1535 184 38.2771V173.723C184 178.846 179.843 183 174.714 183H37.2857C32.1574 183 28 178.846 28 173.723L28 38.2771C28 33.1535 32.1574 29 37.2857 29L174.714 29Z"
    />
    <path
      fill="#8287AA"
      opacity="0.28"
      d="M97.6887 34.0961C101.134 27.3013 110.866 27.3013 114.311 34.0961L182.986 169.524C186.118 175.7 181.616 183 174.675 183H37.3254C30.3839 183 25.882 175.7 29.0142 169.524L97.6887 34.0961Z"
    />
  </svg>
);

const WhyThree = () => (
  <svg
    width="222"
    height="222"
    viewBox="0 0 222 222"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.svgWhyThree}
  >
    <circle fill="#181939" cx="24" cy="24" r="24" />
    <circle fill="#181939" cx="24" cy="82" r="24" />
    <circle fill="#8287AA" opacity="0.28" cx="24" cy="140" r="24" />
    <circle fill="#181939" cx="24" cy="198" r="24" />
    <circle fill="#8287AA" opacity="0.28" cx="82" cy="24" r="24" />
    <circle fill="#181939" cx="82" cy="82" r="24" />
    <circle fill="#181939" cx="82" cy="140" r="24" />
    <circle fill="#8287AA" opacity="0.28" cx="82" cy="198" r="24" />
    <circle fill="#181939" cx="140" cy="24" r="24" />
    <circle fill="#181939" cx="140" cy="82" r="24" />
    <circle fill="#8287AA" opacity="0.28" cx="140" cy="140" r="24" />
    <circle fill="#181939" cx="140" cy="198" r="24" />
    <circle fill="#181939" cx="198" cy="24" r="24" />
    <circle fill="#8287AA" opacity="0.28" cx="198" cy="82" r="24" />
    <circle fill="#181939" cx="198" cy="140" r="24" />
    <circle fill="#8287AA" opacity="0.28" cx="198" cy="198" r="24" />
  </svg>
);
