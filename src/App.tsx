import React, { useEffect, useState } from 'react';
import { LoadingContext } from './LoadingContext';
import './App.css';
import Bar from './components/Bar';
import Nav from './components/Nav';
import Center from './components/Center';
import Sidebar from './components/Sidebar';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [])



  return (
    <LoadingContext.Provider value={loading}>
      <div className={`wrapper ${loading ? "loading" : ""}`}>
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
    </LoadingContext.Provider >
  );
}

export default App; 
