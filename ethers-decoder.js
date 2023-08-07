const { ethers } = require('ethers');
const { getCryptoExchangeRate } = require('./api');

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

const decodeTransactionCustomData = ({ input }) => {
    const transactionInputJSON = ethers.toUtf8String(input);

    return JSON.parse(transactionInputJSON);
}

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

module.exports = { convertHexToEth, decodeTransactionCustomData, getUSDAmount };
