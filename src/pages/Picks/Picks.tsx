import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Center from "../../components/Center";
import Bar from "../../components/Bar";
import { useParams } from "react-router-dom";
import { usePlaylist } from "../../context/PlaylistContext";

const Picks = () => {
    const { picksPlaylists } = usePlaylist()
    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    let adaptedTracks

    const { id } = useParams();
    const num = Number(id)
    const playlist = picksPlaylists[num].data
    const title = playlist.name
    setTracks(playlist.tracks.items)

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

    useEffect(() => {
        console.log(picksPlaylists);
    }, []);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center title={title} tracks={adaptedTracks} loading={loading} />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Picks;