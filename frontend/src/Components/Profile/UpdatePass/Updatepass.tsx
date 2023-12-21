import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import {Style} from './style';
import { error } from '../../Alert';
import axios from "../../../Server/Instance"
import { useSelector } from 'react-redux';


export default function ChangePass() {
  const [open, setOpen] = React.useState(false);
  const [oldPass, setOldPass] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const token=useSelector((state:any)=>state.token)
  const Save=()=>{
    // TODO:
    // send request to backend to check if the user is valid and fet the state 
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
    axios.patch('/auth/updatePassword',{
      oldPassword:password,
      newPassword:oldPass
    }).then((res)=>{
      if(res.status===201 || res.status===200){
        
        handleClose();
      }
      else{
        error("Invalid password");
      }
    }).catch((err)=>{
      error(err.response.data.message)  
    });
  }
  const Cancel=()=>{
    handleClose();
  }
  return (
    <div>
      <Button onClick={handleOpen} sx={{ mt: 2,textTransform:"math-auto" }} id='Login'>Change Password</Button>
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
                <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
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
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword2 ? 'text' : 'password'}
                    defaultValue={oldPass}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setOldPass(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                <Button variant="contained" sx={{m:1}} onClick={Save}>Save</Button>
                <Button variant="contained" sx={{m:1}} onClick={Cancel}>Cancel</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}