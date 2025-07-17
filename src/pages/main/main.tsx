import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';

const Main = () => {

    const [loading, setLoading] = useState(false);
    const [RecommendedTracks, setRecommendedTracks] = useState<any[]>([]);
    let adaptedTracks

    useEffect(() => {
        const Recommendations = async () => {

            const accessToken = localStorage.getItem('access-token');
            setLoading(true)
            const res = await fetch(
                `https://api.spotify.com/v1/playlists/1vCsCr74SWGrwv3RMNcBPg/tracks?limit=20`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const data = await res.json();
            setLoading(false)
            setRecommendedTracks(data.items)
        };

        Recommendations()

    }, []);

    adaptedTracks = RecommendedTracks.map(item => {
        const track = item.track;
        return {
            Img: track.album.images[2].url,
            Name: track.name,
            Author: track.artists.map((a: any) => a.name).join(', '),
            Album: track.album.name,
            Time: Math.floor(track.duration_ms / 60000) + ':' + String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0'),
            Info: '',
        };
    });
    console.log(RecommendedTracks);
    console.log(adaptedTracks);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center title="Треки" tracks={adaptedTracks} loading={loading} />
                <Sidebar />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Main; 
