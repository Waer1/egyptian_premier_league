import { Avatar, Box } from "@mui/material";
import { BOX, Container, Delete, Team1, Team2, TeamName } from "./style";
import Time from "./Time/Time";
import EditMatch from "../../EditMatch/EditMatch";
import TakeSeat from "../../TakeSeat/TakeSeat";
import ShowSeats from "../../ShowSeats/ShowSeats";
import { Match,Teams,Coordinates } from "../../Types";
import axios from "../../../Server/Instance";
import { useSelector } from "react-redux";
import { filterState } from "../../../State";
const reserved: Coordinates[] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 9],
    [2, 1],
    [2, 2],
    [2, 0],
    [2, 10],
];
export type CardProps = {
    team: Teams;
    index: number;
    match:Match;
    state:number;
    row?:number;
    column?:number;
}
export default function Card(props:CardProps) {
    const team = props.team;
    const index=props.index;
    const state=props.state;
    const match=props.match;
    const row=props.row;
    const column=props.column;
    const displayCard=()=>{
        document.getElementById("match"+index)?.click();
    }
    const token=useSelector((state:filterState)=>state.token)
    const DeleteMatch=()=>{
        // TODO: send delete action to backend
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.delete(`/matchs/${match.id}`)
        .then(res => res.status)
        .then(status => {
            if(status===200||status===201) 
                window.location.reload();
        })
        .catch(err => console.log(err));
    }
    const DeleteSeat=()=>{
        // TODO: send delete action to backend
        // wait for waer
    }
    return (
        <BOX>
            <Container key={index} onClick={displayCard}>
                <Team1>
                    <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={match.team1} src={process.env.PUBLIC_URL+match.logo1} />
                    <TeamName>
                        {match.team1}
                    </TeamName>
                </Team1>
                <Time data={match.date} time={match.time}/>
                <Team2>
                    <TeamName>
                        {match.team2}
                    </TeamName>
                    <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={match.team2} src={process.env.PUBLIC_URL+match.logo2} />
                </Team2>
            </Container>
            <Box sx={{display:'flex', mt:0.5}}>
                
                {(state===2) && 
                <>
                <EditMatch match={match} index={index} />
                <Delete onClick={DeleteMatch}>Delete</Delete>
                <ShowSeats Rows={8} Columns={15} reserved={reserved}/>
                </>
                }
                {(state===1) && 
                <>
                <TakeSeat Rows={10} Columns={10} reserved={reserved}/>
                </>
                }
                {(state===4) && 
                <>
                <Delete onClick={DeleteSeat}> Cancle Row:{row} column:{column}</Delete>
                </>
                }
            </Box>
        </BOX>
    );
}