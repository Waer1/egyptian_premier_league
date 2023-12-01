import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FormControl,Input,InputLabel,Typography } from '@mui/material';
import {Btn, Style} from './style';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import moment from 'moment';
import { DesktopTimePicker } from '@mui/x-date-pickers';

type Match = {
    team1: string;
    team2: string;
    date: Date;
    time: Date;
    logo1: string;
    logo2: string;
    ref:string;
    first:string;
    second:string;
    stadium:string;
}
type CardProps = {
    match: Match;
    index: number;
}

export default function EditMatch(props:CardProps) {
    const match = props.match;
    const index=props.index
  const [open, setOpen] = React.useState(false);
  const [home, setHom] = React.useState(match.team1);
  const [away, setAway] = React.useState(match.team2);
  const [ref, setRef] = React.useState(match.ref);
  const [fisrt, setFirst] = React.useState(match.first);
  const [second, setSecond] = React.useState(match.second);
  const [stadium, setStadium] = React.useState(match.stadium);
  const [time, setTime] = React.useState(match.date);
  const [time2, setTime2] = React.useState(match.time);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Submit=()=>{  
    console.log("Submit");
  }
  const Cancel=()=>{  
    console.log("Cancel");
  }

  return (
    <div>
      <Btn onClick={handleOpen} id={`Edit+${index}`}>Edit Match</Btn>
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
                
            </Box>

            <Box sx={{display:"flex" , alignItems:"end",justifyContent:'space-evenly',width: 500,my:1}}>
            
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{boxSizing:"border-box",width:"40%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Date of Birth"
                            value={dayjs(moment(time).format('YYYY-MM-DD'))}
                            onChange={(newValue) => 
                            {
                                if(newValue!==null) setTime(newValue.toDate());
                            }         
                        }
                    />
                        </DemoContainer>
                    </Box>
            <Box sx={{boxSizing:"border-box",width:"40%",display:'flex',justifyContent:'center',alignItems:'center'}}>

                        <DemoContainer
                            components={[
                                'TimePicker',
                                'MobileTimePicker',
                                'DesktopTimePicker',
                                'StaticTimePicker',
                            ]}
                            >
                            <DemoItem >
                                <DesktopTimePicker defaultValue={dayjs(time2.toISOString().slice(0, 16))} label="Time for match"
                                onChange={
                                    (newValue) => 
                                    {
                                        if(newValue!==null) setTime2(newValue.toDate());
                                    }
                                }
                                />
                            </DemoItem>
                        </DemoContainer>
                                 </Box>       
                    </LocalizationProvider>

            </Box>
            <Box sx={{width:"80%",display:'flex',alignItems:'baseline',justifyContent:"space-evenly",my:1}}>
                    <Button variant="contained"  onClick={Submit}>Submit</Button>
                    <Button variant="contained"  onClick={Cancel}>Cancel</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}