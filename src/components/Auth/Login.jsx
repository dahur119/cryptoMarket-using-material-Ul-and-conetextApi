import React, { useState } from 'react'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import { confirmPasswordReset, signInWithEmailAndPassword } from 'firebase/auth'
import {Button} from '@mui/material'
import { useContext } from 'react'
import { CryptoContext } from '../../contexts/cryptoContext'

import { auth } from '../../firebase'




function Login({handleClose}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {setAlert} = useContext(CryptoContext)

    const handleSubmit = async() =>{
      if(!email || !password){
        setAlert({
          open:true,
          message:"please fill all the field",
          type:"error"
      })


      try{
        const result = await signInWithEmailAndPassword(auth, email, password)
        console.log(result)
        
        setAlert({
          open:true,
          message:`Login Successful. Welcome ${result.user.email}`,
          type:"success"
      })

      handleClose()



      }catch(error){
        setAlert({
          open:true,
          message:error.message,
          type:"error"
      })

      }
       return 
      }
    }
   
  return (
    <Box p={3} style={{display:"flex", flexDirection:"column", gap:"20px"}} >
        <TextField
        variant='outlined'
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        fullWidth
        
        />
         <TextField
        variant='outlined'
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        fullWidth
        
        />


        <Button
        variant="contained"
        size="large"
        style={{backgroundColor:"#EEBC1D"}}
        onClick={handleSubmit}
        
        >
            Login
        </Button>

        
    </Box>
  )
}

export default Login