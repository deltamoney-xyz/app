import { createContext, useCallback, useEffect, useState } from "react";
import {
  coinListClient,
  hippoSwapClient,
  hippoTradeAggregator,
  hippoWalletClient,
} from "config/hippoClients";

import useAptosWallet from "hooks/useAptosWallet";
import { message } from "components/common/Antd";
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { useDispatch } from "react-redux";
import swapAction from "modules/swap/actions";
import { useNotification } from "hooks/useNotification";

const HippoClientContext = createContext({});

const HippoClientProvider = ({ children }) => {
  const { activeWallet } = useAptosWallet();
  const { signAndSubmitTransaction } = useWallet();
  const { openNotification } = useNotification();
  const [hippoWallet, setHippoWallet] = useState();
  const [hippoSwap, setHippoSwapClient] = useState();
  const [hippoAgg, setHippoAgg] = useState();
  const [refresh, setRefresh] = useState(false);
  const [transaction, setTransaction] = useState();
  const [tokenStores, setTokenStores] = useState();
  const [tokenInfos, setTokenInfos] = useState();
  const dispatch = useDispatch();

  const getHippoWalletClient = useCallback(async () => {
    if (activeWallet) {
      const client = await hippoWalletClient(activeWallet);
      await client?.refreshStores();
      setHippoWallet(client);
    } else {
      setHippoWallet(undefined);
    }
  }, [activeWallet]);

  const getHippoSwapClient = useCallback(async () => {
    const sClient = await hippoSwapClient();
    setHippoSwapClient(sClient);
  }, []);

  const getHippoTradeAggregator = useCallback(async () => {
    setHippoAgg(await hippoTradeAggregator());
  }, []);

  const getTokenInfos = useCallback(async () => {
    const client = await coinListClient();
    /*
    console.log(
      'coin list',
      client?.coinList.map((c) => c.name.str())
    );
    */
    setTokenInfos(client?.symbolToCoinInfo);
  }, []);

  useEffect(() => {
    getHippoWalletClient();
    getHippoSwapClient();
    getHippoTradeAggregator();
    getTokenInfos();
  }, [
    getHippoWalletClient,
    getHippoSwapClient,
    getHippoTradeAggregator,
    getTokenInfos,
  ]);

  useEffect(() => {
    if (hippoWallet) {
      setTokenStores(hippoWallet?.symbolToCoinStore);
      if (refresh) {
        getHippoWalletClient();
        setRefresh(false);
      }
    } else {
      setTokenStores(undefined);
    }
  }, [hippoWallet, refresh, getHippoWalletClient]);

  useEffect(() => {
    if (hippoSwap) {
      dispatch(swapAction.SET_TOKEN_LIST(hippoSwap.singleCoins));
    }
  }, [dispatch, hippoSwap]);

  const getNotificationMsg = useCallback(
    (txhash) => {
      const description = (
        <p>
          You can verify the transaction by visiting the{" "}
          <a
            href={`https://explorer.devnet.aptos.dev/txn/${txhash}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Aptos Transaction Explorer
          </a>
        </p>
      );
      return openNotification(description);
    },
    [openNotification]
  );

  const requestFaucet = useCallback(
    async (symbol) => {
      let success = false;
      try {
        if (!activeWallet) throw new Error("Please login first");
        const uiAmtUsed = symbol === "BTC" ? 0.01 : 10;
        const payload = hippoWallet?.makeFaucetMintToPayload(
          uiAmtUsed,
          symbol,
          true
        );
        if (payload && tokenInfos) {
          let pl = payload;
          const result = await signAndSubmitTransaction(pl);
          if (result) {
            message.success("Faucet Success");
            getNotificationMsg(result.hash);
            await hippoWallet?.refreshStores();
            setRefresh(true);
            success = true;
          }
        }
      } catch (error) {
        console.log("request faucet error:", error);
        if (error instanceof Error) {
          message.error(error?.message);
        }
        success = false;
      } finally {
        return success;
      }
    },
    [
      activeWallet,
      getNotificationMsg,
      hippoWallet,
      signAndSubmitTransaction,
      tokenInfos,
    ]
  );

  const requestSwapByRoute = useCallback(
    async (routeAndQuote, slipTolerance) => {
      let success = false;
      try {
        const input = routeAndQuote.quote.inputUiAmt;
        const minOut =
          routeAndQuote.quote.outputUiAmt * (1 - slipTolerance / 100);
        if (!activeWallet) throw new Error("Please connect wallet first");
        if (input <= 0) {
          throw new Error("Input amount needs to be greater than 0");
        }
        const payload = routeAndQuote.route.makePayload(input, minOut, true);
        const result = await signAndSubmitTransaction(payload);
        if (result) {
          message.success("Transaction Success");
          getNotificationMsg(result.hash);
          setRefresh(true);
          success = true;
        }
      } catch (error) {
        console.log("request swap by route error:", error);
        if (error instanceof Error) {
          message.error(error?.message);
        }
        success = false;
      } finally {
        return success;
      }
    },
    [activeWallet, getNotificationMsg, signAndSubmitTransaction]
  );
  /*
  const requestDeposit = useCallback(
    async (
      lhsSymbol: string,
      rhsSymbol: string,
      poolType: PoolType,
      lhsUiAmt: number,
      rhsUiAmt: number
    ) => {
      let success = false;
      try {
        if (!activeWallet || !hippoSwap) {
          throw new Error('Please login first');
        }
        const pool = hippoSwap.getDirectPoolsBySymbolsAndPoolType(lhsSymbol, rhsSymbol, poolType);
        if (pool.length === 0) {
          throw new Error('Desired pool does not exist');
        }
        const payload = await pool[0].makeAddLiquidityPayload(lhsUiAmt, rhsUiAmt);
        const result = await signAndSubmitTransaction(payload);
        if (result) {
          message.success('Transaction Success');
          getNotificationMsg(result.hash);
          setRefresh(true);
          success = true;
        }
      } catch (error) {
        console.log('request deposit error:', error);
        if (error instanceof Error) {
          message.error(error?.message);
        }
        success = false;
      } finally {
        return success;
      }
    },
    [hippoSwap, activeWallet, signAndSubmitTransaction]
  );

  const requestWithdraw = useCallback(
    async (
      lhsSymbol: string,
      rhsSymbol: string,
      poolType: PoolType,
      liqiudityAmt: UITokenAmount,
      lhsMinAmt: UITokenAmount,
      rhsMinAmt: UITokenAmount
    ) => {
      let success = false;
      try {
        if (!activeWallet || !hippoSwap) {
          throw new Error('Please login first');
        }
        const pool = hippoSwap.getDirectPoolsBySymbolsAndPoolType(lhsSymbol, rhsSymbol, poolType);
        if (pool.length === 0) {
          throw new Error('Desired pool does not exist');
        }
        const payload = await pool[0].makeRemoveLiquidityPayload(
          liqiudityAmt,
          lhsMinAmt,
          rhsMinAmt
        );
        const result = await signAndSubmitTransaction(payload);
        if (result) {
          message.success('Transaction Success');
          getNotificationMsg(result.hash);
          setRefresh(true);
          success = true;
        }
      } catch (error) {
        console.log('request withdraw error:', error);
        if (error instanceof Error) {
          message.error(error?.message);
        }
        success = false;
      } finally {
        return success;
      }
    },
    [hippoSwap, activeWallet, signAndSubmitTransaction]
  );
  */

  return (
    <HippoClientContext.Provider
      value={{
        hippoWallet,
        hippoSwap,
        hippoAgg,
        tokenStores,
        tokenInfos,
        requestSwapByRoute,
        transaction,
        setTransaction,
        requestFaucet,
      }}
    >
      {children}
    </HippoClientContext.Provider>
  );
};

export { HippoClientProvider, HippoClientContext };
