import { HexString } from "aptos";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useCallback, useEffect, useState, createContext } from "react";

const hexStringV0ToV1 = (v0) => {
  if (typeof v0 === "string") {
    return new HexString(v0);
  } else if (v0.hexString) {
    return new HexString(v0.toString());
  } else {
    throw new Error(`Invalid hex string object: ${v0}`);
  }
};

const AptosWalletContext = createContext({});

const AptosWalletProvider = ({ children }) => {
  const { connected, account } = useWallet();
  const [activeWallet, setActiveWallet] = useState(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (connected && account?.address) {
      setActiveWallet(hexStringV0ToV1(account?.address));
    } else {
      setActiveWallet(undefined);
    }
  }, [connected, account]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <AptosWalletContext.Provider
      value={{
        activeWallet,
        open,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AptosWalletContext.Provider>
  );
};

export { AptosWalletProvider, AptosWalletContext };
