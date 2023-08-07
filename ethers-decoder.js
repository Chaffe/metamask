import { ethers } from "ethers";
import { getCryptoExchangeRate } from "./api/index.js";

const ETH_CURRENCY = 'ETH';
const EXCHANGE_OPERATIONS = {
    BUY: 'buy',
    SELL: 'sell'
}

const convertHexToEth = (transactionAmountHash) => {
    // convert from hex value to decimal wei
    const parseValue = parseInt(transactionAmountHash);

    // convert from decimal wei to eth value
    return +ethers.formatEther(parseValue.toString());
};

export const decodeTransactionCustomData = ({ input }) => {
    const transactionInputJSON = ethers.toUtf8String(input);

    return JSON.parse(transactionInputJSON);
}

export const getUSDAmount = async (transactionData) => {
    const USD_VARIANCE = 100;
    const { data: { amount } } = await getCryptoExchangeRate({
        cryptoCurrency: ETH_CURRENCY,
        exchangeOperation: EXCHANGE_OPERATIONS.SELL
    });

    const { value } = transactionData;
    const ethAmount = convertHexToEth(value);

    return Math.floor(+amount * ethAmount * USD_VARIANCE);
}
