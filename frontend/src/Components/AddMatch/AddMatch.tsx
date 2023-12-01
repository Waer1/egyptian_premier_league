import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FormControl,Input,InputLabel,Typography } from '@mui/material';
import {Style} from './style';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function AddMatch() {
  const [open, setOpen] = React.useState(false);
  const [home, setHom] = React.useState("");
  const [away, setAway] = React.useState("");
  const [ref, setRef] = React.useState("");
  const [fisrt, setFirst] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [stadium, setStadium] = React.useState("");
  const [time, setTime] = React.useState(new Date());

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Submit=()=>{  
    console.log("Submit");
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ my: 2, color: 'white', display: 'block' }} id='Signup'>Add Match</Button>
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
                        <InputLabel htmlFor="Home Team">Home Team</InputLabel>
                        <Input
                            id="Home Team"
                            type='text' 
                            defaultValue={home}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setHom(e.target.value);
                            }}
                        />
                    </FormControl>
                </Box>

                <Box sx={{width:"40%"}}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="Away Team">Away Team</InputLabel>
                        <Input
                            id="Away Team"
                            type='text' 
                            defaultValue={away}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                setAway(e.target.value);
                            }}
                        />
                    </FormControl>
            </Box>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"40%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="First Name">First Linmane</InputLabel>
                    <Input
                        id="First Name"
                        type='text' 
                        defaultValue={fisrt}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setFirst(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"40%"}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Last Name">Second linman</InputLabel>
                    <Input
                        id="Last Name"
                        type='text' 
                        defaultValue={second}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setSecond(e.target.value);
                        }}
                    />
                </FormControl>
            </Box>
            </Box>

            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"40%" , marginRight:1}}>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Refeere">Refeere</InputLabel>
                    <Input
                        id="Refeere"
                        type='text' 
                        defaultValue={ref}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setRef(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{boxSizing:"border-box",width:"40%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                            onChange={(value: Date | null) => {
                                if (value) {
                                    setTime(value);
                                }
                            }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
            </Box>

            <Box sx={{display:"flex" , alignItems:"end",justifyContent:'space-evenly',width: 500,my:1}}>
            <Box sx={{width:"40%"}}>
                
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Stadium">Stadium</InputLabel>
                    <Input
                        id="Stadium"
                        type='text' 
                        defaultValue={stadium} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            setStadium(e.target.value);
                        }}
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"40%",display:'flex',alignItems:'baseline',justifyContent:"center"}}>
                    <Button variant="contained"  onClick={Submit}>Submit</Button>
                </Box>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}