import React, { useEffect } from 'react';
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





function App() {
  return (
    <Router>
      <div className="App">         
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<>
          <Container>
            <Order/>
            <Home />
          </Container>
          </>
        } />
        <Route path="/profile" element={<>
          <Profile/>
          </>
        } />
        <Route path="/Users" element={<>
          <Users/>
          </>
        } />
        <Route path="/Pending" element={<>
          <Pending />
          </>
        } />
        <Route path="/reservation" element={<>
          <Reservation />
          </>
        } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
