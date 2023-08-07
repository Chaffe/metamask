import { getTransaction, getBlockConfirmationsCount } from "./ethereum-api.js";
import { decodeTransactionCustomData, getUSDAmount } from './ethers-decoder.js'

const TRANSACTION_HASH = "0x5d9c73307e8e0bbfd0c08df7405615e57243d580882bfe2678c0cb0d925ca768";

const start = async (transactionHash) => {
  const transactionData = await getTransaction(transactionHash);
  console.log('transactionData', transactionData);
  const transactionInput = decodeTransactionCustomData(transactionData);
  console.log('transactionInput', transactionInput);
  const usdAmount = await getUSDAmount(transactionData);
  console.log('usdAmount', usdAmount);
  setInterval(async () => {
    const blockConfirmationCount = await getBlockConfirmationsCount(transactionHash);
    console.log('blockConfirmationCount', blockConfirmationCount);
  }, 5000);
};

start(TRANSACTION_HASH);
