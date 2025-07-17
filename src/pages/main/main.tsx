import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';

const Main = () => {

    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("data/recomendations.json")
            .then(res => res.json())
            .then(data => {
                setTracks(data)
                setLoading(false)
            });
        console.log(tracks);
    }, []);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center title="Треки" tracks={tracks} loading={loading} />
                <Sidebar />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Main; 
