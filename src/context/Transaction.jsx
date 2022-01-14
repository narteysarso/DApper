import {createContext, useEffect, useState } from "react";
import { addTransaction, checkIfMetaMaskIsConnected, getAccounts, getTransactions } from "../services/transaction";


export const TransactionContext = createContext();


export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [transactions, setTransactions] = useState([]);

    const connectWallet = async () => {
        try {
            
            checkIfMetaMaskIsConnected();

            const accounts = await getAccounts();

            setCurrentAccount(accounts[0]);

        } catch (e) {
            console.log(e);
            alert('Metamask required')
        }
    }

    const sendTransaction = async ({ addressTo, message, keyword, amount }) => {
        try {
            
            const transactionHash = await addTransaction({ currentAccount, addressTo, message, keyword, amount });

            //trace status transaction with transactionHash


        } catch (e) {
            console.log(e);
            throw Error('Metamask required')
        }
    }

    const fetchAllTransactions = async () => {
       
        const transactions = await getTransactions();

        setTransactions(transactions);

    }

    useEffect(() => {
        connectWallet();
        fetchAllTransactions();
    }, [])
    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            sendTransaction,
            transactions,
        }}>
            {children}
        </TransactionContext.Provider>
    )
}