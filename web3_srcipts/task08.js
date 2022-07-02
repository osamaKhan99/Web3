const Web3 = require("web3");
const keys = require("../secrets");
var fetch = require("node-fetch");

const web3 = new Web3(keys.ALCHEMY_WS);
const myAddress = "0x7892F84a2703C56048D1d199dC10Ea1e93DE69B7";

const fetchAllTransactions = async (myAddr) => {
    const response = await fetch(`http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${myAddr}&startblock=0&endblock=99999999&sort=asc&apikey=${keys.ethersac_key}`)
    const data = await response.json()
    console.log(data)
 }
fetchAllTransactions(myAddress);