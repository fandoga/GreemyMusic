import React, { useState, useEffect, useRef } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';
import TrackData from "./TrackData";


const Main = () => {
    const [currentTrack, setCurrentTrack] = useState<TrackData>();
    const [loading, setLoading] = useState(false);
    let adaptedTracks
    const [tracks, setTracks] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 50;

    const loadTracks = async () => {
        const accessToken = localStorage.getItem('access-token');
        setLoading(true);
        const res = await fetch(
            `https://api.spotify.com/v1/playlists/3xMQTDLOIGvj3lWH5e5x6F/tracks?limit=${limit}&offset=${offset}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        setTracks(prev => [...prev, ...data.items]);
        setOffset(prev => prev + limit);
        setLoading(false);
        if (!data.next) setHasMore(false);
    };

    useEffect(() => {
        loadTracks();
    }, []);



    adaptedTracks = tracks.map(item => {
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
    console.log(tracks);
    console.log(adaptedTracks);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center
                    title="Главная"
                    tracks={adaptedTracks}
                    loading={loading}
                    onTrackSelect={setCurrentTrack}
                />
                <Sidebar />
            </main>
            {currentTrack && (
                <Bar track={currentTrack} />
            )}
            <footer className="footer"></footer>
        </div>
    );
}

export default Main; 
