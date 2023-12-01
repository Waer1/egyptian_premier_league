import React from 'react';
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


type UserInfo={
    userName:string,
    password:string,
    firstName:string,
    lastName:string,
    email:string,
    gender:string,
    role:string,
    city:string,
    dateOfBirth:Date,
    address:string
}
type UserProps={
    user:UserInfo
}
export default function Profile(props:UserProps) {
    const constInfo=props.user;
    // var UserInfo=constInfo;
    var UserInfo:UserInfo=JSON.parse(JSON.stringify(constInfo));
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const Cancel=()=>{
        UserInfo=constInfo;
        if(UserInfo!==constInfo)
        {
            window.location.reload();
        }

    }
    const Save=()=>{
        if(UserInfo!==constInfo)
        {
            window.location.reload();
        }
    }
    return (
    <Container>
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
        <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1}}>
            <Box sx={{width:"50%"}}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="User Name">User Name</InputLabel>
                <Input
                    id="User Name"
                    type='text' 
                    defaultValue={UserInfo.userName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.userName=e.target.value;
                    }}
                />
            </FormControl>
            </Box>

            <Box sx={{width:"50%"}}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={UserInfo.password}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.password=e.target.value;
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
        <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1}}>
        <Box sx={{width:"50%"}}>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="First Name">First Name</InputLabel>
                <Input
                    id="First Name"
                    type='text' 
                    defaultValue={UserInfo.firstName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.firstName=e.target.value;
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
                    defaultValue={UserInfo.lastName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.lastName=e.target.value;
                    }}
                />
            </FormControl>
        </Box>
        </Box>

        <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1,width:'500px'}}>
        <Box sx={{width:"40%" }}>
        <FormControl sx={{display:'flex',justifyContent:'flex-start'}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                    <RadioGroup
                        defaultValue={UserInfo.role}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            UserInfo.role=e.target.value;
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
        <Box sx={{width:"40%"}}>
            
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        defaultValue={UserInfo.gender}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            UserInfo.role=e.target.value;
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

        <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1}}>
        <Box sx={{width:"50%"}}>
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="Email">Email</InputLabel>
                <Input
                    id="Email"
                    type='text' 
                    defaultValue={UserInfo.email}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.email=e.target.value;
                    }}
                />
            </FormControl>
            </Box>
            
            <Box sx={{width:"50%"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                    label="Date of Birth"
                    value={dayjs(moment(UserInfo.dateOfBirth).format('YYYY-MM-DD'))}
                    onChange={(newValue) => 
                            {
                                if(newValue!==null) UserInfo.dateOfBirth=newValue.toDate();
                            }                
                        }
                    />
                </DemoContainer>
                </LocalizationProvider>
            </Box>
        </Box>
        <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',my:1}}>
        <Box sx={{width:"50%"}}>
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="Address">Address</InputLabel>
                <Input
                    id="Address"
                    type='text' 
                    defaultValue={UserInfo.address} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.address=e.target.value;
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
                    defaultValue={UserInfo.city}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        UserInfo.city=e.target.value;
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
    );
}