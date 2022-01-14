import { createContext, useState } from "react";
import { useFetchCoin } from "../hooks/useFetchCoin";


export const CryptoContext = createContext();


export const CryptoProvider = ({children}) => {
    const [cryptos, isLoading, fetchError] = useFetchCoin([]);

    return(
        <CryptoContext.Provider value={{
            cryptos,
            isLoading,
            fetchError
        }}>
            {children}
        </CryptoContext.Provider>
    )
}