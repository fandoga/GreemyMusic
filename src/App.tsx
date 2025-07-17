import React, { useEffect, useState } from 'react';
import { LoadingContext } from './LoadingContext';
import './App.css';
import AppRoutes from './routes';

function App() {

  const [loading, setLoading] = useState(true);
  const clientId = '5de0e892cfa54797a83e15261b1dadae';
  const clientSecret = 'ea627852a76640508c1dd1991aa02523';
  const credentials = btoa(`${clientId}:${clientSecret}`);

  useEffect(() => {
    // fetch('https://accounts.spotify.com/api/token', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': `Basic ${credentials}`,
    //   },
    //   body: 'grant_type=client_credentials'
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     localStorage.setItem('access-token', data.access_token)
    //   });

    // fetch("https://api.spotify.com/v1/search?q=drake&type=track", {
    //   headers: {
    //     Authorization: "Bearer BQCmNhKUWop6uX6tK0qU-thLPjaqwYGErp9KSRaBRUxidZo4Ogfvhkpg3RCljelAn79Nksq4zTBlnAVyMHf9G_WnEjEK6W5isnfq0p7XBHbfZEkP7hqZTAoWmAkwXgsX2gOsf2k6rvY"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   })

    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [])


  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh-token');
    const expiresIn = localStorage.getItem('expires-in');

    if (!refreshToken || !expiresIn) return;

    const refreshAccessToken = async () => {
      const res = await fetch('/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('access-token', data.access_token);
        localStorage.setItem('expires-in', data.expires_in);
        console.log('🎉 Token refreshed');
      } else {
        console.error('Failed to refresh token:', data);
      }
    };

    // Обновим токен за 1 минуту до истечения
    const timeout = setTimeout(refreshAccessToken, (Number(expiresIn) - 60) * 1000);

    return () => clearTimeout(timeout);
  }, []);



  return (
    <LoadingContext.Provider value={loading}>
      <div className={`wrapper ${loading ? "loading" : ""}`}>
        <AppRoutes />
      </div>
    </LoadingContext.Provider >
  );

}

export default App; 
