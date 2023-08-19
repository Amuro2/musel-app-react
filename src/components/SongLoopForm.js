import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  DURATION,
  START_END,
  START_DURATION,
  DURATION_END,
} from "../constants/loop-params-types";

import InputForm from "./InputForm";

const SongLoopForm = ({
  loopStart,
  setLoopStart,
  loopDuration,
  setLoopDuration,
  loopEnd,
  setLoopEnd,
  fileDuration,

  initialParamsType = DURATION,
}) => {
  const [ paramsType, setParamsType ] = useState(initialParamsType);

  const loopStartDisabled = ![START_END, START_DURATION].includes(paramsType);
  const loopDurationDisabled = ![DURATION, START_DURATION, DURATION_END].includes(paramsType);
  const loopEndDisabled = ![START_END, DURATION_END].includes(paramsType);

  useEffect(() => {
    if(paramsType === DURATION) {
      setLoopStart(0);
      setLoopDuration(fileDuration);
      setLoopEnd(fileDuration);
    }
  }, [paramsType, fileDuration,
    setLoopStart, setLoopDuration, setLoopEnd,
  ]);

  function handleLoopStartChange(event) {
    const loopStart = Number(event.target.value);

    if(paramsType === START_END) {
      setLoopStart(loopStart);
      setLoopDuration(loopEnd - loopStart);
    }

    else if(paramsType === START_DURATION) {
      setLoopStart(loopStart);
      setLoopEnd(loopStart + loopDuration);
    }

    else {
      throw new Error("Should not be able to change loop start");
    }
  }

  function handleLoopDurationChange(event) {
    const loopDuration = Number(event.target.value);

    if(paramsType === DURATION) {
      setLoopDuration(loopDuration);
      setLoopStart(fileDuration - loopDuration);
      setLoopEnd(fileDuration);
    }

    else if(paramsType === START_DURATION) {
      setLoopDuration(loopDuration);
      setLoopEnd(loopStart + loopDuration);
    }

    else if(paramsType === DURATION_END) {
      setLoopDuration(loopDuration);
      setLoopStart(loopEnd - loopDuration);
    }

    else {
      throw new Error("Should not be able to change loop duration");
    }
  }

  function handleLoopEndChange(event) {
    const loopEnd = Number(event.target.value);

    if(paramsType === START_END) {
      setLoopEnd(loopEnd);
      setLoopDuration(loopEnd - loopStart);
    }

    else if(paramsType === DURATION_END) {
      setLoopEnd(loopEnd);
      setLoopStart(loopEnd - loopDuration);
    }

    else {
      throw new Error("Should not be able to change loop end");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div>
          <span>Parameter Configuration</span>
        </div>

        <select className="text-black" value={paramsType} onChange={event => setParamsType(Number(event.target.value))}>
          <option value={DURATION}>Loop Duration</option>
          <option value={START_END}>Loop Start + End</option>
          <option value={START_DURATION}>Loop Start + Duration</option>
          <option value={DURATION_END}>Loop Duration + End</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <InputForm
          label="Loop Start"
          type="number"
          className="text-black"
          disabled={loopStartDisabled}
          value={loopStart}
          onChange={handleLoopStartChange}
        />

        <InputForm
          label="Loop Duration"
          type="number"
          className="text-black"
          disabled={loopDurationDisabled}
          value={loopDuration}
          onChange={handleLoopDurationChange}
        />

        <InputForm
          label="Loop End"
          type="number"
          className="text-black"
          disabled={loopEndDisabled}
          value={loopEnd}
          onChange={handleLoopEndChange}
        />
      </div>
    </div>
  );
};

SongLoopForm.propTypes = {
  loopStart: PropTypes.number.isRequired,
  setLoopStart: PropTypes.func.isRequired,
  loopDuration: PropTypes.number.isRequired,
  setLoopDuration: PropTypes.func.isRequired,
  loopEnd: PropTypes.number.isRequired,
  setLoopEnd: PropTypes.func.isRequired,
  fileDuration: PropTypes.number.isRequired,

  initialParamsType: PropTypes.number,
};

export default SongLoopForm;
