import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { CryptoContext } from '../../contexts/cryptoContext';
import { HistoricalChart } from '../../config/api';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {chartDays} from '../../config/data'
import SelectButton from './SelectButton';
function CoinInfo({coin}) {
    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)

    const {currency} = useContext(CryptoContext)

    const fetchHistoricalData = async () =>{
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency));

        setHistoricData(data.prices);

    }
    console.log('data check', historicData)

    useEffect(()=>{   
        fetchHistoricalData()
    }, [currency,days])

   

    const useStyles = makeStyles((theme)=>({
        container:{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
            "@media (max-width: 900px)": {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            } 

            
        }

    }))

    const classes  = useStyles();

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type: "dark"
        }
    })



   
  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
            {
                !historicData ? (
                    <CircularProgress style={{color:"gold"}}
                     size={250} thickness={1}/>
                ): (
                 <>
                 <Line  data={{
                    labels: historicData.map((coin)=>{
                        let date = new Date(coin[0]);
                        let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString(); 
                    }),

                    datasets:[
                        {
                            data: historicData.map((coin)=>coin[1]),
                            label:`Price (Past ${days} Days) in ${currency}`,
                            borderColor:"#EEBC1D"

                        }
                    ],

                 }}
                 options={{
                    elements:{
                        points:{
                            radius:1,
                        }
                    }
                 }}
                 
                 />
                 <div style={{
                    display:"flex",
                    marginTop:20,
                    justifyContent:"space-around",
                    width:"100%"
                 }}>
                   {chartDays.map((day)=>(
                    <SelectButton key={day.value} onClick={()=>setDays(day.value)}
                    selected={(day.value ===  days)}
                    
                    
                     >
                        {day.label}
                        

                    </SelectButton>
                   ))}

                 </div>
                 
                 </>
                )
            }


        </div>
        
        </ThemeProvider>
  )
}

export default CoinInfo