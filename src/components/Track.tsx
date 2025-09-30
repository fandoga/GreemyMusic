import { useLoading } from "../context/LoadingContext";
import React from "react";
import TrackSkeleton from "./TrackSkeleton";
import TrackData from "../pages/main/TrackData";
import { useAppSelector } from "../hooks/redux";


interface TrackProps extends TrackData {
    onSelect?: () => void;
}
// { payload: any; type: "track/setCurrentTrack"; }

const Track: React.FC<TrackProps> = ({ Img, Name, Album, Author, Time, Info, onSelect }) => {
    const loading = useLoading();
    const { currentTrack } = useAppSelector(state => state.trackReducer)

    if (loading) {
        return (
            <TrackSkeleton />
        )
    }

    return (
        <div className="playlist__item">
            <div onClick={(onSelect)} className="playlist__track track">
                <div className="track__title">
                    <div className="track__title-image">
                        <img className={currentTrack.Name === Name ? 'track-image-active' : ''} src={Img} alt="" />
                    </div>
                    <div className="track__title-text">
                        <a className="track__title-link" href="http://">
                            {Name && Name.length > 38
                                ? Name.slice(0, 38) + "..." : Name || ""}
                            <span className="track__title-span"> {Info}</span></a>
                    </div>
                </div>
                <div className="track__author">
                    <a className="track__author-link" href="http://">{Author && Author.length > 35
                        ? Author.slice(0, 35) + "..." : Author || ""}</a>
                </div>
                <div className="track__album">
                    <a className="track__album-link" href="http://">{Album && Album.length > 38
                        ? Album.slice(0, 38) + "..." : Album || ""}</a>
                </div>
                <div className="track__time">
                    <svg className="track__time-svg" >
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                    <span className="track__time-text">{Time}</span>
                </div>
            </div>
        </div >
    );
}

export default Track;