import { Container } from "./style";
import Card from "../Home/Card/Card";
import Filter from "../Home/Filter/Filter";
import PopUpMatch from "../PopUpMatch/PopUpMatch";
import React, { useEffect } from "react";
import axios from "../../Server/Instance";
import { Match,Teams,Ticket } from "../Types";
import { useSelector } from "react-redux";
import { filterState } from "../../State";



type TicketProps={
    tickets:Ticket[];
}
type Response = {
    id: number;
        match:{
            name: string;
        logo: string;
        homeTeam: {
            name: string;
            logo: string;
        };
        awayTeam: {
            name: string;
            logo: string;
        };
        matchVenue: {
            name: string;
            rows: number;
            seatsPerRow: number;
        };
        dateTime: Date;
        stauimName: string;
        mainReferee: string;
        firstLinesman: string;
        secondLinesman: string;
        }
        seatRaw: number;
        seatColum: number;
        reservationTime:string
    }
export default function Reservation() {
    const [tickets,setTickets] =React.useState<Ticket[]>([]);
    const token=useSelector((state:filterState)=>state.token);
    useEffect(() => {
        // wait for waer 
        // Todo: fetch tickets from backend
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
        axios.post("reservation/user")
        .then(res => {
                const ts:Ticket[]=res.data.map((t:Response,index:number) => {
                    const matchObj :Match = {
                        id:t.id,
                        team1: t.match.homeTeam.name,
                        team2: t.match.awayTeam.name,
                        date: t.match.dateTime,
                        time:t.match.dateTime,
                        stadium: t.match.matchVenue.name,
                        ref:t.match.mainReferee,
                        first:t.match.firstLinesman,
                        second:t.match.secondLinesman,
                        logo1:t.match.homeTeam.logo,
                        logo2:t.match.awayTeam.logo,
                        row:t.match.matchVenue.rows,
                        column:t.match.matchVenue.seatsPerRow,
                        };
                    const T:Ticket={
                        id:t.id,
                        match:matchObj,
                        seatRaw:t.seatRaw,
                        seatColum:t.seatColum,
                        reservationTime:new Date (t.reservationTime)
                    }
                    return T;
                })
                console.log(ts);
                setTickets(ts);
        })

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
            {
                tickets.map((ticket) => {
                    return <>
                            <PopUpMatch row={ticket.seatRaw} column={ticket.seatColum} match={ticket.match} key={ticket.id} index={ticket.id} state={4}/>
                            <Card key={ticket.id} team={teams[ticket.id]} index={ticket.id} match={ticket.match} state={4} seatRaw={ticket.seatRaw} seatColum={ticket.seatColum}/>
                        </>
                })
            }
        </Container>
    );
}