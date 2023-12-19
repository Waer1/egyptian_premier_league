import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FormControl,Input,InputLabel,MenuItem,Select,Typography } from '@mui/material';
import {Btn, Style} from './style';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import moment from 'moment';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import axios from "../../Server/Instance";
import { error, success } from '../Alert';
import { useSelector } from 'react-redux';

import { Match } from "../Types";

type CardProps = {
    match: Match;
    index: number;
}

export default function EditMatch(props:CardProps) {
    const match = props.match;
    const index=props.index
    const id=match.id;
  const [open, setOpen] = React.useState(false);
  const [home, setHom] = React.useState(match.team1);
  const [away, setAway] = React.useState(match.team2);
//   const [logo1, setLogo1] = React.useState(match.logo1);
//   const [logo2, setLogo2] = React.useState(match.logo2);
  const [ref, setRef] = React.useState(match.ref);
  const [fisrt, setFirst] = React.useState(match.first);
  const [second, setSecond] = React.useState(match.second);
  const [stadium, setStadium] = React.useState(match.stadium);
  const [time, setTime] = React.useState(match.date);
  const [time2, setTime2] = React.useState(new Date (match.time));
  const [stadiums, setStadiums] = React.useState<string[]>([]);
  const [teamName, setTeamName] = React.useState<string[]>([]);

  const token=useSelector((state:any)=>state.token)
  React.useEffect(()=>{
    axios.get("/teams")
    .then((res)=>{
        const data=res.data.map((s:any)=>s.name)
        setTeamName(data)
    })
},[])
  React.useEffect(()=>{
    axios.get("/stadiums")
    .then((res)=>{
        const data=res.data.map((s:any)=>s.name)
        setStadiums(data)
    })
},[])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Submit=()=>{  
    // TODO: send new data to backend
    if(home===away){
        error("Home and away team can't be the same");
        return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.patch(`/matchs/${id}`,{
        homeTeam:{
            name:home,
        },
        awayTeam:{
            name:away,
        },
        date:time,
        time:moment(time2).format('HH:mm'),
        mainReferee:ref,
        firstLinesman:fisrt,
        secondLinesman:second,
        stauimName:stadium
        
        }).then((res)=>{
            if(res.status===201 || res.status===200)
                {success("Match edited successfully");
                handleClose();}
        }).catch((err)=>{
            error(err.response.data.message)        }
    );
  }
  const Cancel=()=>{  
    setHom(match.team1);
    setAway(match.team2);
    setRef(match.ref);
    setFirst(match.first);
    setSecond(match.second);
    setStadium(match.stadium);
    setTime(match.date);
    setTime2(match.time);
    handleClose();
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
                    <InputLabel id="demo-simple-select-standard-label">Home Team</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={home}
                    onChange={(e) => {
                        setHom(e.target.value);
                    }}
                    label="Home Team"
                    >
                    
                    {teamName?.map((s:string) => {
                        return (
                        <MenuItem value={s}>{s}</MenuItem>
                    );
                    })}
                    
                    
                    </Select>
                </FormControl>
                </Box>

                <Box sx={{width:"40%"}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Away Team</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={away}
                    onChange={(e) => {
                        setAway(e.target.value);
                    }}
                    label="Away Team"
                    >
                    
                    {teamName?.map((s:string) => {
                        return (
                        <MenuItem value={s}>{s}</MenuItem>
                    );
                    })}
                    
                    
                    </Select>
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
                    <InputLabel id="demo-simple-select-standard-label">Stadium</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={stadium}
                    onChange={(e) => {
                        setStadium(e.target.value);
                    }}
                    label="stadium"
                    >
                    
                    {stadiums?.map((s:string) => {
                        return (
                        <MenuItem value={s}>{s}</MenuItem>
                    );
                    })}
                    
                    
                    </Select>
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