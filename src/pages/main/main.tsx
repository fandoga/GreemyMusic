import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';

const Main = () => {

    const [loading, setLoading] = useState(true);
    const [RecommendedTracks, setRecommendedTracks] = useState<any[]>([]);

    useEffect(() => {
        const Recommendations = async (seedIds: string[]) => {

            const accessToken = localStorage.getItem('access-token');
            const res = await fetch(
                `https://api.spotify.com/v1/playlists/1vCsCr74SWGrwv3RMNcBPg/tracks?limit=20`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const data = await res.json();
            setRecommendedTracks(data)
        };

    }, []);


    console.log(RecommendedTracks);

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
