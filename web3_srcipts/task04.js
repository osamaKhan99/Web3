const Web3 = require('web3');
var ERC20_TOKEN_ABI = require("../contracts/erc20_token.json");
const keys = require("../secrets")

const web3 = new Web3(keys.ALCHEMY_WS);

const getAllEvents = async (contract, eventName, startBlock, endBlock) => {
    const myContract = new web3.eth.Contract(ERC20_TOKEN_ABI, contract)
    let events
    console.log(eventName)
      console.log(contract)
      await myContract.getPastEvents(eventName,{
      filter:{
        from: '0x7892F84a2703C56048D1d199dC10Ea1e93DE69B7'
      },
        fromBlock: startBlock,
        toBlock: endBlock,
    }, function(err, event) {
      if (err) {
        console.log(err);
      } else {
        console.log(event);
        events =  event
        return event;
      }
    })
    console.log("EVENTS",events)
    let subscription = await web3.eth.subscribe('logs', {
        fromBlock: 0,
        address: [contract],
        topics: events[0].raw.topics
    }, function(err, result){
        if(!err){
            console.log("subscribe",result)
        }
    });
    subscription.on("data", event => console.log("data", event))
    subscription.on("changed", changed => console.log(changed))
    subscription.on('error', error => console.log(error))
    subscription.on('connected', nr => console.log(nr))
  };
  getAllEvents(keys.contractAddress,"Transfer",0,'latest')
//  const subscribeEvent = (contractAddress, event) => {
//     const contract = new Web3(ERC20_TOKEN_ABI, contractAddress)
//     console.log("subscribing ...")
//     //console.log(contract)
//     let subscription = web3.eth.subscribe('logs', {
//         fromBlock: 0,
//         address: [contract],
//         topics: []
//     }, function(err, result){
//         if(!err){
//             console.log(result)
//         }
//     });
//     subscription.on("data", event => console.log("data", event))
//     subscription.on("changed", changed => console.log(changed))
//     subscription.on('error', error => console.log(error))
//     subscription.on('connected', nr => console.log(nr))
// }
// subscribeEvent(keys.contractAddress, "Transfer")