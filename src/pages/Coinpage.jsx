import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CryptoContext } from '../contexts/cryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { makeStyles } from '@mui/styles';
import CoinInfo from '../components/Banner/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/Banner/Carousel';

 
function Coinpage() {
    const {id} = useParams()
    const [coin, setCoin] = useState()
    const {currency, symbol} = useContext(CryptoContext)

    const fetchCoin = async() =>{
        const {data} = await axios.get(SingleCoin(id))

        setCoin(data)
    }
    console.log("coinpage", coin)
    useEffect(()=>{
        fetchCoin()

    },[currency])

    const useStyles = makeStyles((theme) => ({
        container:{
            display:"flex",
            "@media (max-width: 900px)": {
                flexDirection:"column",
                alignItems:"center"
            } 
        },
        sidebar: {
            width: "30%",
            "@media (max-width: 1024px)": {
                width:"100%"
            },


            // [theme.breakpoints.down("md")]: {
            //   width: "100%",
            // },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid grey"
        },
         heading: {
            fontWeight:"bold",
            marginBottom:20,
            fontFamily:'Montserrat'
        },
        description:{
            width:"100%",
            fontFamily:'Montserrat',
            padding:25,
            paddingBottom:15,
            paddingTop:0,
            textAlign:"justify"
        }
    }));

    const classes =   useStyles();
    if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>


  return (
    <div className={classes.container}>
        <div className={classes.sidebar}>
            <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{marginBottom:20}}
            />
            <Typography variant="h3" className={classes.heading}>
                {coin?.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                {coin?.description.en.split(". ")[0]}
            </Typography>

            <div className={classes.marketData}>
                <span style={{ display:"flex"}}>
                    <Typography variant="h5" className={classes.heading}>
                        Rank:</Typography>
                        &nbsp; &nbsp; 
                        <Typography variant='h5' style={{fontFamily:'Montserrat'}} >
                            {coin?.market_cap_rank}
                        </Typography>
                </span>
                <span style={{ display:"flex"}}>
                    <Typography variant="h5" className={classes.heading}>
                        Current Price:</Typography>
                        &nbsp; &nbsp; 
                        <Typography variant='h5' style={{fontFamily:'Montserrat'}} >
                            {symbol} {" "}
                            {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase() ])}
                        </Typography>
                </span>
                <span style={{ display:"flex"}}>
                    <Typography variant="h5" className={classes.heading}>
                        Market Cap: {" "}
                        
                        </Typography>
                        &nbsp; &nbsp; 
                        <Typography variant='h5' style={{fontFamily:'Montserrat'}} >
                        {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
                        </Typography>
                </span>

            </div>

        </div>

        <CoinInfo coin={coin}/>
          
         
    </div> 
  )
}

export default Coinpage