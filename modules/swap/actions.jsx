import { createAction } from "@reduxjs/toolkit";

const SET_IS_FETCHING = createAction("swap/SET_IS_FETCHING");
const SET_TOKEN_LIST = createAction("swap/SET_TOKEN_LIST");
const SET_SWAP_SETTING = createAction("swap/SET_SWAP_SETTING");
const RESET = createAction("swap/RESET");

export default {
  SET_IS_FETCHING,
  SET_TOKEN_LIST,
  SET_SWAP_SETTING,
  RESET,
};
