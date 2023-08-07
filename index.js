const { Web3 } = require('web3');
const { ethers } = require('ethers');
const { getCryptoExchangeRate } = require("./api");

const PROVIDER_URL = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const TRANSACTION_HASH = "0x5d9c73307e8e0bbfd0c08df7405615e57243d580882bfe2678c0cb0d925ca768";
const ETH_CURRENCY = 'ETH';
const EXCHANGE_OPERATIONS = {
  BUY: 'buy',
  SELL: 'sell'
}

const start = async () => {
  const web3 = new Web3(Web3.givenProvider || PROVIDER_URL);

  const getTransaction = async (transactionHash) => web3.eth.getTransaction(transactionHash)
      .catch(error => console.error(error));

  const decodeTransactionCustomData = ({ input }) => {
    const transactionInputJSON = ethers.toUtf8String(input);

    return JSON.parse(transactionInputJSON);
  }

  const convertHexToEth = (transactionAmountHash) => {
    // convert from hex value to decimal wei
    const parseValue = parseInt(transactionAmountHash);

    // convert from decimal wei to eth value
    return +ethers.formatEther(parseValue.toString());
  };

  const getUSDAmount = async (transactionData) => {
    const USD_VARIANCE = 100;
    const { data: { amount } } = await getCryptoExchangeRate({
      cryptoCurrency: ETH_CURRENCY,
      exchangeOperation: EXCHANGE_OPERATIONS.SELL
    });

    const { value } = transactionData;
    const ethAmount = convertHexToEth(value);

    return Math.floor(+amount * ethAmount * USD_VARIANCE);
  }

  const transactionData = await getTransaction(TRANSACTION_HASH);
  console.log('transactionData', transactionData);
  const transactionInput = decodeTransactionCustomData(transactionData);
  console.log('transactionInput', transactionInput);
  const usdAmount = await getUSDAmount(transactionData);
  console.log('usdAmount', usdAmount);
};

start();
