import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';

const Main = () => {

    const [loading, setLoading] = useState(true);
    const [LikedTracks, setLikedTracks] = useState([])
    const [RecommendedTracks, setRecommendedTracks] = useState<any[]>([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token');

        const fetchLiked = async () => {
            const res = await fetch('https://api.spotify.com/v1/me/tracks', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const data = await res.json();
            setLikedTracks(data.items.map((item: any) => item.track.id));
        };

        fetchLiked();
    }, [])

    const fetchRecommendations = async (seedIds: string[]) => {
        const accessToken = localStorage.getItem('access-token');
        const res = await fetch(`https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${seedIds.join(',')}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setRecommendedTracks((prev: any[]) => [...prev, ...data.tracks]);
        console.log(123);
    };

    console.log(RecommendedTracks);
    console.log(LikedTracks);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center title="Треки" tracks={RecommendedTracks} loading={loading} />
                <Sidebar />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Main; 
