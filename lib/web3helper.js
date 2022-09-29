const BigNumber = require("bignumber.js");
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });
BigNumber.config({ EXPONENTIAL_AT: [-1e9, 1e9] });

const web3helper = {
  toBN(number) {
    return new BigNumber(number);
  },
  toWei(number, decimals = 8) {
    return this.toBN(number)
      .multipliedBy("1e" + decimals)
      .toString();
  },
  fromWei(number, decimals = 8) {
    return this.toBN(number).dividedBy("1e" + decimals);
  },
};

export default web3helper;
