import PopUpMatch from "../PopUpMatch/PopUpMatch";
import Card from "./Card/Card";
import Filter from "./Filter/Filter";
import { Container } from "./style";
type Team = {
    team1: string;
    team2: string;
    time: string;
    date: string;
    logo1: string;
    logo2: string;
}
type Match = {
    team1: string;
    team2: string;
    time: string;
    date: string;
    logo1: string;
    logo2: string;
    ref:string;
    first:string;
    second:string;
    stadium:string;
}
export default function Home() {
  
const matches :Match[]= [
    {
    team1: "Al-Ahly",
    team2: "El-Zamalek",
    time: "2021-10-10",
    date: "10:00 pm",
    logo1: "https://material-ui.com/static/images/avatar/1.jpg",
    logo2: "https://material-ui.com/static/images/avatar/1.jpg",
    ref:"ref",
    first:"first",
    second:"second",
    stadium:"stadium"
    },
    {
    team2: "Al-Ahly",
    team1: "El-Zamalek",
    time: "2020-8-4",
    date: "8:00 pm",
    logo2: "https://material-ui.com/static/images/avatar/1.jpg",
    logo1: "https://material-ui.com/static/images/avatar/1.jpg",
    ref:"ref",
    first:"first",
    second:"second",
    stadium:"stadium"
    }
]
const teams:Team[] =matches.map((match,index) => {
    const team = {
        team1: match.team1,
        team2: match.team2,
        time: match.time,
        date: match.date,
        logo1: match.logo1,
        logo2: match.logo2,
        };
    return team;
}
)
    return (
        <Container>
            <Filter/>
            {
                matches.map((match,index) => {
                    return <>
                            <PopUpMatch match={match} key={index} index={index}/>
                            <Card key={index} team={teams[index]} index={index}/>
                        </>
                })
            }
        </Container>
    );
}