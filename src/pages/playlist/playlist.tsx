import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Center from "../../components/Center";
import Sidebar from "../../components/Sidebar";
import Bar from "../../components/Bar";

const Playlist = () => {

    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch('data/playlist.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTracks(data)
                setLoading(false)
            });
    }, []);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center title="Мой плейлист" tracks={tracks} />
                <Sidebar />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Playlist;