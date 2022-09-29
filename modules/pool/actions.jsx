import { createAction } from "@reduxjs/toolkit";

const SET_IS_FETCHING = createAction("pool/SET_IS_FETCHING");
const SET_POOL_LIST = createAction("pool/SET_POOL_LIST");
const SET_FILTERS = createAction("pool/SET_FILTERS");

export default {
  SET_IS_FETCHING,
  SET_POOL_LIST,
  SET_FILTERS,
};
