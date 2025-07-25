import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Center from "../../components/Center";
import Sidebar from "../../components/Sidebar";
import Bar from "../../components/Bar";
import TrackData from "../main/TrackData";
import { usePlaylist } from "../../context/PlaylistContext";

const Playlist = () => {
    const [currentTrack, setCurrentTrack] = useState<TrackData>();
    const { playlistId } = usePlaylist();
    const { playlistTitle } = usePlaylist();
    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadTracks = async () => {

        const accessToken = localStorage.getItem('access-token');
        setLoading(true);
        const res = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId ? playlistId : localStorage.getItem("last-playlist")}/tracks`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        localStorage.setItem("last-playlist", playlistId)
        setTracks(data.items);
        setLoading(false);
    };

    useEffect(() => {
        loadTracks();
    }, [playlistId]);

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
                <Nav />
                <Center
                    title={playlistTitle}
                    loading={loading}
                    tracks={adaptedTracks}
                    onTrackSelect={setCurrentTrack} />
                <Sidebar />
            </main>
            {currentTrack && (
                <Bar track={currentTrack} />
            )}
            <footer className="footer"></footer>
        </div>
    );
}

export default Playlist;