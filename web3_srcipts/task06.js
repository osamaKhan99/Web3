const Web3 = require('web3');
const keys = require("../secrets")

const web3 = new Web3(keys.ALCHEMY_WS);
const inputs = [{
    type: 'address',
    name: '_to'
},{
    type: 'uint256',
    name: '_value',
}]

const getTransactionDetail = async (tx_hash) => {
    const details = await web3.eth.getTransaction(tx_hash)
    const data = details.input.slice(10)
    const decodeDetails = web3.eth.abi.decodeParameters(inputs,data)
    console.log("Sender: ",details.from)
    console.log("Reciever: ",decodeDetails._to)
    console.log("Amount: ",decodeDetails._value)
}
getTransactionDetail("0x46becb5baf5770b0f5afb16a7c8c5866b432fcdce47e97e351b5fd4ce52af467")