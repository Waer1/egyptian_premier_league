import { Container } from "./style";
import Card from "../Home/Card/Card";
import Filter from "../Home/Filter/Filter";
import PopUpMatch from "../PopUpMatch/PopUpMatch";
import React, { useEffect } from "react";

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

type Ticket={
  seatRaw: number;
  seatColum: number;
  reservationTime: Date;
  match: Match;

}
type Team = {
    team1: string;
    team2: string;
    date: Date;
    logo1: string;
    logo2: string;
}
type TicketProps={
    tickets:Ticket[];
}
const tickets2:Ticket[]=[
    {
      seatRaw: 1,
      seatColum: 1,
      reservationTime: new Date("2020-8-4"),
      match: {
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
    },
    {
      seatRaw: 1,
      seatColum: 1,
      reservationTime: new Date("2020-8-4"),
      match: {
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
    },
  ]
export default function Reservation() {
    const [tickets,setTickets] =React.useState<Ticket[]>(tickets2);
    useEffect(() => {
        // Todo: fetch tickets from backend
    },[]);
    const teams:Team[] =tickets.map((ticket,index) => {
        const team :Team = {
            team1: ticket.match.team1,
            team2: ticket.match.team2,
            date: ticket.match.date,
            logo1: ticket.match.logo1,
            logo2: ticket.match.logo2,
            };
        return team;
    }
    )
    return (
        <Container>
            <Filter/>
            {
                tickets.map((ticket,index) => {
                    return <>
                            <PopUpMatch row={ticket.seatRaw} column={ticket.seatColum} match={ticket.match} key={index} index={index} state={4}/>
                            <Card row={ticket.seatRaw} column={ticket.seatColum} key={index} team={teams[index]} index={index} match={ticket.match} state={4}/>
                        </>
                })
            }
        </Container>
    );
}