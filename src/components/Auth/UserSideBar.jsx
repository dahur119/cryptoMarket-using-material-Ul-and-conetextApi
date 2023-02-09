import React from 'react';
import { makeStyles } from '@mui/styles';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import Button from '@material-ui/core/Button';
import { Avatar, SwipeableDrawer } from '@mui/material'; 
import {Button} from '@mui/material';
import { useContext } from 'react';
import { CryptoContext } from '../../contexts/cryptoContext'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
 
const useStyles = makeStyles({
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
    logout: {
      height: "8%",
      width: "100%",
      backgroundColor: "#EEBC1D",
      marginTop: 20,
    },
    picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      backgroundColor: "#EEBC1D",
      objectFit: "contain",
    },
    watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      borderRadius: 10,
      padding: 15,
      paddingTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
    },
    coin: {
      padding: 10,
      borderRadius: 5,
      color: "black",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#EEBC1D",
      boxShadow: "0 0 3px black",
    },
  });

  

export default function UserSideBar() {
    const {user, setAlert} = useContext(CryptoContext)
  const classes = useStyles();
  const [state, setState] = React.useState({
  
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () =>{
    signOut(auth)
    setAlert({
        open:true,
        type:"success",
        message:"Logout Successful"
    })

    toggleDrawer()
  }



  

  return (
    <div>
      {['right' ].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
            height:38,
            width:38,
        
            cursor:"pointer",
            backgroundColor:"3EEEBC1D"
          }}
          src={user.photoURl}
          alt = {user.displayName || user.email}

           

          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className={classes.container}>
                <div className={classes.profile}>
                    <Avatar
                    className={classes.picture}
                    src={user.photoURl}
                    alt={user.displayName || user.email}  
                    />
                    <span
                       style={{
                        width: "100%",
                        fontSize: 25,
                        textAlign: "center",
                        fontWeight: "bolder",
                        wordWrap: "break-word",
                      }}
                    
                    >
                    {user.displayName || user.email}

                    </span>
                    <div className={classes.watchlist}>
                        <span style={{fontSize:15, textShadow:"0 0 5px black"}}>
                            watchlist
                        </span>

                    </div>
                </div>
                <Button
                variant="contained"
                className={classes.logout} 
                onClick={logOut}
                
                >
                    logout
                </Button>
               

            </div>
            
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
  