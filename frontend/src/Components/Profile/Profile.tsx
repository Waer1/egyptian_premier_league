import React, { useEffect } from 'react';
import { Container } from './style';
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { UserInfo } from '../Types';
import axios from '../../Server/Instance';
import {useSelector } from "react-redux";
import { filterState } from '../../State';
import { error, success } from '../Alert';
import ChangePass from './UpdatePass/Updatepass';

export default function Profile() {
    // var UserInfo=constInfo;
    const [userConstName,setUserCostName]=React.useState<string>('');

    const id:number =useSelector((state:filterState) => state.id);
    const [constInfo,setConstInfo]=React.useState<UserInfo|null>(null);
    const [userInfo,setUserInfo]=React.useState<UserInfo|null>(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const token=useSelector((state:filterState)=>state.token)
    console.log(id)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const getData=async()=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        await axios.patch(`/users/current`)
        .then(res => res.data)
        .then(data => {
        if(data!==undefined )
        {
            const usernameValue = data.username;
            delete data.username;
            data.userName = usernameValue;
            setUserInfo(data);
            setUserCostName(data.userName);
        
        }
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        // wait for waer get unauthorized
        // TODO: send request to backend to get the user info
        getData();
    }, [])
    const Cancel=async()=>{
        window.location.reload();
    }
    const Save=()=>{
        console.log(userInfo)
        if(userInfo!==undefined && userInfo!==null)
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
            if (userInfo?.userName!==userConstName)
                {
                    axios.patch(`/auth/updateProfile`,{
                    username: userInfo.userName,
                    password: userInfo.password,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    dateOfBirth: userInfo.dateOfBirth,
                    gender: userInfo.gender,
                    city: userInfo.city,
                    email: userInfo.email,
                    role: userInfo.role,
                    address: userInfo.address
                })
                .then((res)=> {
                    if(res.status!==200 )
                    {
                        error(res.data.message)
                    
                    }
                    else{
                        success("updated successfully")
                    }
                    }
                )
                .catch(err => 
                    {
                        console.log(err.response.data.message)
                        error(err.response.data.message);

                    }
                )
            }else{
                axios.patch(`/auth/updateProfile`,{
                    password: userInfo.password,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    dateOfBirth: userInfo.dateOfBirth,
                    gender: userInfo.gender,
                    city: userInfo.city,
                    email: userInfo.email,
                    role: userInfo.role,
                    address: userInfo.address
                })
                .then(res => res.data)
                .catch(err => error(err));
            }
        }
    }
    return (
       <> 
    {
        userInfo!==null &&
        <Container>
                
            <Box sx={{display:"flex" , alignItems:"center",my:1 ,width:"100%",justifyContent:'center' }}>
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
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1 ,width:"100%"}}>
                <Box sx={{width:"50%"}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="User Name">User Name</InputLabel>
                    <Input
                        id="User Name"
                        type='text' 
                        defaultValue={userInfo?.userName} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if(userInfo!==null){
                                userInfo.userName=e.target.value;
                            }
                        }}
                    />
                </FormControl>
                </Box>

                <Box sx={{width:"50%"}}>
                    <ChangePass/>
                {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        defaultValue={userInfo?.password}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if (userInfo!==null)
                                userInfo.password=e.target.value;
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
                </FormControl> */}
            </Box>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1,width:"100%"}}>
            <Box sx={{width:"50%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="First Name">First Name</InputLabel>
                    <Input
                        id="First Name"
                        type='text' 
                        defaultValue={userInfo?.firstName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if (userInfo!==null)
                                userInfo.firstName=e.target.value;
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"50%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Last Name">Last Name</InputLabel>
                    <Input
                        id="Last Name"
                        type='text' 
                        defaultValue={userInfo?.lastName}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if (userInfo!==null)
                                userInfo.lastName=e.target.value;
                        }}
                    />
                </FormControl>
            </Box>
            </Box>

            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1,width:"100%"}}>
            <Box sx={{width:"40%" }}>
            <FormControl >
                    <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                        <RadioGroup
                            defaultValue={userInfo?.role}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                if (userInfo!==null)
                                    userInfo.role=e.target.value;
                            }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="EFA manager" control={<Radio />} label="Manager" />
                            <FormControlLabel value="fan" control={<Radio />} label="Fan" />
                        </RadioGroup>
                </FormControl>
                </Box>
            <Box sx={{width:"40%"}}>
                
                <FormControl >
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            defaultValue={userInfo?.gender}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                if (userInfo!==null)
                                    userInfo.role=e.target.value;
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

            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1,width:"100%"}}>
            <Box sx={{width:"50%"}}>
                
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Email">Email</InputLabel>
                    <Input
                        id="Email"
                        type='text' 
                        defaultValue={userInfo?.email}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if (userInfo!==null)
                                userInfo.email=e.target.value;
                        }}
                    />
                </FormControl>
                </Box>
                
                <Box sx={{width:"50%"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}sx={{marginLeft: '20%'}}>
                        <DatePicker
                        label="Date of Birth"
                        value={dayjs(moment(userInfo?.dateOfBirth).format('YYYY-MM-DD'))}
                        onChange={(newValue) => 
                                {
                                    if(newValue!==null && userInfo!==null) 
                                    userInfo.dateOfBirth=newValue.toDate();
                                }                
                            }
                        />
                    </DemoContainer>
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1,width:"100%"}}>
            <Box sx={{width:"50%"}}>
                
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Address">Address</InputLabel>
                    <Input
                        id="Address"
                        type='text' 
                        defaultValue={userInfo?.address} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if (userInfo!==null)
                                userInfo.address=e.target.value;
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"50%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="City">City</InputLabel>
                    <Input
                        id="City"
                        type='text' 
                        defaultValue={userInfo?.city}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            if (userInfo!==null)
                                userInfo.city=e.target.value;
                        }}
                    />
                </FormControl>
                </Box>
            </Box>
            <Box sx={{display:'flex', justifyContent:'space-evenly',my:1}}>
                    <Button variant="contained" sx={{m:1}} onClick={Save}>Save</Button>
                    <Button variant="contained" sx={{m:1}} onClick={Cancel} >Cancel</Button>
            </Box>
        </Container>
        
    }
    </>
    );
}