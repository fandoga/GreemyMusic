import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Center from "../../components/Center";
import Bar from "../../components/Bar";
import { useParams } from "react-router-dom";
import { usePlaylist } from "../../context/PlaylistContext";
import TrackData from "../main/TrackData";

const Picks = () => {
    const [currentTrack, setCurrentTrack] = useState<TrackData>();
    const { picksPlaylists } = usePlaylist()
    const [title, setTitle] = useState<string>("")
    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    let adaptedTracks

    useEffect(() => {
        setLoading(true)
        const num = Number(id)
        const playlist = picksPlaylists[num].data
        console.log(playlist);
        setTitle(playlist.name)
        setTracks(playlist.tracks.items)

        return (
            setLoading(false)
        )
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

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center
                    title={title}
                    tracks={adaptedTracks}
                    loading={loading}
                    onTrackSelect={setCurrentTrack}
                />
            </main>
            {currentTrack && (
                <Bar track={currentTrack} />
            )}
            <footer className="footer"></footer>
        </div>
    );
}

export default Picks;