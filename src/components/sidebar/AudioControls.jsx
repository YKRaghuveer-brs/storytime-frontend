import PropTypes from "prop-types";
import Play from "../../assets/player/Play.jsx";
import Pause from "../../assets/player/pause.jsx";
import Next from "../../assets/player/SkipNext.jsx";
import Prev from "../../assets/player/SkipPrev.jsx";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  playerType,
}) => (
  <div className={playerType}>
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Prev className="w-4" />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Play />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <Next />
    </button>
  </div>
);

AudioControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPauseClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  playerType: PropTypes.string.isRequired,
};

export default AudioControls;