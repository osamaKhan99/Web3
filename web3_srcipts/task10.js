const Web3 = require("web3");
const keys = require("../secrets");
var fetch = require("node-fetch");

const getDeployerAddress = async (myAddr) => {
    const response = await fetch(`http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${myAddr}&startblock=0&endblock=99999999&sort=asc&apikey=${keys.ethersac_key}`)
    const data = await response.json()
    console.log("Deployer's Address: " + data.result[0].from)
    
 }
 getDeployerAddress(keys.contractAddress);