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
const user:UserInfo={
    userName:"AhmedHosny2024",
    password:"123456789",
    firstName:"Ahmed",
    lastName:"Hosny",
    email:"eng.ahemdhosny2024@gmail.com",
    gender:"male",
    role:"fan",
    city:"Cairo",
    dateOfBirth:dayjs(moment(new Date("2000-01-01")).format('YYYY-MM-DD')).toDate(),
    address:"Masr el gadeda"
}
function App() {
  return (
    <Router>
      <div className="App">
                  
      <ResponsiveAppBar state={3}/>
      
      <Routes>
        <Route path="/" element={<>
          <Container>
            <Order/>
            <Home state={3}/>
          </Container>

          </>
        } />

        <Route path="/profile" element={<>
          <Profile user={user}/>
          </>
        } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
