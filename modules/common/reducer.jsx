import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "modules/rootReducer";
import actions from "./actions";

const initState = {
  layoutHeight: 0,
  showWalletConnector: false,
  isResourcesNotFound: false,
};

export default createReducer(initState, (builder) => {
  builder
    .addCase(actions.SET_LAYOUT_HEIGHT, (state, { payload }) => {
      state.layoutHeight = payload;
    })
    .addCase(actions.TOGGLE_WALLET_CONNECTOR, (state, { payload }) => {
      state.showWalletConnector =
        payload === undefined ? !state.showWalletConnector : payload;
    })
    .addCase(actions.SET_RESOURCES_NOT_FOUND, (state, { payload }) => {
      state.isResourcesNotFound = payload;
    });
});

export const getLayoutHeight = (state) => state.common.layoutHeight;
export const getShowWalletConnector = (state) =>
  state.common.showWalletConnector;
export const getIsResourcesNotFound = (state) =>
  state.common.isResourcesNotFound;
