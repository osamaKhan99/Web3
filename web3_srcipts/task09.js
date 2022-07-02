const Web3 = require('web3');
const keys = require("../secrets")
var ERC20_TOKEN_ABI = require("../contracts/erc20_token.json");

const web3 = new Web3(keys.ALCHEMY_WS);

const getAllERC20Transaction = async () => {
    const contract = await new web3.eth.Contract(ERC20_TOKEN_ABI,keys.contractAddress)
    const transfers = await contract.getPastEvents("Transfer",{
        fromBlock: 0,
        toBlock: 'latest'
    })
    //console.log(transfers)
    for(let i in transfers){
        console.log(transfers[i].event)
        console.log("from: " + transfers[i].returnValues.from)
        console.log("to: " + transfers[i].returnValues.to)
        console.log("amount: " + transfers[i].returnValues.value)
        console.log("========")

    }
}
getAllERC20Transaction()