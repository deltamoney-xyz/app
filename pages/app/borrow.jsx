import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Modal from "components/common/Modal";
import Button from "components/common/Button";

import { numberFormat, stringToHex } from "logic/helpers";
import httpAuthCheck from "logic/httpAuthCheck";
import walletProvider from "lib/walletProvider";

import styles from "styles/pages/app.module.scss";
import SeoMeta from "../../components/common/SeoMeta";
import { Image } from "antd";

export default function PageApp() {
  const [balanceSupply, setBalanceSupply] = useState(45);
  const [balanceBorrow, setBalanceBorrow] = useState(19);
  const [balanceUser, setBalanceUser] = useState(0);
  const [visibleSupplyModal, setVisibleSupplyModal] = useState(false);
  const [visibleBorrowModal, setVisibleBorrowModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [modalTab, setModalTab] = useState(0);

  const marketsSupply = [
    { slug: "aptos", label: "Aptos Coin", apy: 12, wallet: 0 },
    { slug: "btc", label: "Bitcoin", apy: 12, wallet: 0 },
    { slug: "usdc", label: "USD Coin", apy: 12, wallet: 0 },
  ];

  const marketsBorrow = [
    { slug: "aptos", label: "Aptos Coin", apy: 16, liquidity: 198873 },
    { slug: "btc", label: "Bitcoin", apy: 16, liquidity: 535893 },
    { slug: "usdc", label: "USD Coin", apy: 16, liquidity: 1087 },
  ];

  useEffect(() => {
    if (balanceUser) {
      setBalanceUser(balanceUser);
    } else {
      const walletConnector = window.localStorage.getItem("walletConnector");
      switch (walletConnector) {
        case "martian":
          if (window.martian && window.martian.legacy) {
            window.martian.legacy.getAccountBalance((resp) => {
              if (resp.status === 200) {
                setBalanceUser(resp.data);
                console.log(
                  "Current balance of the selected account:",
                  resp.data
                );
                // 5000
              } else {
                console.log(resp.message);
                // Something went wrong within Martian wallet.
              }
            });
          }
          break;
      }
    }
  }, [balanceUser]);

  // const NODE_URL = 'https://fullnode.devnet.aptoslabs.com'
  // const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com'

  // const aptosClient = new AptosClient(NODE_URL)
  // const aptosFaucetClient = new FaucetClient(NODE_URL, FAUCET_URL)

  const onOpenModal = (item) => {
    switch (item.type) {
      case "supply":
        setVisibleSupplyModal(true);
        break;
      case "borrow":
        setVisibleBorrowModal(true);
        break;
      default:
        console.error("Choose right coin!");
    }
    setSelectedCoin(item.data);
  };

  const onCloseModal = () => {
    setVisibleSupplyModal(false);
    setVisibleBorrowModal(false);
    setModalTab(0);
    setTimeout(() => setSelectedCoin({}), 300);
  };

  const onDeposit = async (values) => {
    console.log(values);
    // const address = await walletProvider.getAccount()
    const contractAddr =
      "0x81695cd677d9aae07ceffd7af1003f1be2af8cc7b12d433d50854376a61a90e1";
    // stake

    // const methoCall = 'stake'
    const methoCall = "unstake";
    const res = await walletProvider.sendTransaction({
      transactionData: {
        type: "entry_function_payload",
        function: `${contractAddr}::StakingWood::${methoCall}`,
        arguments: [contractAddr, parseInt(values.value)],
        type_arguments: [],
      },
    });

    console.log(res);
  };

  const onWithdraw = async (values) => {
    console.log(values);
  };

  const onBorrow = async (values) => {
    console.log(values);
  };

  const onRepay = async (values) => {
    console.log(values);
  };

  return (
    <>
      <SeoMeta type="borrow" />

      <div className="wrap-fluid">
        <div className={styles.head}>
          <div className={styles.balance} data-color="green">
            <div className={styles.balanceTitle}>Supply balance</div>
            <div className={styles.balanceCaption}>Updated 1 minute ago</div>
            <div className={styles.balanceValue}>
              ${numberFormat(balanceSupply)}
            </div>
          </div>
          <div className={styles.balance} data-color="blue">
            <div className={styles.balanceTitle}>Borrow balance</div>
            <div className={styles.balanceCaption}>Updated 30 seconds ago</div>
            <div className={styles.balanceValue}>
              ${numberFormat(balanceBorrow)}
            </div>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressHead}>
            <span />
            <span>Borrow limit</span>
          </div>
          <div className={styles.progressBar}>
            <span style={{ width: "18%" }} />
          </div>
          <div className={styles.progressFoot}>
            <span>1.8%</span>
            <span>${numberFormat(balanceBorrow)}</span>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.table}>
            <div className={styles.tableTitle}>Supply markets</div>
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>APY</th>
                  <th>Wallet</th>
                </tr>
              </thead>
              <tbody>
                {marketsSupply.map((item) => (
                  <>
                    <tr
                      key={item.slug}
                      onClick={() =>
                        onOpenModal({ type: "supply", data: item })
                      }
                    >
                      <td>
                        <span>
                          <Image
                            src={`/static/img/svg/coins/${item.slug.toLowerCase()}.svg`}
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                          />
                          {item.label}
                        </span>
                      </td>
                      <td>
                        <span>{item.apy}%</span>
                      </td>
                      <td>
                        <span>
                          {item.wallet} {item.slug.toUpperCase()}
                        </span>
                        <i />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ height: 8 }} colSpan={3} />
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.table}>
            <div className={styles.tableTitle}>Borrow markets</div>
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>APY</th>
                  <th>Liquidity</th>
                </tr>
              </thead>
              <tbody>
                {marketsBorrow.map((item) => (
                  <>
                    <tr
                      key={item.slug}
                      onClick={() =>
                        onOpenModal({ type: "borrow", data: item })
                      }
                    >
                      <td>
                        <span>
                          <Image
                            src={`/static/img/svg/coins/${item.slug.toLowerCase()}.svg`}
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                          />
                          {item.label}
                        </span>
                      </td>
                      <td>
                        <span>{item.apy}%</span>
                      </td>
                      <td>
                        <span>
                          {numberFormat(item.liquidity)}{" "}
                          {item.slug.toUpperCase()}
                        </span>
                        <i />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ height: 8 }} colSpan={3} />
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isVisible={visibleSupplyModal} onClose={() => onCloseModal()}>
        {Object.keys(selectedCoin).length > 0 && (
          <>
            <div className={styles.modalHead}>
              <Image
                src={`/static/img/svg/coins/${selectedCoin.slug.toLowerCase()}.svg`}
                alt=""
                width={56}
                height={56}
                loading="lazy"
              />
              {selectedCoin.label}
            </div>

            <ul className={styles.modalList}>
              <li>
                <Image
                  src={`/static/img/svg/coins/${selectedCoin.slug.toLowerCase()}.svg`}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                />
                {selectedCoin.label}
                <span>
                  {selectedCoin.slug === "aptos"
                    ? numberFormat(balanceUser)
                    : numberFormat(selectedCoin.wallet)}{" "}
                  {selectedCoin.slug.toUpperCase()}
                </span>
              </li>
              <li>
                <Image
                  src="/static/img/svg/icons/rate.svg"
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                />
                Supply Rate
                <span>{selectedCoin.apy}%</span>
              </li>
            </ul>

            <div className={styles.modalTabs}>
              <ul>
                <li>
                  <button
                    type="button"
                    className={modalTab === 0 ? styles.isSelected : undefined}
                    onClick={() => setModalTab(0)}
                  >
                    Deposit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={modalTab === 1 ? styles.isSelected : undefined}
                    onClick={() => setModalTab(1)}
                  >
                    Withdraw
                  </button>
                </li>
              </ul>
              {modalTab === 0 && (
                <Formik
                  initialValues={{ value: 0 }}
                  validationSchema={Yup.object().shape({
                    value: Yup.number().required("Error"),
                  })}
                  onSubmit={(values) => onDeposit(values)}
                >
                  {(props) => {
                    return (
                      <Form autoComplete="off" className={styles.form}>
                        <div className={styles.field}>
                          <input
                            type="number"
                            name="value"
                            placeholder="0"
                            onChange={(e) => {
                              props.setFieldValue("value", e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className={styles.btnMax}
                            onClick={() => {
                              props.setFieldValue("value", 100);
                            }}
                          >
                            Max
                          </button>
                          <Button type="submit" className={styles.btnSubmit}>
                            Deposit
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
              {modalTab === 1 && (
                <Formik
                  initialValues={{ value: 0 }}
                  validationSchema={Yup.object().shape({
                    value: Yup.number().required("Error"),
                  })}
                  onSubmit={(values) => onWithdraw(values)}
                >
                  {(props) => {
                    return (
                      <Form autoComplete="off" className={styles.form}>
                        <div className={styles.field}>
                          <input
                            type="number"
                            name="value"
                            placeholder="0"
                            onChange={(e) => {
                              props.setFieldValue("value", e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className={styles.btnMax}
                            onClick={() => {
                              props.setFieldValue("value", 100);
                            }}
                          >
                            Max
                          </button>
                          <Button type="submit" className={styles.btnSubmit}>
                            Withdraw
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </div>
          </>
        )}
      </Modal>

      <Modal isVisible={visibleBorrowModal} onClose={() => onCloseModal()}>
        {Object.keys(selectedCoin).length > 0 && (
          <>
            <div className={styles.modalHead}>
              <Image
                src={`/static/img/svg/coins/${selectedCoin.slug.toLowerCase()}.svg`}
                alt=""
                width={56}
                height={56}
                loading="lazy"
              />
              {selectedCoin.label}
            </div>

            <ul className={styles.modalList}>
              <li>
                <Image
                  src={`/static/img/svg/coins/${selectedCoin.slug.toLowerCase()}.svg`}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                />
                {selectedCoin.label}
                <span>
                  {numberFormat(selectedCoin.liquidity)}{" "}
                  {selectedCoin.slug.toUpperCase()}
                </span>
              </li>
              <li>
                <Image
                  src="/static/img/svg/icons/rate.svg"
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                />
                Borrow Rate
                <span>{selectedCoin.apy}%</span>
              </li>
            </ul>

            <div className={styles.modalTabs}>
              <ul>
                <li>
                  <button
                    type="button"
                    className={modalTab === 0 ? styles.isSelected : undefined}
                    onClick={() => setModalTab(0)}
                  >
                    Borrow
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={modalTab === 1 ? styles.isSelected : undefined}
                    onClick={() => setModalTab(1)}
                  >
                    Repay
                  </button>
                </li>
              </ul>
              {modalTab === 0 && (
                <Formik
                  initialValues={{ value: 0 }}
                  validationSchema={Yup.object().shape({
                    value: Yup.number().required("Error"),
                  })}
                  onSubmit={(values) => onBorrow(values)}
                >
                  {(props) => {
                    return (
                      <Form autoComplete="off" className={styles.form}>
                        <div className={styles.field}>
                          <input
                            type="number"
                            name="value"
                            placeholder="0"
                            onChange={(e) => {
                              props.setFieldValue("value", e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className={styles.btnMax}
                            onClick={() => {
                              props.setFieldValue("value", 100);
                            }}
                          >
                            Max
                          </button>
                          <Button type="submit" className={styles.btnSubmit}>
                            Borrow
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
              {modalTab === 1 && (
                <Formik
                  initialValues={{ value: 0 }}
                  validationSchema={Yup.object().shape({
                    value: Yup.number().required("Error"),
                  })}
                  onSubmit={(values) => onRepay(values)}
                >
                  {(props) => {
                    return (
                      <Form autoComplete="off" className={styles.form}>
                        <div className={styles.field}>
                          <input
                            type="number"
                            name="value"
                            placeholder="0"
                            onChange={(e) => {
                              props.setFieldValue("value", e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className={styles.btnMax}
                            onClick={() => {
                              props.setFieldValue("value", 100);
                            }}
                          >
                            Max
                          </button>
                          <Button type="submit" className={styles.btnSubmit}>
                            Repay
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;

  if (ctx.req) {
    await httpAuthCheck(req, res);
  }

  return {
    props: {
      app: true,
    },
  };
}
