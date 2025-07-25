import { useState } from "react";

interface ProgressBarProps {
    duration: number
    currentTime: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, currentTime }) => {
    const [currentTimes, setCurrentTime] = useState(70);

    return (
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

    );
}

export default ProgressBar