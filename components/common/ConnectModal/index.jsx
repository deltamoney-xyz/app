import { useMemo } from "react";
import { useWallet } from "@manahippo/aptos-wallet-adapter";

import Title from "../Title";
import Button from "../Button";
import styles from "./style.module.scss";

const Option = ({ onClick, label, icon }) => {
  return (
    <li>
      <button type="button" onClick={onClick ? onClick : undefined}>
        <img src={icon} alt="" width={52} height={52} />
        {label}
      </button>
    </li>
  );
};

export default function ConnectModal({ onConnected, onlyButton = false }) {
  const { wallets, select } = useWallet();

  const onConnectWallet = async () => {
    // console.log("CONNECT");
    await select("Martian");
  };

  const renderButtonGroup = useMemo(() => {
    return wallets.map((wallet) => {
      const option = wallet.adapter;
      return (
        <Option
          key={option.name}
          label={option.name}
          icon={option.icon}
          onClick={async () => {
            window.localStorage.setItem("walletConnector", option.name);
            await select(option.name);
            onConnected();
          }}
        />
      );
    });
  }, [wallets, select, onConnected]);

  return onlyButton ? (
    <Button
      size="sm"
      className={styles.btnConnect}
      onClick={() => onConnectWallet()}
    >
      Connect Wallet
    </Button>
  ) : (
    <div className={styles.modal}>
      <>
        <Title size="h6" block tac className={styles.title}>
          Connect your wallet
        </Title>
        <ul className={styles.list}>{renderButtonGroup}</ul>
      </>
    </div>
  );
}
