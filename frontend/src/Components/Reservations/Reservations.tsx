import { Container } from "./style";
import Card from "../Home/Card/Card";
import Filter from "../Home/Filter/Filter";
import PopUpMatch from "../PopUpMatch/PopUpMatch";

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

export default function Reservation( props:TicketProps) {
    const tickets : Ticket[]=props.tickets;
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