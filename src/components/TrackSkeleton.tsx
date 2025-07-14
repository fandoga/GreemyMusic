const TrackSkeleton = () => {
    return (
        <div className="playlist__item">
            <div className="playlist__track">
                <div className="track__title">
                    <div className="track__title-image"></div>
                    <div className="track__title-text skeleton__text"></div>
                </div>
                <div className="track__author skeleton__text"></div>
                <div className="track__album skeleton__text"></div>
            </div>
        </div>
    );
}

export default TrackSkeleton