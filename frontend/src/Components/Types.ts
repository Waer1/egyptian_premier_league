export type Teams = {
    id:number;
    team1: string;
    team2: string;
    date: Date;
    logo1: string;
    logo2: string;
}
export type Team = {
    id:number;
    name: string;
    logo: string;
}
export type Match = {
    id:number;
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
export type User={
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    role:string;
    address:string;
    city:string;
    dateOfBirth:Date;
    gender:string;
    userName:string;
}
export type UserInfo={
    id:number,
    userName:string,
    password:string,
    firstName:string,
    lastName:string,
    email:string,
    gender:string,
    role:string,
    city:string,
    dateOfBirth:Date,
    address:string
}
export type Ticket={
    seatRaw: number;
    seatColum: number;
    reservationTime: Date;
    match: Match;
  
  }
export type Coordinates = [number, number]; // [row, column]
