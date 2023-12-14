import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import {Style} from './style';

import { useDispatch } from "react-redux";
import {bindActionCreators} from 'redux';
import { actionsCreators } from "../../State/index";
import { error } from '../Alert';
import axios from "../../Server/Instance";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const {ChangeState, ChangeToken,ChangeId} = bindActionCreators(actionsCreators,dispatch);

  const LogIN=()=>{
    // TODO:
    // send request to backend to check if the user is valid and fet the state 
    axios.post('/login',{
      userName:name,
      password:password
    }).then((res)=>{
      console.log(res)
      if(res.status===200){
        let role =0 
        if(res.data.userData.role==="fan")
          role=1;
        else if(res.data.userData.role==="efmanger")
          role=2;
        else if(res.data.userData.role==="siteAdmin")
          role=3;
        console.log(role)
        ChangeState(role);
        ChangeId(res.data.userData.id);
        ChangeToken(res.data.access_token);
        handleClose();
      }
      else{
        error("Invalid user name or password");
      }
    }).catch((err)=>{
      error("Invalid user name or password");
    });
  }
  const SignUP=()=>{
    handleClose();
    document.getElementById('Signup')?.click();
    console.log("Sign up");
  }
  return (
    <div>
      <Button onClick={handleOpen} sx={{ my: 2, color: 'white', display: 'block' }} id='Login'>Log in</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...Style, width: 400 ,display: 'flex', alignItems: 'center' ,justifyContent:"center",flexDirection:"column"  }}>
            <Box sx={{display:"flex" , alignItems:"center"}}>
                <SportsSoccerIcon sx={{fontSize:'3rem',color:'#1976d2'}}/>
                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#1976d2',
                textDecoration: 'none',
                }}
                >
                    EPL
                </Typography>
            </Box>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="User Name">User Name</InputLabel>
                <Input
                    id="User Name"
                    type='text' 
                    defaultValue={name}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                <Button variant="contained" sx={{m:1}} onClick={LogIN}>Submit</Button>
                <Button variant="contained" sx={{m:1}} onClick={SignUP}>Sign up</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}