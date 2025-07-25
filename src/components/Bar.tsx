import React, { useRef, useState } from "react";
import BarSkeleton from "./BarSkeleton"
import { useLoading } from "../context/LoadingContext";
import TrackData from "../pages/main/TrackData";
import ProgressBar from "./ProgressBar";


interface BarProps {
    state?: boolean
    track?: TrackData;
}

const Bar: React.FC<BarProps> = ({ state, track }) => {
    const [currentVolume, setVolume] = useState(50)
    const volume = Number(currentVolume)
    const loading = useLoading();
    const audioRef = useRef<any>(null);
    const [isPlaying, setPlaying] = useState(false);
    const [isRepeated, setRepeat] = useState(false);

    const PlayHandle = () => {
        audioRef.current.play()
        setPlaying(true)
    }

    const StopHandle = () => {
        audioRef.current.pause()
        setPlaying(false)
    }

    const VolumeHandle = (newVolume: number) => {
        audioRef.current.volume = newVolume / 100
    }

    const RepeatHandle = () => {
        if (isRepeated) {
            setRepeat(false)
            audioRef.current.loop(false)
        } else {
            setRepeat(true)
            audioRef.current.loop(true)
        }
    }

    const togglePlay = isPlaying ? StopHandle : PlayHandle;

    if (loading || state) {
        return (
            <BarSkeleton />
        )
    }
    return (
        <>
            <audio controls ref={audioRef}>
                <source src="/audio/BLACKPINK.mp3" type="audio/mpeg" />
            </audio>

            <div className="bar">
                <div className="bar__content">
                    <ProgressBar duration={audioRef.current.duration()} currentTime={audioRef.current.currentTime()}></ProgressBar>
                    <div className="bar__player-block">
                        <div className="bar__player player">
                            <div className="player__controls">
                                <div className="player__btn-prev">
                                    <svg className="player__btn-prev-svg" >
                                        <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                                    </svg>
                                </div>
                                <div onClick={togglePlay} className="player__btn-play _btn">
                                    <svg className="player__btn-play-svg" >
                                        <use xlinkHref={isPlaying ? '/img/icon/sprite.svg#icon-pause' : '/img/icon/sprite.svg#icon-play'}></use>
                                    </svg>
                                </div>
                                <div className="player__btn-next">
                                    <svg className="player__btn-next-svg" >
                                        <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                                    </svg>
                                </div>
                                <div onClick={RepeatHandle} className="player__btn-repeat _btn-icon">
                                    <svg style={{ stroke: isRepeated ? '#d9d9d9' : '#696969' }} className="player__btn-repeat-svg">
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
                                <div className="volume__progress">
                                    <input
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            const value = Number(e.target.value)
                                            setVolume(value)
                                            VolumeHandle(value)
                                        }}
                                        className="volume__progress-line"
                                        type="range"
                                        name="range"
                                        // value={50}
                                        min={0}
                                        step={1}
                                        max={100}
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