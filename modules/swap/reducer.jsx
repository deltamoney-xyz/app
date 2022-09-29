import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export const initState = {
  isFetching: false,
  isFetched: false,
  error: null,
  tokenList: [],
  swapSettings: {
    slipTolerance: 1,
    trasactionDeadline: 30,
    maxGasFee: 1000,
    currencyFrom: {
      token: undefined,
      amount: undefined,
      balance: 0,
    },
    currencyTo: {
      token: undefined,
      amount: undefined,
      balance: 0,
    },
  },
};

export default createReducer(initState, (builder) => {
  builder
    .addCase(actions.SET_IS_FETCHING, (state, { payload }) => {
      state.isFetching = payload;
      state.isFetched = false;
    })
    .addCase(actions.SET_TOKEN_LIST, (state, { payload }) => {
      state.tokenList = payload;
      state.isFetching = false;
      state.isFetched = true;
    })
    .addCase(actions.SET_SWAP_SETTING, (state, { payload }) => {
      state.swapSettings = payload;
    })
    .addCase(actions.RESET, (state) => {
      state.swapSettings = initState.swapSettings;
    });
});

export const getIsFetchingTokenList = (state) => state.swap.isFetching;
export const getIsFetchedTokenList = (state) => state.swap.isFetched;
export const getTokenList = (state) => state.swap.tokenList;
export const getSwapSettings = (state) => state.swap.swapSettings;
