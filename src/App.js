import React from 'react';
 import Homepage from './pages/Homepage';
import Alert from './components/Banner/Alert';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@mui/styles';

function App() {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: "#14161a",
      color:"white",
      minHeight:"100vh"

    }
  }))
  const classes = useStyles() 
  return (
    <div className={classes.App}>


      <Header/>
      
      <Routes>
        <Route path="/" element={<Homepage/>} exact/>
        <Route path="/coins/:id" element={<Coinpage/>}/>
       
      </Routes>
      <Alert/>
    </div>
  )

 
}

export default App;
