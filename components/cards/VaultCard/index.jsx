import { useEffect, useState } from "react";
import classnames from "classnames";
import { Form, Formik, setIn } from "formik";
import Skeleton from "react-loading-skeleton";
import * as Yup from "yup";

import Modal from "components/common/Modal";
import Button from "components/common/Button";
import InfoTooltip from "components/common/InfoTooltip";

import walletProvider from "lib/walletProvider";
import { numberFormat } from "logic/helpers";

import styles from "./style.module.scss";

export default function VaultCard({
  data,
  key,
  aptosClient,
  balanceUserAptos,
  walletAddress,
}) {
  const {
    strategyTitle,
    title,
    description,
    tokenPrimary,
    tokenSecondary,
    tokenPrimarySymbol,
    tokenSecondarySymbol,
    apy,
    tvl,
    providedBy,
    maxCap,
    value,
    staking_addr,
    staking_module,
  } = data;

  const [visibleModal, setVisibleModal] = useState(false);
  const [modalTab, setModalTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stakingAPY, setStakingAPY] = useState(0);
  const [stakingMaxCapacity, setStakingMaxCapacity] = useState(0);
  const [stakingCurrentDeposit, setStakingCurrentDeposit] = useState(0);
  const [stakingAvailableWithdraw, setStakingAvailableWithdraw] = useState(0);
  const [stakingAvailableRewards, setStakingAvailableRewards] = useState(0);
  const [stakingWalletWhenStake, setStakingWalletWhenStake] = useState(0);
  const [stakingWalletRewardsAmount, setStakingWalletRewardsAmount] =
    useState(0);
  const [stakingAvailableOwnAmount, setStakingAvailableOwnAmount] = useState(0);
  const [percentVal, setPercentVal] = useState(0);
  const [currentWalletBalanceAptos, setCurrentWalletBalanceAptos] = useState(0);
  const [checkInfoStakingAndWallet, setCheckInfoStakingAndWallet] = useState(0);

  useEffect(() => {
    getContractInfo().then().catch(console.error);
  }, [staking_addr]);

  useEffect(() => {
    if (walletAddress) {
      getUserInfo().then().catch(console.error);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (stakingMaxCapacity) {
      // console.log('stakingMaxCapacity')
      // console.log(stakingMaxCapacity)
      try {
        setPercentVal(
          Math.ceil((stakingCurrentDeposit * 100) / stakingMaxCapacity)
        );
      } catch (e) {}
    }
  }, [stakingMaxCapacity]);

  useEffect(() => {
    setCurrentWalletBalanceAptos(balanceUserAptos);
  }, [balanceUserAptos]);

  useEffect(() => {
    const id = setInterval(() => {
      getContractInfo().then().catch(console.error);
      getUserInfo().then().catch(console.error);
      setCheckInfoStakingAndWallet(checkInfoStakingAndWallet + 1);
    }, 10000);
    return () => clearInterval(id);
  }, [checkInfoStakingAndWallet]);

  const getContractInfo = async () => {
    try {
      // console.log(staking_module)
      switch (staking_module) {
        case "StakingWood":
          const contractResources = await aptosClient.getAccountResources(
            "0x" + staking_addr
          );
          // console.log(contractResources)
          const contractResource = contractResources.find(
            (r) =>
              r.type === `0x${staking_addr}::${staking_module}::StakingInfo`
          );
          console.log("contractInfo", contractResource?.data);
          setStakingAPY(parseInt(contractResource.data.apy));
          setStakingMaxCapacity(
            parseInt(contractResource.data.max_allowed_stake)
          );
          setStakingCurrentDeposit(
            parseInt(contractResource.data.total_staked_amount)
          );
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async () => {
    try {
      // console.log(staking_module)
      switch (staking_module) {
        case "StakingWood":
          if (walletAddress) {
            // console.log(walletAddress)
            const walletResources = await aptosClient.getAccountResources(
              walletAddress
            );
            const walletResource = walletResources.find(
              (r) =>
                r.type === `0x${staking_addr}::${staking_module}::UserStakeInfo`
            );
            const walletWhenStake = parseInt(walletResource.data.when_stake);
            const walletStakeAmount = parseInt(
              walletResource.data.staked_amount
            );
            const walletRewordsAmount = parseInt(
              walletResource.data.rewards_amount
            );
            const walletRewordsPerSecond = calcRewordsAmount(
              walletStakeAmount,
              stakingAPY,
              walletWhenStake
            );
            console.log("rounded reward per second: ", walletRewordsPerSecond);
            // setStakingWhenUserStake(parseInt(walletResource.data.when_stake))
            setStakingWalletWhenStake(walletWhenStake);
            setStakingWalletRewardsAmount(walletRewordsAmount);
            setStakingAvailableOwnAmount(walletStakeAmount);
            setStakingAvailableRewards(
              walletRewordsAmount + walletRewordsPerSecond
            );
            setStakingAvailableWithdraw(
              walletStakeAmount + walletRewordsAmount + walletRewordsPerSecond
            );

            const walletResourceBalance = walletResources.find(
              (r) =>
                r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
            );
            setCurrentWalletBalanceAptos(
              parseInt(walletResourceBalance.data.coin.value)
            );
            // console.log(stakingAvailableRewards)
            console.log("walletInfo", walletResource.data);
            setLoading(false);
          }
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const calcRewordsAmount = (staked_amount, apy, when_stake) => {
    const percentage_amount = 10000000000; // for correct calc rewords by second

    // Calculate percents amount after year. Example: 100T, 20% = 120T to withdraw after year. And 20T - percent amount
    const percent_rewords_amount =
      (staked_amount * percentage_amount * apy) / 101;

    // Calculate amount to withdraw per second from percent.
    // Example: 120T - 100T = 20T percent reward. 20T / <second in year> = <x>T percent reward by second
    const percent_rewords_amount_in_second =
      percent_rewords_amount / (12 * 30 * 24 * 60 * 60);

    // Seconds passed from vesting when_stake_time to now()
    const second_passed = Math.floor(Date.now() / 1000) - when_stake;

    // Calculate token amount to withdraw for base balance and for percent
    const rewors_per_stake_period =
      second_passed * percent_rewords_amount_in_second;

    console.log(
      "NOT rounded reward per second:",
      rewors_per_stake_period / percentage_amount
    );

    return parseInt(rewors_per_stake_period / percentage_amount);
  };

  const onOpenModal = (item) => {
    setVisibleModal(true);
  };

  const onCloseModal = () => {
    setModalTab(0);
    setVisibleModal(false);
  };

  const onDeposit = async (values) => {
    if (parseInt(values.value) > 0) {
      try {
        switch (staking_module) {
          case "StakingWood":
            console.log(values);
            await walletProvider.sendTransaction({
              transactionData: {
                type: "entry_function_payload",
                function: `0x${staking_addr}::StakingWood::stake`,
                arguments: [parseInt(values.value)],
                type_arguments: [],
              },
            });
            await getContractInfo();
            await getUserInfo();
            break;
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onWithdraw = async (values) => {
    if (parseInt(values.value) > 0) {
      try {
        switch (staking_module) {
          case "StakingWood":
            console.log(values);
            await walletProvider.sendTransaction({
              transactionData: {
                type: "entry_function_payload",
                function: `0x${staking_addr}::StakingWood::unstake`,
                arguments: [parseInt(values.value)],
                type_arguments: [],
              },
            });
            await getContractInfo();
            await getUserInfo();
            break;
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div
        className={classnames(styles.card)}
        onClick={() => onOpenModal({ data: data })}
      >
        <div className={styles.type}>{strategyTitle}</div>
        <InfoBlock />
        <div className={styles.subtitleLine}>{description}</div>
        <div className={styles.body}>
          <ProgressBlock />
        </div>
        <FooterBlock />
      </div>
      <Modal isVisible={visibleModal} onClose={() => onCloseModal()} withHead>
        <>
          <div className={classnames(styles.type, styles.typeModal)}>
            {strategyTitle}
          </div>
          <InfoBlock type="huge" />

          <div className={styles.modalHead}>
            {/*<div className={styles.modalItem}>*/}
            {/*<div className={styles.modalItemSubtitle}>*/}
            {/*  {tokenSecondarySymbol} balance:*/}
            {/*</div>*/}
            {/*<div className={styles.modalItemText}>*/}
            {/*  <img width={24} height={24} src={tokenSecondary} />*/}
            {/*  <div>*/}
            {/*    49.858.09 {tokenSecondarySymbol} <span>$1,823.35</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className={styles.modalItem}>
              <div className={styles.modalItemSubtitle}>
                {tokenPrimarySymbol} balance:
              </div>
              <div className={styles.modalItemText}>
                <img width={24} height={24} src={tokenPrimary} />
                <div style={{ width: "100%" }}>
                  {loading ? (
                    <div className={styles.skeleton}>
                      <Skeleton />
                    </div>
                  ) : (
                    `${numberFormat(
                      currentWalletBalanceAptos
                    )} ${tokenPrimarySymbol}`
                  )}
                  {/*<span>$1,336.34</span>*/}
                </div>
              </div>
            </div>
          </div>

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
                            props.setFieldValue("value", balanceUserAptos);
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
                    <Form
                      autoComplete="off"
                      className={classnames(styles.form)}
                    >
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
                        <Button type="submit" className={styles.btnSubmit} red>
                          Withdraw
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            )}
          </div>
          <div className={styles.modalFoot}>
            <div className={styles.total}>
              <strong>Own stake amount:</strong>
              {loading ? (
                <div className={styles.skeleton}>
                  <Skeleton />
                </div>
              ) : (
                <span>
                  <span>
                    {numberFormat(stakingAvailableOwnAmount, 0, ".", ",")}{" "}
                    {tokenSecondarySymbol}
                  </span>
                  {/*${numberFormat(77008, 2, ".", ",")}*/}
                </span>
              )}
            </div>
            <div className={styles.total}>
              <strong>Rewards:</strong>
              {loading ? (
                <div className={styles.skeleton}>
                  <Skeleton />
                </div>
              ) : (
                <span>
                  <span>
                    {" "}
                    {numberFormat(stakingAvailableRewards, 0, ".", ",")}{" "}
                    {tokenSecondarySymbol}
                  </span>
                  {/*${numberFormat(77008, 2, ".", ",")}*/}
                </span>
              )}
            </div>
            <div className={styles.total}>
              <strong>Total available withdraw:</strong>
              {loading ? (
                <div className={styles.skeleton}>
                  <Skeleton />
                </div>
              ) : (
                <span>
                  <span>
                    {numberFormat(stakingAvailableWithdraw, 0, ".", ",")}{" "}
                    {tokenSecondarySymbol}
                  </span>
                  {/*${numberFormat(77008, 2, ".", ",")}*/}
                </span>
              )}
            </div>
            <div className={styles.total}>
              <strong>Available stake:</strong>
              <span>
                <span>
                  {numberFormat(
                    stakingMaxCapacity - stakingCurrentDeposit,
                    0,
                    ".",
                    ","
                  )}{" "}
                  {tokenSecondarySymbol}
                </span>{" "}
                {/*${numberFormat(77008, 2, ".", ",")}*/}
              </span>
            </div>
          </div>
        </>
      </Modal>
    </>
  );

  function InfoBlock({ type = "normal" }) {
    const wh = type === "huge" ? 40 : 32;
    return (
      <div className={styles.info}>
        <div
          className={classnames(styles.infoBlock, styles.withIcons, {
            [styles.huge]: type === "huge",
          })}
        >
          <div className={styles.infoBlockLogo}>
            <img width={wh} height={wh} src={tokenPrimary} />
          </div>
          {/*<div className={styles.infoBlockLogo}>*/}
          {/*  <img width={wh} height={wh} src={tokenSecondary} />*/}
          {/*</div>*/}
          {/*<div className={styles.infoBlockSubtitle}>Strategy</div>*/}
          <div className={styles.infoBlockTitle}>{title}</div>
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.infoBlockSubtitle}>
            APY <InfoTooltip content="APY per year" trigger="mouseenter" />
          </div>
          <div className={styles.infoBlockValue}>
            <span>{stakingAPY}</span> %
          </div>
        </div>
      </div>
    );
  }

  function ProgressBlock() {
    return (
      <div className={styles.progress}>
        <div className={styles.progressHead}>
          <div className={styles.progressItem}>
            {/*<div className={styles.progressItemSubtitle}>TVL</div>*/}
            {/*<div className={styles.progressItemText}>*/}
            {/*  ${numberFormat(value ?? 0, 2, '.', ',')}*/}
            {/*</div>*/}
          </div>
          <div className={styles.progressItem}>
            <div className={styles.progressItemSubtitle}>Provided by</div>
            <div className={styles.progressItemText}>
              <img
                width={16}
                height={16}
                src={`/static/img/pages/staking/providers/${providedBy.toLowerCase()}.png`}
              />
              {providedBy}
            </div>
          </div>
        </div>
        <div className={styles.progressBar}>
          <span style={{ width: percentVal + "%" }} />
        </div>
      </div>
    );
  }

  function DepositBlock() {
    return (
      <>
        {/*<div className={styles.balance}>*/}
        {/*  <div className={styles.balanceLabel}>*/}
        {/*    Balance{" "}*/}
        {/*    <span>{numberFormat(info?.tokenBalance ?? 0)}</span>{" "}*/}
        {/*    {info?.tokenSymbol}*/}
        {/*  </div>*/}
        {/*  <a*/}
        {/*    href={buyTokenLink}*/}
        {/*    target="_blank"*/}
        {/*    rel="noreferrer"*/}
        {/*    className={styles.balanceBtn}*/}
        {/*  >*/}
        {/*    Buy {info?.tokenSymbol}*/}
        {/*  </a>*/}
        {/*</div>*/}
        {/*{info && String(info.tokenBalance).gt(0) && (*/}
        {/*  <>*/}
        {/*    {allowance === 0 ? (*/}
        {/*      <Button*/}
        {/*        onClick={onApprove}*/}
        {/*        loading={approveLoading}*/}
        {/*        className={styles.btn}*/}
        {/*      >*/}
        {/*        Approve*/}
        {/*      </Button>*/}
        {/*    ) : (*/}
        {/*      <FieldForm*/}
        {/*        className={styles.form}*/}
        {/*        btnText="Deposit"*/}
        {/*        autofocus={false}*/}
        {/*        small*/}
        {/*        loading={depositLoading}*/}
        {/*        outerValue={outValueDeposit}*/}
        {/*        onlyNumbers*/}
        {/*        onMax={onMaxDeposit}*/}
        {/*        onSubmit={onDeposit}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  </>*/}
        {/*)}*/}
      </>
    );
  }

  function FooterBlock() {
    return (
      <div className={styles.foot}>
        <div className={styles.total}>
          <strong>Current Deposit (APT):</strong>{" "}
          <span>
            {numberFormat(stakingCurrentDeposit ?? 0, 2, ".", ",")} APT
          </span>
        </div>
        <div className={styles.total}>
          <strong>Max Capacity (APT):</strong>{" "}
          <span>{numberFormat(stakingMaxCapacity ?? 0, 2, ".", ",")} APT</span>
        </div>
      </div>
    );
  }
}
