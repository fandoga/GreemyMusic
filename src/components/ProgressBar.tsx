

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

    return (
        <>
            <div className="track-time">{duration}</div>
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