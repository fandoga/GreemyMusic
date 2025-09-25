import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';
import TrackData from "./TrackData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRecomendations } from "../../store/reducers/trackThunks";
import { trackSlice } from "../../store/reducers/trackSlice";


const Main = () => {
    const dispatch = useAppDispatch()
    const { AllTracks, isLoading } = useAppSelector(state => state.trackReducer)
    const { startLoading } = trackSlice.actions
    const [currentTrack, setCurrentTrack] = useState<TrackData>();
    let adaptedTracks
    const [tracks, setTracks] = useState<any[]>([]);
    const [searchTracks, setSearch] = useState<string>('');

    const loadSearchTracks = async (query: string) => {
        if (!query.trim()) return;
        const accessToken = localStorage.getItem('access-token');
        const res = await fetch(
            `https://api.spotify.com/v1/search?q=track:${encodeURIComponent(query)}&type=track`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        setTracks(data.tracks?.items || []);
    };

    useEffect(() => {
        const query = searchTracks.trim();
        dispatch(startLoading())
        const handler = setTimeout(() => {
            if (query === "") {
                dispatch(fetchRecomendations({offset: 0, limit: 25}))
            } else {
                loadSearchTracks(query);
            }
        }, 400);

        return () => {
            clearTimeout(handler)
        };
    }, [searchTracks]);

    useEffect(() => {
        if (searchTracks.trim() === "") {
            setTracks(AllTracks?.items || [])
            console.log(AllTracks);
        }
    }, [AllTracks, searchTracks])

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
                    loading={isLoading}
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
