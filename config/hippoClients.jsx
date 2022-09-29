import { App, HippoSwapClient, HippoWalletClient } from "@manahippo/hippo-sdk";
import { TradeAggregator } from "@manahippo/hippo-sdk";
import { CoinListClient } from "@manahippo/hippo-sdk";

import { readConfig } from "utils/hippoWalletUtil";
import { aptosClient } from "./aptosClient";

import { debounce } from "lodash";
import { message } from "antd";
import { useMemo } from "react";

const errorHandler = debounce(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_err) => {
    // store.dispatch(commonActions.SET_RESOURCES_NOT_FOUND(true));
    message.error("Resource not found or loaded");
  },
  1000,
  { leading: false, trailing: true }
);

export const hippoWalletClient = async (account) => {
  let walletClient;
  try {
    if (!account) return undefined;
    const netConf = readConfig();
    walletClient = await HippoWalletClient.createInTwoCalls(
      netConf,
      new App(aptosClient),
      account,
      netConf.simulationKeys
    );
  } catch (err) {
    console.log("Get hippo wallet client failed", err);
    // errorHandler(err);
  }

  return walletClient;
};

export const hippoSwapClient = async () => {
  let swapClient;
  try {
    const netConf = readConfig();
    swapClient = await HippoSwapClient.createInOneCall(
      new App(aptosClient),
      netConf,
      netConf.simulationKeys
    );
  } catch (err) {
    console.log("Get hippo swap client failed", err);
    // errorHandler(err);
  }

  return swapClient;
};

export const hippoTradeAggregator = async () => {
  let agg;
  try {
    agg = await TradeAggregator.create(aptosClient);
  } catch (err) {
    console.log("Get hippo trade aggregator failed", err);
    // errorHandler(err);
  }
  return agg;
};

export const coinListClient = async () => {
  let client;
  try {
    const netConf = readConfig();
    client = await CoinListClient.load(
      new App(aptosClient),
      netConf.simulationKeys
    );
  } catch (err) {
    console.log("Get coin list client failed", err);
    // errorHandler(err);
  }

  return client;
};
