const { getTransaction } = require('./ethereum-api');
const { decodeTransactionCustomData, getUSDAmount } = require('./ethers-decoder');

const TRANSACTION_HASH = "0x5d9c73307e8e0bbfd0c08df7405615e57243d580882bfe2678c0cb0d925ca768";

const start = async () => {
  const transactionData = await getTransaction(TRANSACTION_HASH);
  console.log('transactionData', transactionData);
  const transactionInput = decodeTransactionCustomData(transactionData);
  console.log('transactionInput', transactionInput);
  const usdAmount = await getUSDAmount(transactionData);
  console.log('usdAmount', usdAmount);
};

start();
