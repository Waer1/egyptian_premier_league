import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Container, Header, ListContainer, ListNumber } from './style';
import {Team} from '../Types';
import axios from "../../Server/Instance"
export default function Order() {
    const [teams,setTeams]=React.useState<Team[]>();

    const getTeams =()=>{
        axios.get("./teams")
        .then((res)=>{
            (
                setTeams(res.data)   
            );
        })
    }
    React.useEffect(() => {
        // wait for waer
        // featch data 
        getTeams()
        
        // setTeams(["Al-ahly","Zamalek","itihad el sakandary","pyramids"]);
    }, []);
  return (
    <Container>
        <Header>
        <SportsSoccerIcon fontSize='medium' sx={{paddingRight:1}}/> Standing
        </Header>
        <ListContainer dense >
        {teams?.map((value:Team,index:number) => {
            return (
            <ListItem
                key={value.id}
                disablePadding
                sx={{m:1}}
            >
                <ListItemButton >
                <ListNumber primary={index+1}/>
                <ListItemAvatar sx={{width:"30%"}}>
                    <Avatar
                    alt={value.name}
                    src={process.env.PUBLIC_URL+value.logo}
                    />
                </ListItemAvatar>
                <ListItemText id={`index`} primary={value.name} sx={{width:"50%"}} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </ListContainer>
    </Container>
  );
}