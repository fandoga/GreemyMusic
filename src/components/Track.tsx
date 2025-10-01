import { useLoading } from "../context/LoadingContext";
import React, { useEffect, useState } from "react";
import TrackSkeleton from "./TrackSkeleton";
import TrackData from "../pages/main/TrackData";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { trackSlice } from "../store/reducers/track/trackSlice";


interface TrackProps extends TrackData {
    onSelect?: () => void;
}
// { payload: any; type: "track/setCurrentTrack"; }

const Track: React.FC<TrackProps> = ({ Img, Name, Album, Author, Time, Info, onSelect }) => {
    const loading = useLoading();
    const dispatch = useAppDispatch()
    const { togglePlayingTrack } = trackSlice.actions
    const { currentTrack, isTrackPlaying } = useAppSelector(state => state.trackReducer)
    const [isSelected, setSelected] = useState<boolean>(false)
    
    useEffect(() => {
        currentTrack.Name === Name ? setSelected(true) : setSelected(false)
    }, [currentTrack])

    if (loading) {
        return (
            <TrackSkeleton />
        )
    }

    return (
        <div className="playlist__item">
            <div onClick={(onSelect)} className={`playlist__track track ${isSelected ? 'active' : ''}`}>
                <div className="track__title">
                    <div onClick={() => dispatch(togglePlayingTrack())} className={`track__title-image ${isSelected ? 'active' : ''} ${isTrackPlaying ? 'playing' : ''}`}>
                        <img src={Img} alt="" />
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