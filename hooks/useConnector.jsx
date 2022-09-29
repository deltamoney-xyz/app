function useConnector() {
  // const supportedChainIds = useSelector(getSupportedChainIds);
  // const defaultChainRpcUrls = CHAIN_RPC_URLS(supportedChainIds.length <= 1 ? 1 : 97);

  const SUPPORTED_WALLETS = {
    // Phantom: {
    //   connector: '',
    //   name: 'Phantom'
    // },
    // METAMASK: {
    //   connector: '',
    //   name: 'MetaMask'
    // },
    // WALLET_LINK: {
    //   connector: '',
    //   name: 'Coinbase Wallet'
    // },
    // WALLET_CONNECT: {
    //   connector: '',
    //   name: 'Wallet Connect'
    // },
    APTOS: {
      connector: "",
      name: "Aptos",
    },
  };

  return {
    // defaultChainRpcUrls,
    SUPPORTED_WALLETS,
  };
}

export default useConnector;
