import { useEffect, useState } from "react";
import { AptosClient } from "aptos";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

import Button from "components/common/Button";
import useAptosWallet from "hooks/useAptosWallet";
import { numberFormat } from "logic/helpers";
import web3helper from "lib/web3helper";

import styles from "./style.module.scss";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";

export default function ProfileModal({ onDisconnected }) {
  const aptosClient = new AptosClient(NODE_URL);
  // const coinClient = new CoinClient(aptosClient);

  const { disconnect } = useWallet();
  const { activeWallet } = useAptosWallet();

  const [currentWalletBalanceAptos, setCurrentWalletBalanceAptos] = useState(0);

  useEffect(() => {
    const getUserBalance = async () => {
      try {
        // const account = new AptosAccount();
        // const balance = await coinClient.checkBalance(account);

        const walletResources = await aptosClient.getAccountResources(
          activeWallet.toString()
        );
        const walletResource = walletResources.find(
          (r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
        );
        setCurrentWalletBalanceAptos(
          web3helper.fromWei(walletResource.data.coin.value)
        );
      } catch (e) {}
    };

    if (activeWallet) {
      getUserBalance().then().catch(console.error);
    }
  }, [activeWallet]);

  return (
    <div className={styles.modal}>
      <div className={styles.subtitle}>BALANCE:</div>
      <div className={styles.text}>
        <img width={18} height={18} src={`/static/img/svg/coins/aptos.svg`} />
        <div style={{ width: "100%" }}>
          {numberFormat(currentWalletBalanceAptos, 2, ".", ",", true)} APT
          {/*<span>$1,336.34</span>*/}
        </div>
      </div>
      <Button
        red
        size="xs"
        className={styles.btnConnect}
        onClick={async () => {
          await disconnect();
          onDisconnected();
        }}
      >
        Disconnect
      </Button>
    </div>
  );
}
