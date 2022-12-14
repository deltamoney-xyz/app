import { createAction } from "@reduxjs/toolkit";

const SET_LAYOUT_HEIGHT = createAction("pool/SET_LAYOUT_HEIGHT");
const TOGGLE_WALLET_CONNECTOR = createAction("common/TOGGLE_WALLET_CONNECTOR");
const SET_RESOURCES_NOT_FOUND = createAction("common/SET_RESOURCES_NOT_FOUND");

export default {
  SET_LAYOUT_HEIGHT,
  TOGGLE_WALLET_CONNECTOR,
  SET_RESOURCES_NOT_FOUND
};
