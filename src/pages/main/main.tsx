import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import Center from '../../components/Center';
import Sidebar from '../../components/Sidebar';
import TrackData from "./TrackData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRecomendations } from "../../store/reducers/track/trackThunks";
import { fetchSearchQuery } from "../../store/reducers/searchQuery/searchThunks";
import { trackSlice } from "../../store/reducers/track/trackSlice";


const Main = () => {
    const dispatch = useAppDispatch()
    const { AllTracks, isLoading } = useAppSelector(state => state.trackReducer)
    const { currentPlaylist } = useAppSelector(state => state.playlistReducer)
    const { startLoading } = trackSlice.actions
    const [currentTrack, setCurrentTrack] = useState<TrackData>();
    const [title, setTitle] = useState<string>("Главная")
    let adaptedTracks
    const [tracks, setTracks] = useState<any[]>([]);
    const [searchTracks, setSearch] = useState<string>('');

    // основные запросы для поиска и обновления плейлиста
    useEffect(() => {
        const query = searchTracks.trim();
        dispatch(startLoading())
        const handler = setTimeout(() => {
            if (query === "") {
                dispatch(fetchRecomendations({offset: 0, limit: 25}))
            } else {
                dispatch(fetchSearchQuery({offset: 0, limit: 25, query: query}))
            }
        }, 400);
        setTitle(currentPlaylist?.Name || "Главная")

        return () => {
            clearTimeout(handler)
        };
    }, [searchTracks, currentPlaylist]);

    // обновления списка треков
    useEffect(() => {
        setTracks(AllTracks || [])
            console.log(AllTracks);
    }, [AllTracks, searchTracks])

    //приведение треков к нужному виду
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


    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center
                    title={title}
                    tracks={adaptedTracks}
                    loading={isLoading}
                    onTrackSelect={setCurrentTrack}
                    searchTracks={setSearch}
                    query={searchTracks}
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
