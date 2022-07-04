const Web3 = require('web3');
var ERC20_TOKEN_ABI = require("../contracts/erc20_token.json");
const keys = require("../secrets")

const web3 = new Web3(keys.ALCHEMY_WS);
const myAddress = "0x7892F84a2703C56048D1d199dC10Ea1e93DE69B7";

const getAllEvents = async (contract, eventName, startBlock, endBlock) => {
    const myContract = new web3.eth.Contract(ERC20_TOKEN_ABI, contract)
    console.log(eventName)
      console.log(contract)
      await myContract.getPastEvents(eventName,{
      filter:{
        from: myAddress
      },
        fromBlock: startBlock,
        toBlock: endBlock,
    }, function(err, event) {
      if (err) {
        console.log(err);
      } else {
        console.log(event);
      }
    })
}