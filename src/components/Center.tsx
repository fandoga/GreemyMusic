import React, { useEffect } from "react";
import FilterBar from "./FilterBar";
import Searchbar from "./Searchbar";
import Track from "./Track";
import TrackSkeleton from "./TrackSkeleton";
import TrackData from "../pages/main/TrackData";


interface CenterProps {
    loading?: boolean;
    title: string;
    tracks: TrackData[];
    loaderRef?: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>;
    onTrackSelect?: (track: TrackData) => void
}

const Center: React.FC<CenterProps> = ({ title, tracks, loading, loaderRef, onTrackSelect }) => {


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
                                {...track}
                                onSelect={() => onTrackSelect && onTrackSelect(track)}
                            />
                        ))}
                    <div ref={loaderRef} style={{ height: 1 }}></div>
                </div>
            </div>
        </div>
    );
}

export default Center;