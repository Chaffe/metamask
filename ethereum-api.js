import { Web3 } from 'web3';

const PROVIDER_URL = "https://mainnet.infura.io/v3/84ccc7f0d2974357a1d9f154a3e232ba";

const web3 = new Web3(Web3.givenProvider || PROVIDER_URL);
export const getTransaction = async (transactionHash) => web3.eth.getTransaction(transactionHash)
    .catch(error => console.error(error));

const getBlockNumber = async () => web3.eth.getBlockNumber()
    .catch(error => console.error(error));

export const getBlockConfirmationsCount = async (transactionHash) => {
    const FIRST_BLOCK = 1;

    return Promise.all([
        getTransaction(transactionHash).then(({ blockNumber }) => blockNumber && Number(blockNumber)),
        getBlockNumber().then(currentBlockNumber => Number(currentBlockNumber)),
    ]).then(([blockNumber, currentBlockNumber]) => blockNumber ? ((currentBlockNumber - blockNumber) + FIRST_BLOCK) : 0);
};
