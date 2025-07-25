import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Center from "../../components/Center";
import Bar from "../../components/Bar";
import { useParams } from "react-router-dom";

const Picks = () => {

    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    let title = ""
    let url = ""

    switch (id) {
        case '1':
            title = "Плейлист дня"
            url = "/data/picks1.json"
            break;
        case '2':
            title = "100 танцевальных хитов"
            url = "/data/picks2.json"
            break;
        case '3':
            title = "Инди заряд"
            url = "/data/picks3.json"
            break;

        default:
            break;
    }

    useEffect(() => {
        if (!url) return;
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTracks(data)
                setLoading(false)
            });
    }, [url]);

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <Center title={title} tracks={tracks} loading={loading} />
            </main>
            <Bar />
            <footer className="footer"></footer>
        </div>
    );
}

export default Picks;