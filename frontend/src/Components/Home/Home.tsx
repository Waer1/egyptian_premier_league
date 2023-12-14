import { useSelector } from "react-redux";
import PopUpMatch from "../PopUpMatch/PopUpMatch";
import Card from "./Card/Card";
import Filter from "./Filter/Filter";
import { Container } from "./style";
import { filterState } from "../../State";
import React, { useEffect } from "react";
import axios from "../../Server/Instance";
import { Match,Teams } from "../Types";

// const matches :Match[]= [
//     {
//     team1: "Al-Ahly",
//     team2: "El-Zamalek",
//     date: new Date("2020-8-4"),
//     time: new Date("2020-8-4"),
//     logo1: "https://material-ui.com/static/images/avatar/1.jpg",
//     logo2: "https://material-ui.com/static/images/avatar/1.jpg",
//     ref:"ref",
//     first:"first",
//     second:"second",
//     stadium:"stadium"
//     },
//     {
//     team2: "Al-Ahly",
//     team1: "El-Zamalek",
//     date: new Date("2021-10-10"),
//     time: new Date("2021-10-10"),
//     logo2: "https://material-ui.com/static/images/avatar/1.jpg",
//     logo1: "https://material-ui.com/static/images/avatar/1.jpg",
//     ref:"ref",
//     first:"first",
//     second:"second",
//     stadium:"stadium"
//     }
// ]
// const teams:Team[] =matches.map((match,index) => {
//     const team :Team = {
//         team1: match.team1,
//         team2: match.team2,
//         date: match.date,
//         logo1: match.logo1,
//         logo2: match.logo2,
//         };
//     return team;
// }
// )
type Response = {
    id:number,
    homeTeam: string,
    awayTeam: string,
    date: Date,
    time:Date,
    stauimName: string,
    mainReferee:string,
    firstLinesman:string,
    secondLinesman:string;
    homeTeamLogo:string,
    awayTeamLogo:string,
    }

export default function Home( ) {
    const filter= useSelector((state:filterState) => state.filter);
    const state= useSelector((state:filterState) => state.state);
    const [matches, setMatches] = React.useState<Match[]>([]);
    const [teams, setTeams] = React.useState<Teams[]>([]);
 
useEffect(() => {
    //TODO: get data from backend depends on the filter 
    // get index of fisrt true in filter array
    const index = filter.indexOf(true);
    // set start date with 1900/1/1 and end date with 2100/1/1
    let startDate = new Date(1900,1,1);
    let endDate= new Date(2100,1,1);
    switch(index)
    {
        
        case 0:
            
            // send start data and end date in params of the request
            axios.get('/matchs/date-range',{
                params:{
                    startDate:startDate,
                    endDate:endDate
                }
            }).then((res)=>{ 

                if(res.status===200)
                {
                    const ms:Match[] =res.data.map((d:Response,index:number) => {
                        const m :Match = {
                            id:d.id,
                            team1: d.homeTeam,
                            team2: d.awayTeam,
                            date: d.date,
                            time: d.time,
                            logo1: d.homeTeamLogo,
                            logo2: d.awayTeamLogo,
                            ref:d.mainReferee,
                            first:d.firstLinesman,
                            second:d.secondLinesman,
                            stadium:d.stauimName,
                            };
                        return m;
                    }
                    )
                    const teams:Teams[] =ms.map((match:Match,index:number) => {
                        const team :Teams = {
                            id:match.id,
                            team1: match.team1,
                            team2: match.team2,
                            date: match.date,
                            logo1: match.logo1,
                            logo2: match.logo2,
                            };
                        return team;
                    }
                    )
                    setMatches(ms);  
                    setTeams(teams);
                }
            }
            ).catch((err)=>{console.log(err);}
            );
            break;
        case 1:
            // set start date with 1900/1/1 and end date with 
            startDate = new Date(1900,1,1);
            endDate= new Date();
            axios.get('/matchs/date-range',{
                params:{
                    startDate:startDate,
                    endDate:endDate
                }
            }).then((res)=>{ 
                if(res.status===200)
                {
                    setMatches(res.data);  
                    const teams:Teams[] =res.data.map((match:Match,index:number) => {
                        const team :Teams = {
                            id:match.id,
                            team1: match.team1,
                            team2: match.team2,
                            date: match.date,
                            logo1: match.logo1,
                            logo2: match.logo2,
                            };
                        return team;
                    }
                    )
                    setTeams(teams);
                }
            }
            ).catch((err)=>{console.log(err);}
            );
            break;   
        case 2:
            startDate = new Date();
            endDate= new Date();
            axios.get('/matchs/date-range',{
                params:{
                    startDate:startDate,
                    endDate:endDate
                }
            }).then((res)=>{ 
                if(res.status===200)
                {
                    setMatches(res.data);  
                    const teams:Teams[] =res.data.map((match:Match,index:number) => {
                        const team :Teams = {
                            id:match.id,
                            team1: match.team1,
                            team2: match.team2,
                            date: match.date,
                            logo1: match.logo1,
                            logo2: match.logo2,
                            };
                        return team;
                    }
                    )
                    setTeams(teams);
                }
            }
            ).catch((err)=>{console.log(err);}
            );
            break;
        case 3:
            startDate = new Date();
            endDate= new Date(2100,1,1);
            axios.get('/matchs/date-range',{
                params:{
                    startDate:startDate,
                    endDate:endDate
                }
            }).then((res)=>{ 
                if(res.status===200)
                {
                    setMatches(res.data);  
                    const teams:Teams[] =res.data.map((match:Match,index:number) => {
                        const team :Teams= {
                            id:match.id,
                            team1: match.team1,
                            team2: match.team2,
                            date: match.date,
                            logo1: match.logo1,
                            logo2: match.logo2,
                            };
                        return team;
                    }
                    )
                    setTeams(teams);
                }
            }
            ).catch((err)=>{console.log(err);}
            );
            break;
        default:
            axios.get('/matchs').then((res)=>{
                if(res.status===200)
                {
                    setMatches(res.data);  
                    const teams:Teams[] =res.data.map((match:Match,index:number) => {
                        const team :Teams = {
                            id:match.id,
                            team1: match.team1,
                            team2: match.team2,
                            date: match.date,
                            logo1: match.logo1,
                            logo2: match.logo2,
                            };
                        return team;
                    }
                    )
                    setTeams(teams);
                }
            }
            ).catch((err)=>{
                console.log(err);
            }
            );
            break;
    }
        }, [filter])
    return (
        <Container>
            <Filter/>
            {
                matches.map((match,index) => {
                    return <>
                            <PopUpMatch match={match} key={index} index={index} state={state}/>
                            <Card key={index} team={teams[index]} index={index} match={match} state={state}/>
                        </>
                })
            }
        </Container>
    );
}