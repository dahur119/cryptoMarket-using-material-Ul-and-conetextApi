import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from '../config/api'
import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const CryptoContext = createContext()



const CryptoProvider =({children}) =>{
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open:false,
        message:"",
        type:"success"

         
    })

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user) setUser(user)
            else setUser(null)
        })

    }, [])

    const fetchCoins = async() => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        console.log(data)
        setCoins(data)
        setLoading(false)

    };
    console.log("coinTable",coins)

 

     useEffect(()=>{
        if(currency === "US") setSymbol("Us")
        else if (currency === "US") setSymbol("US")


     },[currency])


     
    return <CryptoContext.Provider value={{currency, symbol, coins, loading, alert,user, setAlert,  fetchCoins, setCurrency}}>
        {children}

    </CryptoContext.Provider>
}
export default CryptoProvider


  