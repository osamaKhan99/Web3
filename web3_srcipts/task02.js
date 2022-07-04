const Web3 = require("web3");
var ERC20_TOKEN_ABI = require("../contracts/erc20_token.json");
const keys = require("../secrets");

const web3 = new Web3(keys.ALCHEMY_WS);
const myAddress = "0x7892F84a2703C56048D1d199dC10Ea1e93DE69B7";
const toAddress = "0xa1209b96e2e25F76120a37Fe2Fb51E6EfC8aaEdC";
const contract = new web3.eth.Contract(ERC20_TOKEN_ABI, keys.contractAddress);

const balanceOf = async () => {
  const bal = await contract.methods.balanceOf(myAddress).call();
  const balanceInETH = web3.utils.fromWei(bal, "ether");
  console.log(balanceInETH);
};

const transfer = async (to, from) => {
  const res = await contract.methods
    .transfer(to, web3.utils.toWei(amount, "ether"))
    .send({ from: from })
    .on("transactionHash", (hash) => {
      console.log("transaction hash: " + hash);
    })
    .on("confirmation", async function (confirmationNumber) {
      if (confirmationNumber === 3) {
        console.log("Successfully transfered");
      }
    });
  console.log(res);
  return res;
};

const approve = async (to, from) => {
  const res = await contract.methods
    .approve(to, web3.utils.toWei(amount, "ether"))
    .send({ from: from })
    .on("confirmation", async function (confirmationNumber) {
      if (confirmationNumber === 3) {
        console.log("Successfully approve");
      }
    })
    .on("error", (err) => {
      console.log(err);
    });
  console.log(res);
};

const allowance = async (to, from) => {
  const allowance = await contract.methods.allowance(to, from).call();
  console.log(allowance);
};

const transferFrom = async (owner, buyer, tokens) => {
  await contract.methods
    .transferFrom(owner, buyer, tokens)
    .send({ from: owner, gas: "1000000" })
    .on("transactionHash", (hash) => {
      console.log("transaction hash: " + hash);
    })
    .on("confirmation", async function (confirmationNumber) {
      if (confirmationNumber === 3) {
        console.log("Successfully transfered");
      }
    });
};
