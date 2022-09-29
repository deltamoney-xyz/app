const walletProvider = {
  async connect(walletConnector) {
    switch (walletConnector) {
      case "martian":
        const { martian } = window;
        if (martian) {
          const response = await martian.connect();
          const isConnected = await martian.isConnected();
          if (isConnected) {
            window.localStorage.setItem("walletConnector", "martian");
            return response.address;
          }
        } else {
          window.open("https://www.martianwallet.xyz/", "_blank");
        }
        break;
    }
    return "";
  },
  async isConnected() {
    const walletConnector = window.localStorage.getItem("walletConnector");

    switch (walletConnector) {
      case "martian":
        const { martian } = window;
        if (martian) {
          await martian.connect();
          const isConnected = await martian.isConnected();
          if (isConnected) {
            return true;
          }
        }
        // else {
        //   setTimeout(walletProvider.isConnected(), 1000);
        // }
        break;
    }
    return false;
  },
  async disconnect() {
    const walletConnector = window.localStorage.getItem("walletConnector");
    window.localStorage.removeItem("walletConnector");
    switch (walletConnector) {
      case "martian":
        const { martian } = window;
        if (martian) {
          await martian.disconnect();
        }
        break;
    }
  },
  async getAccount() {
    const walletConnector = window.localStorage.getItem("walletConnector");

    switch (walletConnector) {
      case "martian":
        const { martian } = window;
        if (martian) {
          const responseConnect = await martian.connect();
          const isConnected = await martian.isConnected();
          if (isConnected) {
            return responseConnect.address;
          }
        }
        break;
    }
    return "";
  },
  async sendTransaction(params) {
    const walletConnector = window.localStorage.getItem("walletConnector");

    switch (walletConnector) {
      case "martian":
        const { martian } = window;
        if (martian) {
          const responseConnect = await martian.connect();
          const isConnected = await martian.isConnected();
          if (isConnected) {
            const sender = responseConnect.address;
            const transaction = await martian.generateTransaction(
              sender,
              params?.transactionData
            );
            return await martian.signAndSubmitTransaction(transaction);
          }
        }
        break;
    }
    return false;
  },
};

export default walletProvider;
