import { Avatar, Box } from "@mui/material";
import { BOX, Container, Delete, Team1, Team2, TeamName } from "./style";
import Time from "./Time/Time";
import EditMatch from "../../EditMatch/EditMatch";
import TakeSeat from "../../TakeSeat/TakeSeat";
import ShowSeats from "../../ShowSeats/ShowSeats";

type Team = {
    team1: string;
    team2: string;
    date: Date;
    logo1: string;
    logo2: string;
}
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
    team: Team;
    index: number;
    match:Match;
    state:number;
    row?:number;
    column?:number;
}
type Coordinates = [number, number]; // [row, column]

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
                <EditMatch match={match} index={index}/>
                <Delete >Delete</Delete>
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
                <Delete> Cancle Row:{row} column:{column}</Delete>
                </>
                }
            </Box>
        </BOX>
    );
}