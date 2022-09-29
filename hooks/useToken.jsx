import { getTokenList } from "modules/swap/reducer";
import { useSelector } from "react-redux";

const useToken = () => {
  const tokenList = useSelector(getTokenList);

  const retreiveTokenImg = (tokens) => {
    return tokens.map((token) => {
      const existToken = tokenList.find((t) => t.symbol === token.symbol);
      return existToken?.logo_url;
    });
  };

  return { retreiveTokenImg };
};

export default useToken;
