import { useSelector } from "react-redux";
import PopUpMatch from "../PopUpMatch/PopUpMatch";
import Card from "./Card/Card";
import Filter from "./Filter/Filter";
import { Container } from "./style";
import { filterState } from "../../State";
import React, { useEffect } from "react";
import axios from "../../Server/Instance";
import { Match,Teams } from "../Types";
import moment from "moment";

type Response = {
    id: number;
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
        };
        dateTime: Date;
        stauimName: string;
        mainReferee: string;
        firstLinesman: string;
        secondLinesman: string;
    }

export default function Home( ) {
    const filter= useSelector((state:filterState) => state.filter);
    const state= useSelector((state:filterState) => state.state);
    const [dummy,setDummy] =React.useState(false)
    const [matches, setMatches] = React.useState<Match[]>([]);
    const [teams, setTeams] = React.useState<Teams[]>([]);
    const idx = filter.indexOf(true);
    console.log(matches);
 
useEffect(() => {
    //TODO: get data from backend depends on the filter 
    // get index of fisrt true in filter array
    // set start date with 1900/1/1 and end date with 2100/1/1
    let startDate = moment(new Date(1900,1,1)).format('YYYY-MM-DD');
    let endDate= moment(new Date(2100,1,1)).format('YYYY-MM-DD');
    switch(idx)
    {
        case 0:
            // send start data and end date in params of the request
            axios.get('/matchs').then((res)=>{
                if(res.status===200)
                {
                    const ms:Match[]=res.data.map((match:Response,index:number) => {
                        const matchObj :Match = {
                            id:match.id,
                            team1: match.homeTeam.name,
                            team2: match.awayTeam.name,
                            date: match.dateTime,
                            time:match.dateTime,
                            stadium: match.matchVenue.name,
                            ref:match.mainReferee,
                            first:match.firstLinesman,
                            second:match.secondLinesman,
                            logo1:match.homeTeam.logo,
                            logo2:match.awayTeam.logo,
                            };
                        return matchObj;
                    }
                    );

                    setMatches(ms);  
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
        case 1:
            // set start date with 1900/1/1 and end date with 
            startDate = moment(new Date(1900,1,1)).format('YYYY-MM-DD');
            endDate= moment(new Date()).format('YYYY-MM-DD');
            axios.post('/matchs/date-range',{
                startDate:startDate,
                endDate:endDate
            }).then((res)=>{ 
                if(res.status===201)
                {
                    const ms:Match[]=res.data.map((match:Response,index:number) => {
                        const matchObj :Match = {
                            id:match.id,
                            team1: match.homeTeam.name,
                            team2: match.awayTeam.name,
                            date: match.dateTime,
                            time:match.dateTime,
                            stadium: match.matchVenue.name,
                            ref:match.mainReferee,
                            first:match.firstLinesman,
                            second:match.secondLinesman,
                            logo1:match.homeTeam.logo,
                            logo2:match.awayTeam.logo,
                            };
                        return matchObj;
                    }
                    );

                    setMatches(ms);  
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
            startDate = moment(new Date()).format('YYYY-MM-DD');
            endDate=moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
            axios.post('/matchs/date-range',{
                
                    startDate:startDate,
                    endDate:endDate
                
            }).then((res)=>{ 
                if(res.status===201)
                {
                    const ms:Match[]=res.data.map((match:Response,index:number) => {
                        const matchObj :Match = {
                            id:match.id,
                            team1: match.homeTeam.name,
                            team2: match.awayTeam.name,
                            date: match.dateTime,
                            time:match.dateTime,
                            stadium: match.matchVenue.name,
                            ref:match.mainReferee,
                            first:match.firstLinesman,
                            second:match.secondLinesman,
                            logo1:match.homeTeam.logo,
                            logo2:match.awayTeam.logo,
                            };
                        return matchObj;
                    }
                    );

                    setMatches(ms);  
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
            startDate = moment(new Date()).format('YYYY-MM-DD');
            endDate= moment(new Date(2100,1,1)).format('YYYY-MM-DD');
            axios.post('/matchs/date-range',{
                    startDate:moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
                    endDate:endDate
            }).then((res)=>{ 
                if(res.status===201)
                {
                    const ms:Match[]=res.data.map((match:Response,index:number) => {
                        const matchObj :Match = {
                            id:match.id,
                            team1: match.homeTeam.name,
                            team2: match.awayTeam.name,
                            date: match.dateTime,
                            time:match.dateTime,
                            stadium: match.matchVenue.name,
                            ref:match.mainReferee,
                            first:match.firstLinesman,
                            second:match.secondLinesman,
                            logo1:match.homeTeam.logo,
                            logo2:match.awayTeam.logo,
                            };
                        return matchObj;
                    }
                    );

                    setMatches(ms);  
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
        default:
            axios.get('/matchs').then((res)=>{
                if(res.status===200)
                {
                    const ms:Match[]=res.data.map((match:Response,index:number) => {
                        const matchObj :Match = {
                            id:match.id,
                            team1: match.homeTeam.name,
                            team2: match.awayTeam.name,
                            date: match.dateTime,
                            time:match.dateTime,
                            stadium: match.matchVenue.name,
                            ref:match.mainReferee,
                            first:match.firstLinesman,
                            second:match.secondLinesman,
                            logo1:match.homeTeam.logo,
                            logo2:match.awayTeam.logo,
                            };
                        return matchObj;
                    }
                    );

                    setMatches(ms);  
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
    setDummy(!dummy)
    }, [])

    return (
        <Container>
            <Filter/>
            {
                matches.map((match,index) => {
                    return <>
                    <PopUpMatch match={match} key={match.id.toString()+idx.toString()} index={match.id} state={state}/>
                    <Card key={match.id.toString()+idx.toString()} team={teams[index]} index={match.id} match={match} state={state}/>
                </>
                })
            }
        </Container>
    );
}