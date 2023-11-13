import Card from "./Card/Card";
import Filter from "./Filter/Filter";
import { Container } from "./style";
type team = {
    team1: string;
    team2: string;
    time: string;
    date: string;
    logo1: string;
    logo2: string;
}
export default function Home() {

    const teams :team[]= [
        {
        team1: "Al-Ahly",
        team2: "El-Zamalek",
        time: "2021-10-10",
        date: "10:00 pm",
        logo1: "https://material-ui.com/static/images/avatar/1.jpg",
        logo2: "https://material-ui.com/static/images/avatar/1.jpg",
        },
        {
        team2: "Al-Ahly",
        team1: "El-Zamalek",
        time: "2020-8-4",
        date: "8:00 pm",
        logo2: "https://material-ui.com/static/images/avatar/1.jpg",
        logo1: "https://material-ui.com/static/images/avatar/1.jpg",
        }
]    
    return (
        <Container>
            <Filter/>
            {
                teams.map((team,index) => {
                    return <Card key={index} team={team}/>
                })
            }
        </Container>
    );
}