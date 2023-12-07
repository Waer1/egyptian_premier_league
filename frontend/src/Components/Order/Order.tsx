import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Container, Header, ListContainer, ListNumber } from './style';

export default function Order() {
  
    const [teams,setTeams]=React.useState<string[]>();
    React.useEffect(() => {
        setTeams(["Al-ahly","Zamalek","itihad el sakandary","pyramids"]);
    }, []);
  return (
    <Container>
        <Header>
        <SportsSoccerIcon fontSize='medium' sx={{paddingRight:1}}/> Standing
        </Header>
        <ListContainer dense >
        {teams?.map((value:string,index:number) => {
            return (
            <ListItem
                key={value}
                disablePadding
            >
                <ListItemButton >
                <ListNumber primary={index+1}/>
                <ListItemAvatar sx={{width:"30%"}}>
                    <Avatar
                    alt={value}
                    src={`/static/images/avatar/${index + 1}.jpg`}
                    />
                </ListItemAvatar>
                <ListItemText id={`index`} primary={value} sx={{width:"50%"}} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </ListContainer>
    </Container>
  );
}