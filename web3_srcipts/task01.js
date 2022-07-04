const Web3 = require('web3');
const keys = require("../secrets")

const web3 = new Web3(keys.ALCHEMY_WS);
const myAddress = "0x7892F84a2703C56048D1d199dC10Ea1e93DE69B7";
const toAddress = "0xa1209b96e2e25F76120a37Fe2Fb51E6EfC8aaEdC";

const getBalance = async (title, address) => {
    const bal = await web3.eth.getBalance(address)
    console.log(title + bal)
}
const trasnferEth = async (to,from,amount) => {
        const transactionObject = {
          from,
          to,
          value: web3.utils.toWei(amount, "ether"),
          gasLimit: 21000,
          gasPrice: web3.utils.toWei("2", "gwei"),
        };
        const signed = await web3.eth.accounts.signTransaction(
          transactionObject,
          keys.private_key
        );
        web3.eth
          .sendSignedTransaction(signed.rawTransaction)
          .on("transactionHash", async (hash) => {
            console.log(hash);
          })
          .on("confirmation", (confirmationNo) => {
            if (confirmationNo == 1) {
              console.log("transfer successfully", confirmationNo);
              getBalance("Receiver Balance:",to)
              getBalance("Sender Balance: ",from)
            }
          })
}
const webScript = async (to,from,amount) => {
     getBalance("Receiver Balance:",to)
     getBalance("Sender Balance: ",from)
     trasnferEth(to,from,amount)
}
webScript(toAddress,myAddress,"0.0000001")