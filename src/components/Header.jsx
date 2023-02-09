import { AppBar, MenuItem, Toolbar,Select, createTheme,Typography } from '@mui/material'
import { fontWeight } from '@mui/system'
import React from 'react'
import { Container } from 'reactstrap'
import { makeStyles, ThemeProvider } from '@mui/styles';
import { useNavigate } from 'react-router-dom'
import { red } from '@mui/material/colors';
import { useContext } from 'react';
import { CryptoContext } from '../contexts/cryptoContext';
import AuthModel from './Auth/AuthModel';
import UserSideBar from './Auth/UserSideBar';


const useStyles = makeStyles(()=>({
    title:{
      flex: 1,
      color:"gold",
      fontFamily:"Montserrat",
      fontWeight:"bold",
      cursor:"pointer"
     

    }
  }))



  

function Header() {
    const navigate = useNavigate();

    const {currency,setCurrency, user } = useContext(CryptoContext)
    console.log(currency)


    
    const classes = useStyles();

    const theme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
        },
      });

    function homePage(){
        navigate("/")
    }
  return (
    <ThemeProvider theme={theme} >
         <AppBar color="transparent" position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={homePage}  className={classes.title} variant="h5">
                    crypto Market
                </Typography>
                <Select variant='outlined' style={{
                    width:100,
                    height:40,
                    marginRight:15
                }}
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
                
                >
                    <MenuItem value={"USD"}> USD</MenuItem>
                    <MenuItem value={"NAIRA"}>Naira</MenuItem>
                </Select>

               { user ? <UserSideBar/> : <AuthModel/>} 
                

                


            </Toolbar>
        </Container>

    </AppBar>

    </ThemeProvider>

   
  )
}

export default Header