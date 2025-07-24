import React, { useRef } from "react";
import BarSkeleton from "./BarSkeleton"
import { useLoading } from "../context/LoadingContext";
import TrackData from "../pages/main/TrackData";


interface BarProps {
    state?: boolean
    track?: TrackData;
}

const Bar: React.FC<BarProps> = ({ state, track }) => {
    const loading = useLoading();
    const audioRef = useRef<any>(null);

    const PlayHandle = () => {
        audioRef.current.play()
    }

    if (loading || state) {
        return (
            <BarSkeleton />
        )
    }

    return (
        <>
            <audio controls ref={audioRef}>
                <source src="/public/audio/BLACKPINK.mp3" type="audio/mp3" />
            </audio>

            <div className="bar">
                <div className="bar__content">
                    <div className="bar__player-progress"></div>
                    <div className="bar__player-block">
                        <div className="bar__player player">
                            <div className="player__controls">
                                <div className="player__btn-prev">
                                    <svg className="player__btn-prev-svg" >
                                        <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                                    </svg>
                                </div>
                                <div onClick={PlayHandle} className="player__btn-play _btn">
                                    <svg className="player__btn-play-svg" >
                                        <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                                    </svg>
                                </div>
                                <div className="player__btn-next">
                                    <svg className="player__btn-next-svg" >
                                        <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                                    </svg>
                                </div>
                                <div className="player__btn-repeat _btn-icon">
                                    <svg className="player__btn-repeat-svg">
                                        <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                                    </svg>
                                </div>
                                <div className="player__btn-shuffle _btn-icon">
                                    <svg className="player__btn-shuffle-svg" >
                                        <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                                    </svg>
                                </div>
                            </div>

                            <div className="player__track-play track-play">
                                <div className="track-play__contain">
                                    <div className="track-play__image">
                                        <img src={track?.ImgMed} alt="" />
                                    </div>
                                    <div className="track-play__author">
                                        <a className="track-play__author-link" href="http://"
                                        >{track?.Name}</a>
                                    </div>
                                    <div className="track-play__album">
                                        <a className="track-play__album-link" href="http://">{
                                            track?.Author && track.Author.length > 28
                                                ? track.Author.slice(0, 28) + "..."
                                                : track?.Author || ""}</a>
                                    </div>
                                </div>

                                <div className="track-play__like-dis">
                                    <div className="track-play__like _btn-icon">
                                        <svg className="track-play__like-svg">
                                            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                        </svg>
                                    </div>
                                    <div className="track-play__dislike _btn-icon">
                                        <svg className="track-play__dislike-svg" >
                                            <use
                                                xlinkHref="/img/icon/sprite.svg#icon-dislike"
                                            ></use>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bar__volume-block volume">
                            <div className="volume__content">
                                <div className="volume__image">
                                    <svg className="volume__svg">
                                        <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                                    </svg>
                                </div>
                                <div className="volume__progress _btn">
                                    <input
                                        className="volume__progress-line _btn"
                                        type="range"
                                        name="range"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default Bar;