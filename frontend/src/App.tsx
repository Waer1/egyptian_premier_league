import React from 'react';
import './App.css';
import ResponsiveAppBar from './Components/nav';
import Order from './Components/Order/Order';
import { Container } from './style';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import moment from 'moment';
import dayjs from 'dayjs';
import Users from './Components/Users/Users';
import Pending from './Components/Pending/Pending';
import Reservation from './Components/Reservations/Reservations';

type UserInfo={
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
type User={
  userName:string,
  firstName:string,
  lastName:string,
  email:string,
  role:string,
}
type PendingUser={
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
const PendingList:PendingUser[]=[{
  firstName:"Ahmed",
  lastName:"Hosny",
  email:"eng.ahmedhosny2024@gmail.com",
  role:"fan",
  address:"Masr el gadeda",
  city:"Cairo",
  dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
  gender:'male',
  userName:"AhmedHosny2024"
},
{
  firstName:"Ahmed",
  lastName:"Hosny",
  email:"eng.ahmedhosny2024@gmail.com",
  role:"fan",
  address:"Masr el gadeda",
  city:"Cairo",
  dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
  gender:'male',
  userName:"AhmedHosny2024"
}
]
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
const tickets:Ticket[]=[
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
const users:User[]=[
  {
    userName:"AhmedHosny2024",
    firstName:"Ahmed",
    lastName:"Hosny",
    email:"eng.ahmedhosny2024@gmail.com",
    role:"fan",
  },
  {
    userName:"AhmedHosny20",
    firstName:"Ahmed20",
    lastName:"Hosny20",
    email:"eng.ahmedhosny2020@gmail.com",
    role:"fan",
  },
  {
    userName:"AhmedHosny10",
    firstName:"Ahmed10",
    lastName:"Hosny10",
    email:"eng.ahmedhosny1010@gmail.com",
    role:"fan",
  },
]
const user:UserInfo={
    userName:"AhmedHosny2024",
    password:"123456789",
    firstName:"Ahmed",
    lastName:"Hosny",
    email:"eng.ahemdhosny2024@gmail.com",
    gender:"male",
    role:"Fan",
    city:"Cairo",
    dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
    address:"Masr el gadeda"
}


function App() {
  return (
    <Router>
      <div className="App">
                  
      <ResponsiveAppBar state={1}/>
      
      <Routes>
        <Route path="/" element={<>
          <Container>
            <Order/>
            <Home state={1}/>
          </Container>

          </>
        } />

        <Route path="/profile" element={<>
          <Profile user={user}/>
          </>
        } />
        <Route path="/Users" element={<>
          <Users users={users}/>
          </>
        } />
        <Route path="/Pending" element={<>
          <Pending users={PendingList}/>
          </>
        } />
        <Route path="/reservation" element={<>
          <Reservation tickets={tickets}/>
          </>
        } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
