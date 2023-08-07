const { Web3 } = require("web3");

const PROVIDER_URL = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const web3 = new Web3(Web3.givenProvider || PROVIDER_URL);
const getTransaction = async (transactionHash) => web3.eth.getTransaction(transactionHash)
    .catch(error => console.error(error));

module.exports = { getTransaction };
