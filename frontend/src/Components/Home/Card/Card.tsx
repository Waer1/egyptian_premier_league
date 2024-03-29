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
import moment from "moment";

export type CardProps = {
    team: Teams;
    index: number;
    match:Match;
    state:number;
    seatRaw?:number;
    seatColum?:number;
}
export default function Card(props:CardProps) {
    const team = props.team;
    const index=props.index;
    const state=props.state;
    const match=props.match;
    const row=match.row;
    const column=match.column;

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
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.delete(`reservation/${index}`)
        .then(res => res.status)
        .then(status => {
            if(status===200||status===201) 
                window.location.reload();
        })
        .catch(err => console.log(err));
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
                <ShowSeats Rows={row!} Columns={column!} id={match.id}/>
                </>
                }
                {(state===1 && new Date(match.date) >= new Date()) && 
                <>
                <TakeSeat Rows={row!} Columns={column!} id={match.id}/>
                </>
                }
                {(state===4) && 
                <>
                <Delete onClick={DeleteSeat} disabled={((moment(match.date).format('YYYY-MM-DD'))) <= ((moment(new Date()).add(3, 'days').format('YYYY-MM-DD')) )} > Cancle Row:{props.seatRaw} column:{props.seatColum}</Delete>
                </>
                }
            </Box>
        </BOX>
    );
}