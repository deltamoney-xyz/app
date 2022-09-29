import { createReducer } from "@reduxjs/toolkit";

import actions from "./actions";

const initState = {
  selectedAccount: null,
};

export default createReducer(initState, (builder) => {
  builder.addCase(actions.SET_SELECTED_ACCOUNT, (state, action) => {
    state.selectedAccount = action.payload;
  });
});

export const getSelectedAccount = (state) => state.account.selectedAccount;
