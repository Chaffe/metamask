import { Web3 } from 'web3';

const PROVIDER_URL = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

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
