import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, Radio, RadioGroup, Typography } from '@mui/material';
import {Style} from './style';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDispatch } from "react-redux";
import {bindActionCreators} from 'redux';
import { actionsCreators } from "../../State/index";


export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [role, setRole] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState(new Date());

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
  const {ChangeState,ChangeToken} = bindActionCreators(actionsCreators,dispatch);

  const LogIN=()=>{
    handleClose();
    document.getElementById('Login')?.click();
    console.log("Log in");
  }
  const SignUP=()=>{  
    // TODO:
    // send request to backend to check if the user is valid and fet the state 
    ChangeState(1);
    ChangeToken("sss")
    console.log("Sign up");
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ my: 2, color: 'white', display: 'block' }} id='Signup'>Sign Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...Style, width: 500 ,display: 'flex', alignItems: 'center' ,justifyContent:"center",flexDirection:"column"}}>
            <Box sx={{display:"flex" , alignItems:"center",my:1}}>
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
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
                <Box sx={{width:"40%"}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="User Name">User Name</InputLabel>
                    <Input
                        id="User Name"
                        type='text' 
                        defaultValue={userName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setUserName(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>

                <Box sx={{width:"40%"}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        defaultValue={password}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
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
            </Box>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"40%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="First Name">First Name</InputLabel>
                    <Input
                        id="First Name"
                        type='text' 
                        defaultValue={firstName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"40%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Last Name">Last Name</InputLabel>
                    <Input
                        id="Last Name"
                        type='text' 
                        defaultValue={lastName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setLastName(e.target.value);
                        }}
                    />
                </FormControl>
            </Box>
            </Box>

            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"38%"}}>
            <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                        <RadioGroup
                            defaultValue={role}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setRole(e.target.value);
                            }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                            <FormControlLabel value="Fan" control={<Radio />} label="Fan" />
                        </RadioGroup>
                </FormControl>
                </Box>
            <Box sx={{width:"38%"}}>
                
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            defaultValue={gender}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setGender(e.target.value);
                            }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                </FormControl>
            </Box>
            </Box>

            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"40%"}}>
                
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Email">Email</InputLabel>
                    <Input
                        id="Email"
                        type='text' 
                        defaultValue={email}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
                
                <Box sx={{width:"40%"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                        onChange={(value: Date | null) => {
                            if (value) {
                                setDateOfBirth(value);
                            }
                        }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                </Box>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"40%"}}>
                
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Address">Address</InputLabel>
                    <Input
                        id="Address"
                        type='text' 
                        defaultValue={address} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setAddress(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"40%"}}>

                <FormControl>
                    <InputLabel htmlFor="City">City</InputLabel>
                    <Input
                        id="City"
                        type='text' 
                        defaultValue={city}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setCity(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                <Button variant="contained" sx={{m:1}} onClick={SignUP}>Submit</Button>
                <Button variant="contained" sx={{m:1}} onClick={LogIN}>Login</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}