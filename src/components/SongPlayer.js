import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useAudioContext from "../hooks/use-audio-context";

import Timestamp from "./Timestamp";

const KEY_K = 75;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;

const SongPlayer = ({
  fileDuration,
  loopStart,
  loopEnd,
  songFileArrayBuffer,
  playsOnLoad = true,
}) => {
  const [ volume, setVolume ] = useState(1);

  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isTimeMouseControlled, setIsTimeMouseControlled ] = useState(false);
  const [ isTimeKeyControlled, setIsTimeKeyControlled ] = useState(false);

  const timeStep = isTimeKeyControlled ? 1 : 0.001;

  const isTimeControlled = isTimeMouseControlled || isTimeKeyControlled;
  const isActuallyPlaying = isPlaying && !isTimeControlled;

  const {
    time,
    setTime,
    start,
    hasAudio,
  } = useAudioContext(
    songFileArrayBuffer,
    volume,
    loopStart,
    loopEnd,
    isActuallyPlaying,
  );

  useEffect(() => {
    if(hasAudio) {
      if(playsOnLoad) {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(false);
    }
  }, [hasAudio, playsOnLoad]);

  useEffect(() => {
    if(hasAudio) {
      function onKeyDown(event) {
        if(event.keyCode === KEY_K) {
          setIsPlaying(!isPlaying);
        }
      }

      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isPlaying, hasAudio]);

  function handleVolumeChange(event) {
    setVolume(Number(event.target.value));
  }

  function handleTimeMouseDown() {
    window.getSelection().removeAllRanges();

    setIsTimeMouseControlled(true);
  }

  function handleTimeMouseUp(event) {
    setIsTimeMouseControlled(false);

    start(Number(event.target.value));
  }

  function handleTimeKeyDown(event) {
    if([KEY_ARROW_LEFT, KEY_ARROW_RIGHT].includes(event.keyCode)) {
      setIsTimeKeyControlled(true);
    }
  }

  function handleTimeKeyUp(event) {
    if([KEY_ARROW_LEFT, KEY_ARROW_RIGHT].includes(event.keyCode)) {
      setIsTimeKeyControlled(false);

      start(Number(event.target.value));
    }
  }

  function handleTimeChange(event) {
    setTime(Number(event.target.value));
  }

  async function handlePlayClick() {
    if(hasAudio) {
      setIsPlaying(true);
    }
  }

  function handlePauseClick() {
    setIsPlaying(false);
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-2">
        <span className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
          </svg>
        </span>

        <input type="range" value={volume} min="0" max="1" step="0.01" onChange={handleVolumeChange} />

        <span>{volume}</span>
      </div>

      <div className="flex items-center gap-2">
        <div>
          {isActuallyPlaying ? (
            <span className="cursor-pointer" onClick={handlePauseClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            </span>
          ) : (
            <span className="cursor-pointer" onClick={handlePlayClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </span>
          )}
        </div>

        <div className="grow">
          <div>
            <Timestamp time={time} max={fileDuration} />

            <span> / </span>

            <Timestamp time={fileDuration} />
          </div>

          <div>
            <input
              type="range"
              className="w-full"
              value={time}
              min="0"
              max={fileDuration}
              step={timeStep}
              onMouseDown={handleTimeMouseDown}
              onMouseUp={handleTimeMouseUp}
              onKeyDown={handleTimeKeyDown}
              onKeyUp={handleTimeKeyUp}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

SongPlayer.propTypes = {
  fileDuration: PropTypes.number.isRequired,
  loopStart: PropTypes.number.isRequired,
  loopEnd: PropTypes.number.isRequired,
  songFileArrayBuffer: PropTypes.instanceOf(ArrayBuffer),
  playsOnLoad: PropTypes.bool,
};

export default SongPlayer;
