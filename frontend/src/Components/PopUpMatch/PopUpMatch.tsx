import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Avatar, FormControl,Input,InputLabel,Typography } from '@mui/material';
import {Style, Team1, Team2, TeamName} from './style';
import Time from '../Home/Card/Time/Time';

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

export default function PopUpMatch(props:CardProps) {
    const match = props.match;
    const index=props.index
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ my: 2, color: 'white', display: 'none' }} id={`match${index}`}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...Style, width: 620 ,display: 'flex', alignItems: 'center' ,justifyContent:"center",flexDirection:"column"}}>
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
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 620,my:1}}>
                <Team1>
                    <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={match.team1} src={match.logo1} />
                    <TeamName>
                        {match.team1}
                    </TeamName>
                </Team1>
                <Time data={match.date} time={match.time}/>
                <Team2>
                    <TeamName>
                        {match.team2}
                    </TeamName>
                    <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={match.team2} src={match.logo2} />
                </Team2>
            </Box>
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
                <Box sx={{width:"40%"}}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="Stadium">Stadium</InputLabel>
                    <Input
                        disabled
                        id="Stadium"
                        type='text' 
                        defaultValue={match.stadium} 
                    />
                </FormControl>
                </Box>
                <Box sx={{width:"40%"}}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="Refeere">Refeere</InputLabel>
                        <Input
                            disabled
                            id="Refeere"
                            type='text' 
                            defaultValue={match.ref}
                        />
                    </FormControl>
                </Box>    
            </Box>   
            <Box sx={{display:"flex" , alignItems:"center",justifyContent:'space-evenly',width: 500,my:1}}>
                <Box sx={{width:"40%"}}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="First Name">First Lin mane</InputLabel>
                        <Input
                            disabled
                            id="First Name"
                            type='text' 
                            defaultValue={match.first}
                        />
                    </FormControl>
                </Box>
                
                
                <Box sx={{width:"40%"}}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="Last Name">Second lin man</InputLabel>
                        <Input
                            disabled
                            id="Last Name"
                            type='text' 
                            defaultValue={match.second}
                        />
                    </FormControl>
                </Box>
            </Box>   
        </Box>
      </Modal>
    </div>
  );
}