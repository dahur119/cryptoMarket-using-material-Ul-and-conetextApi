import { createContext, useEffect, useState } from "react";

import React from 'react'

export const CryptoContext = createContext()



const CryptoProvider =({children}) =>{
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")

     useEffect(()=>{
        if(currency === "US") setSymbol("Us")
        else if (currency === "US") setSymbol("US")


     },[currency])


     
    return <CryptoContext.Provider value={{currency, symbol, setCurrency}}>
        {children}

    </CryptoContext.Provider>
}
export default CryptoProvider


  