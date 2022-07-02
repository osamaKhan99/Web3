const Web3 = require("web3");
const keys = require("../secrets");
var ERC20_TOKEN_ABI = require("../contracts/erc20_token.json")

const web3 = new Web3(keys.ALCHEMY_WS);

const getAllHolders = async () => {
    const holders = []
    const currentHolders = []
    const contract = await new web3.eth.Contract(ERC20_TOKEN_ABI,keys.contractAddress)
    const pastEvents = await contract.getPastEvents('Transfer',{
        fromBlock:0,
        toBlock: 'latest'
    })
    for (let i in pastEvents){
        holders.push(pastEvents[i].returnValues.to)
        holders.push(pastEvents[i].returnValues.from)
    }
    const res = [... new Set(holders)]
    res.map(async (item)=>{
        const balance = await contract.methods.balanceOf(item).call()
        if(balance > 0){
            currentHolders.push(item)
        }
    })
    setTimeout(()=>{
        console.log("Total Holders:", currentHolders.length)
    },5000)
}
getAllHolders()