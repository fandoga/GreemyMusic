import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Center from "../../components/Center";
import Sidebar from "../../components/Sidebar";
import Bar from "../../components/Bar";

const Playlist = () => {

    const [tracksId, setTracksId] = useState<string>("undefined");
    const [tracks, setTracks] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("Ваш плейлист");
    const [loading, setLoading] = useState(false);

    const loadTracks = async () => {
        console.log(tracksId);
        const accessToken = localStorage.getItem('access-token');
        setLoading(true);
        const res = await fetch(
            `https://api.spotify.com/v1/playlists/${tracksId}/`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        setTracks(data.items);
        setLoading(false);
    };

    useEffect(() => {
        loadTracks();
    }, []);

    const adaptedTracks = tracks.map(item => {
        const track = item.track;
        return {
            Img: track.album.images[2].url || "",
            ImgMed: track.album.images[1].url || "",
            ImgBig: track.album.images[0].url || "",
            Name: track.name,
            Author: track.artists.map((a: any) => a.name).join(', '),
            Album: track.album.name,
            Time: Math.floor(track.duration_ms / 60000) + ':' + String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0'),
            Info: '',
        };
    });

    return (
        <div className="container">
            <main className="main">
                <Nav setPlaylistId={setTracksId} />
                <Center title={title} loading={loading} tracks={adaptedTracks} />
                <Sidebar />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Playlist;