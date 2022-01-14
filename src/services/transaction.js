import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../utils/constants";

//extract meta mask ethereum wallet from window;
const { ethereum } = window;


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

const checkIfMetaMaskIsInstalled = () => {
    if (!ethereum || !ethereum?.isMetaMask) alert('Please install metamask');

    return !!ethereum;
}

export const checkIfMetaMaskIsConnected = () => {

    if (!ethereum) throw Error('Metamask is required to use this DApp');

}

export const getAccounts = async () => {
    if (!checkIfMetaMaskIsInstalled()) throw Error('Metamask required');

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });


    return accounts;

}


export const getTransactions = async () => {
    const transactionContract = getEthereumContract();

    return await transactionContract.getAllTransactions();

}

export const addTransaction = async ({ currentAccount, addressTo, amount, message, keyword }) => {
    if (!checkIfMetaMaskIsInstalled()) throw Error('Metamask required');

    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther(amount);

    await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', //21000 GWEI
            value: parsedAmount._hex

        }]
    });

    const transactionHash = await transactionContract.addTransaction(addressTo, parsedAmount, message, keyword)

    return transactionHash;
}