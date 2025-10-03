

interface ProgressBarProps {
    duration: number
    currentTime: number
    onChangeTime: (time: number) => void
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, currentTime, onChangeTime }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value)
        onChangeTime(newTime)
    }

    function formatSeconds(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${String(secs).padStart(2, "0")}`;
      }
    return (
        <>
            <div className="track-time">{formatSeconds(duration)}</div>
            <input
                className="bar__player-progress"
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                step={0.01}
                onChange={handleChange}
                color="#ff0000"
            />
        </>
    );
}

export default ProgressBar