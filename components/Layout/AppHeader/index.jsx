import { useEffect, useState } from "react";
import { AptosAccount, AptosClient, CoinClient } from "aptos";

import Link from "next/link";
import Tippy from "@tippyjs/react";

import { useWallet } from "@manahippo/aptos-wallet-adapter";
import classnames from "classnames";

import Button from "components/common/Button";
import ConnectModal from "components/common/ConnectModal";
import ProfileModal from "components/common/ProfileModal";

import useAptosWallet from "hooks/useAptosWallet";
import { numberFormat, walletSubstr } from "logic/helpers";

import styles from "./style.module.scss";

export default function AppHeader() {
  const { wallets } = useWallet();
  const { activeWallet, closeModal } = useAptosWallet();

  const [connectedWallet, setConnectedWallet] = useState({});
  const [connectVisible, setConnectVisible] = useState(false);
  const [disconnectVisible, setDisconnectVisible] = useState(false);

  useEffect(() => {
    if (activeWallet) {
      const walletConnector = window.localStorage.getItem("walletConnector");
      // console.log(activeWallet);
      wallets.map((wallet) => {
        const option = wallet.adapter;
        if (option.name === walletConnector) {
          setConnectedWallet(option);
        }
      });
    }
  }, [wallets, activeWallet]);

  return (
    <div className={styles.header}>
      <div className={classnames("wrap-fluid", styles.wrap)}>
        <Link href="/">
          <a className={styles.logo}>
            <img
              src="/static/img/svg/logo.svg"
              alt=""
              width={157}
              height={28}
            />
          </a>
        </Link>
        {!activeWallet ? (
          <>
            <Tippy
              content={
                <ConnectModal
                  onConnected={() => {
                    setConnectVisible(false);
                    setDisconnectVisible(false);
                    closeModal();
                  }}
                />
              }
              placement="bottom"
              offset={[-94, 24]}
              arrow={false}
              // trigger="click"
              interactive
              allowHTML
              visible={connectVisible}
              onClickOutside={() => {
                setConnectVisible(false);
              }}
            >
              <div className={styles.btnConnect}>
                <Button
                  size="sm"
                  onClick={() => {
                    setConnectVisible(!connectVisible);
                  }}
                >
                  Connect Wallet
                </Button>
              </div>
            </Tippy>
          </>
        ) : (
          <>
            <Tippy
              content={
                <ProfileModal
                  onDisconnected={() => {
                    setConnectVisible(false);
                    setDisconnectVisible(false);
                    closeModal();
                  }}
                />
              }
              placement="bottom"
              offset={[-12, 12]}
              arrow={false}
              // trigger="click"
              interactive
              allowHTML
              visible={disconnectVisible}
              onClickOutside={() => {
                setDisconnectVisible(false);
              }}
            >
              <div className={styles.btnConnect}>
                <Button
                  size="sm"
                  secondary
                  onClick={() => {
                    setDisconnectVisible(!disconnectVisible);
                  }}
                >
                  {connectedWallet.hasOwnProperty("icon") && (
                    <img
                      src={connectedWallet.icon}
                      alt=""
                      width={16}
                      height={16}
                    />
                  )}
                  {walletSubstr(activeWallet)}
                </Button>
              </div>
            </Tippy>
          </>
        )}
      </div>
    </div>
  );
}
