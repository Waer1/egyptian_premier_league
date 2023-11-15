import { Avatar } from "@mui/material";
import { Container, Team1, Team2, TeamName } from "./style";
import Time from "./Time/Time";

type Team = {
    team1: string;
    team2: string;
    time: string;
    date: string;
    logo1: string;
    logo2: string;
}
type CardProps = {
    team: Team;
    key: number;
}
export default function Card(props:CardProps) {
    const team = props.team;
    const key=props.key;
    return (
        <Container key={key}>
            <Team1>
                <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={team.team1} src={team.logo1} />
                <TeamName>
                    {team.team1}
                </TeamName>
            </Team1>
            <Time time={team.time} data={team.date}/>
            <Team2>
                <TeamName>
                    {team.team2}
                </TeamName>
                <Avatar sx={{ width: 85, height: 85 ,mx:4}} alt={team.team2} src={team.logo2} />
            </Team2>
        </Container>
    );
}