import { time } from "console";
import React from "react";

interface TrackData {
    Name: string,
    Author: string,
    Album: string,
    Time: string;
    Info: string
}

const Track: React.FC<TrackData> = ({ Name, Album, Author, Time, Info }) => {
    return (
        <div className="playlist__item">
            <div className="playlist__track track">
                <div className="track__title">
                    <div className="track__title-image">
                        <svg className="track__title-svg" >
                            <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                        </svg>
                    </div>
                    <div className="track__title-text">
                        <a className="track__title-link" href="http://">
                            {Name}
                            <span className="track__title-span"> {Info}</span></a>
                    </div>
                </div>
                <div className="track__author">
                    <a className="track__author-link" href="http://">{Author}</a>
                </div>
                <div className="track__album">
                    <a className="track__album-link" href="http://">{Album}</a>
                </div>
                <div className="track__time">
                    <svg className="track__time-svg" >
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                    </svg>
                    <span className="track__time-text">{Time}</span>
                </div>
            </div>
        </div>
    );
}

export default Track;