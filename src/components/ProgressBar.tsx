import { useState } from "react";

const ProgressBar = () => {
    const [currentTime, setCurrentTime] = useState(70);
    const duration = 230;

    return (
        <div className="progress__bar">
            <input
                className="bar__player-progress"
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                step={0.01}
                onChange={(e: any) => setCurrentTime(e.target.value)}
                color="#ff0000"
            />
        </div>
    );
}

export default ProgressBar