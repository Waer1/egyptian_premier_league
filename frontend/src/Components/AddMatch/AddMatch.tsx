import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FormControl,Input,InputLabel,MenuItem,Select,Typography } from '@mui/material';
import {Style} from './style';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import moment from 'moment';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import axios from "../../Server/Instance";
import {error,success} from "../Alert";
export default function AddMatch() {
  const [open, setOpen] = React.useState(false);
  const [home, setHom] = React.useState("");
  const [away, setAway] = React.useState("");
  const [ref, setRef] = React.useState("");
  const [fisrt, setFirst] = React.useState("");
  const [second, setSecond] = React.useState("");
  const [stadium, setStadium] = React.useState("");
  const [time, setTime] = React.useState(new Date());
  const [time2, setTime2] = React.useState(new Date());
  const [stadiums, setStadiums] = React.useState<string[]>([]);
    React.useEffect(()=>{
        axios.get("/stadiums")
        .then((res)=>{
            setStadiums(res.data.name)
        })
    },[])
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Submit=()=>{  
    // TODO: send data to backend
    axios.post('/matchs',{
        homeTeam:home,
        awayTeam:away,
        date:time,
        time:time2,
        mainReferee:ref,
        firstLinesman:fisrt,
        secondLinesman:second,
        stauimName:stadium
        }).then((res)=>{
            if(res.status===201)
                {success("Match added successfully");
                handleClose();}
        }).catch((err)=>{
            error("Match added successfully");
        }
    );
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
                    
                    {stadiums.map((s:string) => {
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
                    label="Date of match"
                    defaultValue={dayjs(moment(new Date()).format('YYYY-MM-DD'))}
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
            <Box sx={{display:"flex" , alignItems:"end",justifyContent:'space-evenly',width: 500,my:2}}>
                <Box sx={{width:"40%",display:'flex',alignItems:'baseline',justifyContent:"center",my:1 }}>
                    <Button variant="contained"  onClick={Submit}>Submit</Button>
                </Box>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}