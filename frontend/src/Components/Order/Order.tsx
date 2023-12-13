import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Container, Header, ListContainer, ListNumber } from './style';
import {Team} from '../Types';

export default function Order() {
    // wait for waer
    // React.useEffect(() => {
    //     // TODO: fetch teams from backend
    //     // fetch('http://localhost:8000/teams')
    //     // .then(res => res.json())
    //     // .then(data => {
    //     //     console.log(data);
    //     //     setTeams(data);
    //     // })
    //     // .catch(err => console.log(err));
    // }, []);

    const [teams,setTeams]=React.useState<Team[]>();
    React.useEffect(() => {
        // wait for waer
        // featch data 
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
            >
                <ListItemButton >
                <ListNumber primary={index+1}/>
                <ListItemAvatar sx={{width:"30%"}}>
                    <Avatar
                    alt={value.name}
                    src={value.logo}
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