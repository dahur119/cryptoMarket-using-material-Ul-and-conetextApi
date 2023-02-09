import React, { useState } from 'react'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
// import { confirmPasswordReset, signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {Button} from '@mui/material'
import { useContext } from 'react'
import { CryptoContext } from '../../contexts/cryptoContext'

import { auth } from '../../firebase'




function SignUp({handleClose}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {setAlert} = useContext(CryptoContext)

    const handleSubmit = async() =>{
        if(password !== confirmPassword){
                setAlert({
                  open:true,
                  message:"email and password isn't correct",
                  type:"error"
        })

        try{
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.logI(result)

            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: "success",
              });

        }catch(error){


        }

    }}
   
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
        <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />


        <Button
        variant="contained"
        size="large"
        style={{backgroundColor:"#EEBC1D"}}
        onClick={handleSubmit}
        
        >
            SignUp
        </Button>

        
    </Box>
  )
}

export default SignUp