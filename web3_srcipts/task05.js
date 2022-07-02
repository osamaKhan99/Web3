const Web3 = require('web3');
const keys = require("../secrets")

const web3 = new Web3(keys.ALCHEMY_WS);

const transactionStatus = async (tx_hash) => {
   const transactionReceipt =  await web3.eth.getTransactionReceipt(tx_hash)
   console.log(transactionReceipt)
   if(!transactionReceipt.status){
    console.log("Transaction Failed!")
   }
   else {
    console.log("Transaction Confirmed!")
    //const transaction = await web3.eth.getTransaction(tx_hash)
    const tx_fees = transactionReceipt.gasUsed * web3.utils.fromWei(web3.utils.toBN(transactionReceipt.effectiveGasPrice), 'ether')
    console.log("tx_fees incurred: ", tx_fees, "ETH")
   }
}
transactionStatus("0x1c687f8953b393d75a121ab8d851a1f1f1b2bd8aff88e95549227382b3a89c51")
//  0.000052500000315
// failed tx_hash = 0x1c687f8953b393d75a121ab8d851a1f1f1b2bd8aff88e95549227382b3a89c51
// success tx_hash = 0xcb245dda03712ee5b18f68649d2bcb1acd4d66f74dfba5053d314c5d07e6bcd8