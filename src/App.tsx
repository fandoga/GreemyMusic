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

    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [])


  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    async function refreshAccessToken() {
      const refreshToken = localStorage.getItem('refresh-token');
      if (!refreshToken) return;

      const res = await fetch('/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('access-token', data.access_token);
        localStorage.setItem('expires-in', data.expires_in); // если сервер возвращает expires_in (в секундах)
        console.log('🎉 Token refreshed');
      } else {
        // refresh token невалиден — разлогинь пользователя
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        window.location.href = '/login';
      }
    }

    // Проверяем токен каждый час (3600 секунд = 1 час)
    intervalId = setInterval(() => {
      refreshAccessToken();
    }, 60 * 60 * 1000); // 1 час

    refreshAccessToken();

    return () => clearInterval(intervalId);
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
