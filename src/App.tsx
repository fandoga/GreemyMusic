import React from 'react';
import './App.css';
import Bar from './components/Bar';
import Nav from './components/Nav';
import Center from './components/Center';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Center />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;
