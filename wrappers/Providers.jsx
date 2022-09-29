import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "modules/rootReducer";
import { AptosWalletProvider } from "contexts/AptosWalletProvider";
import { HippoClientProvider } from "contexts/HippoClientProvider";
import {
  WalletProvider,
  // HippoWalletAdapter,
  AptosWalletAdapter,
  //HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  // NightlyWalletAdapter,
  PontemWalletAdapter,
  SpikaWalletAdapter,
} from "@manahippo/aptos-wallet-adapter";
import { useMemo } from "react";
import { message } from "antd";

const isDevelopmentMode = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer,
  devTools: isDevelopmentMode,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        ignoredPaths: ["connection"],
      },
    }).concat([]),
});

const Providers = (props) => {
  const wallets = useMemo(
    () => [
      // new HippoWalletAdapter(),
      //new HippoExtensionWalletAdapter(),
      new MartianWalletAdapter(),
      new FewchaWalletAdapter(),
      new AptosWalletAdapter(),
      // new MultiMaskWalletAdapter(),
      // new NightlyWalletAdapter(),
      new PontemWalletAdapter(),
      new SpikaWalletAdapter(),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      autoConnect
      onError={(error) => {
        console.log("wallet errors: ", error);
        let text = "";
        if (error.name === "WalletNotReadyError") {
          text = "Wallet not ready";
        }
        message.error(error.message || text);
      }}
    >
      <AptosWalletProvider>
        <ReduxProvider store={store}>
          <HippoClientProvider>{props.children}</HippoClientProvider>
        </ReduxProvider>
      </AptosWalletProvider>
    </WalletProvider>
  );
};

export default Providers;
