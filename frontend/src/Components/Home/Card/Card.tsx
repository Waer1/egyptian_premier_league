import { Avatar, Box } from "@mui/material";
import { BOX, Container, Delete, Team1, Team2, TeamName } from "./style";
import Time from "./Time/Time";
import EditMatch from "../../EditMatch/EditMatch";
import TakeSeat from "../../TakeSeat/TakeSeat";
import ShowSeats from "../../ShowSeats/ShowSeats";
import { Match,Teams,Coordinates } from "../../Types";
import axios from "../../../Server/Instance";
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

    const DeleteMatch=()=>{
        // TODO: send delete action to backend
        axios.delete(`/match/${match.id}`);

    }
    const DeleteSeat=()=>{
        // TODO: send delete action to backend
        // wait for waer
    }
    return (
        <BOX>
            <Container key={index} onClick={displayCard}>
                <Team1>
                    <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={team.team1} src={team.logo1} />
                    <TeamName>
                        {team.team1}
                    </TeamName>
                </Team1>
                <Time data={team.date} time={match.time}/>
                <Team2>
                    <TeamName>
                        {team.team2}
                    </TeamName>
                    <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={team.team2} src={team.logo2} />
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