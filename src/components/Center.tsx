import React, { useEffect } from "react";
import FilterBar from "./FilterBar";
import Searchbar from "./Searchbar";
import Track from "./Track";
import TrackSkeleton from "./TrackSkeleton";

interface TrackData {
    Name: string;
    Author: string;
    Album: string;
    Time: string;
    Info: string;
}

interface CenterProps {
    loading?: boolean;
    title: string;
    tracks: TrackData[];
}

const Center: React.FC<CenterProps> = ({ title, tracks, loading }) => {




    return (
        <div className="main__centerblock centerblock">
            <Searchbar />
            <h2 className="centerblock__h2">{title}</h2>
            <FilterBar />
            <div className="centerblock__content">
                <div className="content__title playlist-title">
                    <div className="playlist-title__col col01">Трек</div>
                    <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
                    <div className="playlist-title__col col03">АЛЬБОМ</div>
                    <div className="playlist-title__col col04">
                        <svg className="playlist-title__svg" >
                            <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                        </svg>
                    </div>
                </div>
                <div className="content__playlist playlist">
                    {loading
                        ? Array.from({ length: 10 }).map((_, i) => <TrackSkeleton key={i} />)
                        : tracks.map((track, idx) => (
                            <Track
                                key={idx}
                                Name={track.Name}
                                Author={track.Author}
                                Album={track.Album}
                                Time={track.Time}
                                Info={track.Info}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Center;