import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';
import TrackData from "./TrackData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRecomendations } from "../../store/reducers/trackThunks";


const Main = () => {
    const dispatch = useAppDispatch()
    const { AllTracks } = useAppSelector(state => state.trackReducer)
    const [currentTrack, setCurrentTrack] = useState<TrackData>();
    const [loading, setLoading] = useState(false);
    let adaptedTracks
    const [tracks, setTracks] = useState<any[]>([]);
    const [searchTracks, setSearch] = useState<string>('');
    // const limit = 25;

    // const loadDefaultTracks = async () => {
    //     const accessToken = localStorage.getItem('access-token');
    //     const res = await fetch(
    //         `https://api.spotify.com/v1/playlists/3xMQTDLOIGvj3lWH5e5x6F/tracks?limit=${limit}`,
    //         { headers: { Authorization: `Bearer ${accessToken}` } }
    //     );
    //     const data = await res.json();
    //     setTracks(data.items || []);
    //     setLoading(false);
    // };

    const loadSearchTracks = async (query: string) => {
        if (!query.trim()) return;
        const accessToken = localStorage.getItem('access-token');
        const res = await fetch(
            `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(query)}&type=track`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        setTracks(data.tracks?.items || []);
        setLoading(false);
    };

    useEffect(() => {
        const query = searchTracks.trim();
        setLoading(true)
        const handler = setTimeout(() => {
            if (query === "") {
                dispatch(fetchRecomendations())
                setTracks(AllTracks.items || [])
                console.log(AllTracks.items);
            } else {
                loadSearchTracks(query);
            }
        }, 400);

        return () => {
            clearTimeout(handler)
        };
    }, [searchTracks]);

    adaptedTracks = (searchTracks.length === 0 ? tracks.map((item: any) => item.track) : tracks)
        .filter((track: any) => track && track.album)
        .map((track: any): TrackData => ({
            Img: track.album.images?.[2]?.url || "",
            ImgMed: track.album.images?.[1]?.url || "",
            ImgBig: track.album.images?.[0]?.url || "",
            Name: track.name,
            Status: { selected: false },
            Author: track.artists?.map((a: any) => a.name).join(', ') || "",
            Album: track.album.name,
            Time: Math.floor(track.duration_ms / 60000) + ':' + String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0'),
            Info: '',
        }));
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
                    searchTracks={setSearch}
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
