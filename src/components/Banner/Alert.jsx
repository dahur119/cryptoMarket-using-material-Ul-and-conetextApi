import React, { useState } from 'react'
import { useContext } from 'react'
import { CryptoContext } from '../../contexts/cryptoContext'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert() {
    const {alert, setAlert} = useContext(CryptoContext)
     


    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setAlert({ open: false });
      };


  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert