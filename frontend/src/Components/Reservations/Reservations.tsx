import { Container } from "./style";
import Card from "../Home/Card/Card";
import Filter from "../Home/Filter/Filter";
import PopUpMatch from "../PopUpMatch/PopUpMatch";
import React, { useEffect } from "react";
import axios from "../../Server/Instance";
import { Match,Teams,Ticket } from "../Types";



type TicketProps={
    tickets:Ticket[];
}
const tickets2:Ticket[]=[
    {
      seatRaw: 1,
      seatColum: 1,
      reservationTime: new Date("2020-8-4"),
      match: {
        id:1,
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
        id:2,
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
        // wait for waer 
        // Todo: fetch tickets from backend

    },[]);
    const teams:Teams[] =tickets.map((ticket,index) => {
        const team :Teams = {
            id:ticket.match.id,
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