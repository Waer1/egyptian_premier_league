import React from 'react';
import './App.css';
import ResponsiveAppBar from './Components/nav';
import Order from './Components/Order/Order';
import { Container } from './style';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar state={2}/>
      <Container>
        <Order/>
        <Home/>
      </Container>
    </div>
  );
}

export default App;
