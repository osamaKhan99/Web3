const Web3 = require("web3");
const keys = require("../secrets");

const web3 = new Web3(keys.ALCHEMY_WS);
const myAddress = "0x7892F84a2703C56048D1d199dC10Ea1e93DE69B7";
const toAddress = "0xa1209b96e2e25F76120a37Fe2Fb51E6EfC8aaEdC";

const speedUpTransaction = async (nonce, gas) => {
  console.log("Speeding Up Transaction with gas price 2 gwei");
  const transactionObject = {
    nonce: nonce,
    to: toAddress,
    value: web3.utils.toWei("0.000000001", "ether"),
    gas: "21000",
    gasPrice: web3.utils.toWei(gas, "gwei"),
  };
  const signed = await web3.eth.accounts.signTransaction(
    transactionObject,
    keys.private_key
  );
  const transaction = await web3.eth.sendSignedTransaction(
    signed.rawTransaction
  );
  console.log(transaction);
};

const cancelTransaction = async (gas) => {
    const transactionObject = {
      to: myAddress,
      value: web3.utils.toWei("0", "ether"),
      gas: "21000",
      gasPrice: web3.utils.toWei(gas, "gwei"),
    };
    const signed = await web3.eth.accounts.signTransaction(
      transactionObject,
      keys.private_key
    );
    const transaction = await web3.eth.sendSignedTransaction(
      signed.rawTransaction
    );
    console.log(transaction && "Transaction Cancelled!");
  };

const sendTransaction = async () => {
  console.log("Nonce", await web3.eth.getTransactionCount(myAddress));
  const transactionObject = {
    to: toAddress,
    value: web3.utils.toWei("0.000000001", "ether"),
    gasLimit: 21000,
    gasPrice: web3.utils.toWei("2", "gwei"),
  };
  const signed = await web3.eth.accounts.signTransaction(
    transactionObject,
    keys.private_key
  );
  console.log(signed);
  web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("transactionHash", async (hash) => {
      console.log(hash);
      let nonce = await web3.eth.getTransactionCount(myAddress);
      console.log("Speeding ...", nonce);
      //speedUpTransaction(nonce, "2");
      cancelTransaction("3")
    })
    .on("receipt", console.log);
};
sendTransaction();
