import { useEffect, useState } from "react";
import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  BCS,
  TxnBuilderTypes,
} from "aptos";

import VaultCard from "components/cards/VaultCard";

import useAptosWallet from "hooks/useAptosWallet";
import httpAuthCheck from "logic/httpAuthCheck";

import styles from "styles/pages/staking.module.scss";

export default function PageStaking({ vaults }) {
  const { activeWallet } = useAptosWallet();

  const [walletAddress, setWalletAddress] = useState("");
  const [balanceUserAptos, setBalanceUserAptos] = useState(0);

  // devnet is used here for testing
  const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
  const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

  const aptosClient = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  useEffect(() => {
    // const autoConnect = async () => {
    //   if (walletAddress) {
    //     setWalletAddress(walletAddress);
    //   } else {
    //     const isConnected = await walletProvider.isConnected();
    //     // console.log(isConnected);
    //     if (isConnected) {
    //       const account = await walletProvider.getAccount();
    //       setWalletAddress(account);
    //     }
    //   }
    // };
    // autoConnect().catch((error) => console.log(error));

    if (activeWallet) {
      setWalletAddress(activeWallet.toString());
    }
  }, [activeWallet]);

  useEffect(() => {
    if (walletAddress) {
      const getUserBalance = async () => {
        try {
          const walletResources = await aptosClient.getAccountResources(
            walletAddress
          );
          // console.log(contrResource)
          const walletResource = walletResources.find(
            (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
          );
          // console.log(walletResource.data.coin);
          setBalanceUserAptos(walletResource.data.coin.value);
          // setBalanceUserAptos((contrAccountResource?.data as any).coin.value)
        } catch (e) {}
      };
      getUserBalance().then().catch(console.error);
    }
  }, [walletAddress]);

  return (
    <div className="wrap-fluid">
      <div className={styles.head}>
        <div className={styles.highlights}>
          {/*<div className={styles.subtitle}>APY highlights:</div>*/}
          {/*<ul className={styles.highlightsList}>*/}
          {/*  <li>*/}
          {/*    <img*/}
          {/*      src="/static/img/svg/coins/sushi.svg"*/}
          {/*      width={16}*/}
          {/*      height={16}*/}
          {/*    />*/}
          {/*    <span className={styles.highlightsListToken}>SUSHI:</span>*/}
          {/*    <span className={styles.highlightsListApy}>27.89%</span>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <img*/}
          {/*      src="/static/img/svg/coins/aptos.svg"*/}
          {/*      width={16}*/}
          {/*      height={16}*/}
          {/*    />*/}
          {/*    <span className={styles.highlightsListToken}>APTOS:</span>*/}
          {/*    <span className={styles.highlightsListApy}>89.12%</span>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <img*/}
          {/*      src="/static/img/svg/coins/usdc.svg"*/}
          {/*      width={16}*/}
          {/*      height={16}*/}
          {/*    />*/}
          {/*    <div className={styles.highlightsListToken}>USDC:</div>*/}
          {/*    <div className={styles.highlightsListApy}>56.23%</div>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <img src="/static/img/svg/coins/btc.svg" width={16} height={16}/>*/}
          {/*    <span className={styles.highlightsListToken}>BTC:</span>*/}
          {/*    <span className={styles.highlightsListApy}>16.23%</span>*/}
          {/*  </li>*/}
          {/*</ul>*/}
        </div>
        {/*<div className={styles.tvl}>*/}
        {/*  <div className={styles.subtitle}>TVL:</div>*/}
        {/*  <div className={styles.tvlNum}>$1,974,792.19</div>*/}
        {/*</div>*/}
      </div>

      <div className={styles.grid}>
        {vaults.map((item, idx) => (
          <VaultCard
            data={item}
            key={idx}
            aptosClient={aptosClient}
            balanceUserAptos={balanceUserAptos}
            walletAddress={walletAddress}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;

  if (ctx.req) {
    await httpAuthCheck(req, res);
  }

  const vaults = [
    {
      strategyTitle: "Stable Strategy APTOS",
      title: "APTOS",
      description:
        "Earn fees with minimal directional exposure. DeltaMoney manages trading ranges, rebalancing and auto-compounding of all rewards.",
      tokenPrimary: "/static/img/svg/coins/aptos.svg",
      // tokenSecondary: '/static/img/svg/coins/usdc.svg',
      tokenPrimarySymbol: "APT",
      // tokenSecondarySymbol: 'USDC',
      apy: 100,
      tvl: 29.97,
      providedBy: "Harvik",
      maxCap: 500000,
      value: 463008,
      staking_addr:
        "f9140dce450238d26cf82e15b75bfc59f77d7fc70ddc1cb9d4d510ef9bba85e9",
      staking_module: "StakingWood",
    },
    // {
    //   strategyTitle: "Pegged strategy",
    //   title: "APTOS - BTC",
    //   description:
    //     "Earn staking yield and trading fees with BTC exposure. DeltaMoney algorithms set and rebalance the trading range, and auto-compound fees and rewards.",
    //   tokenPrimary: "/static/img/svg/coins/aptos.svg",
    //   tokenSecondary: "/static/img/svg/coins/btc.svg",
    //   tokenPrimarySymbol: "APTOS",
    //   tokenSecondarySymbol: "BTC",
    //   apy: 20.23,
    //   tvl: 18.75,
    //   providedBy: "Harvik",
    //   maxCap: 500000,
    //   value: 493854.02,
    // },
  ];

  return {
    props: {
      app: true,
      vaults: vaults,
    },
  };
}
