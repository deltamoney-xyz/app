import {
  avoidScientificNotation,
  cutDecimals,
  numToGrouped,
} from "components/common/PositiveFloatNumInput";
import { useMemo } from "react";
import useHippoClient from "./useHippoClient";

const useTokenAmountFormatter = () => {
  const { tokenInfos } = useHippoClient();

  const formatter = useMemo(
    () => (amount, tokenSymbol) => {
      if (typeof amount !== "number" || !tokenSymbol || !tokenInfos) return "";
      const decimals = parseFloat(tokenInfos[tokenSymbol].decimals);
      return numToGrouped(
        cutDecimals(avoidScientificNotation(amount), decimals)
      );
    },
    [tokenInfos]
  );

  return [formatter];
};

export default useTokenAmountFormatter;
