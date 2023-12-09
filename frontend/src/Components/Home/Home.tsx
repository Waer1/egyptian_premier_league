import { useSelector } from "react-redux";
import PopUpMatch from "../PopUpMatch/PopUpMatch";
import Card from "./Card/Card";
import Filter from "./Filter/Filter";
import { Container } from "./style";
import { filterState } from "../../State";
import { useEffect } from "react";
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
const matches :Match[]= [
    {
    team1: "Al-Ahly",
    team2: "El-Zamalek",
    date: new Date("2020-8-4"),
    time: new Date("2020-8-4"),
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
    date: new Date("2021-10-10"),
    time: new Date("2021-10-10"),
    logo2: "https://material-ui.com/static/images/avatar/1.jpg",
    logo1: "https://material-ui.com/static/images/avatar/1.jpg",
    ref:"ref",
    first:"first",
    second:"second",
    stadium:"stadium"
    }
]
const teams:Team[] =matches.map((match,index) => {
    const team :Team = {
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        logo1: match.logo1,
        logo2: match.logo2,
        };
    return team;
}
)
export default function Home( ) {
    const state= useSelector((state:filterState) => state.state);


useEffect(() => {
    //TODO: get data from backend depends on the filter 
    // index = filter.indexof(1)
    // switch(index)
    console.log(matches);
}, [])
    return (
        <Container>
            <Filter/>
            {
                matches.map((match,index) => {
                    return <>
                            <PopUpMatch match={match} key={index} index={index} state={0}/>
                            <Card key={index} team={teams[index]} index={index} match={match} state={state}/>
                        </>
                })
            }
        </Container>
    );
}