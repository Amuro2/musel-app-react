import React from "react";
import PropTypes from "prop-types";

import InputForm from "./InputForm";
import SongLoopForm from "./SongLoopForm";
import SongFileForm from "./SongFileForm";

const SongForm = ({
  id,
  title,
  setTitle,
  loopStart,
  setLoopStart,
  loopDuration,
  setLoopDuration,
  loopEnd,
  setLoopEnd,
  fileDuration,
  setFileDuration,
  file,
  setFile,

  songFileArrayBuffer,
  setSongFileArrayBuffer,

  handleSubmit,
  initialParamsType,
}) => {
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <div className="flex flex-col gap-8">
      <InputForm
        label="Title"
        type="text"
        className="text-black sm:w-[34.9375rem]"
        value={title}
        onChange={handleTitleChange}
      />

      <SongLoopForm
        loopStart={loopStart}
        setLoopStart={setLoopStart}
        loopDuration={loopDuration}
        setLoopDuration={setLoopDuration}
        loopEnd={loopEnd}
        setLoopEnd={setLoopEnd}
        fileDuration={fileDuration}

        initialParamsType={initialParamsType}
      />

      <SongFileForm
        file={file}
        fileDuration={fileDuration}
        setFile={setFile}
        setFileDuration={setFileDuration}

        setSongFileArrayBuffer={setSongFileArrayBuffer}
      />

      <div>
        <button className="p-2 bg-white text-black" onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

SongForm.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  loopStart: PropTypes.number.isRequired,
  setLoopStart: PropTypes.func.isRequired,
  loopDuration: PropTypes.number.isRequired,
  setLoopDuration: PropTypes.func.isRequired,
  loopEnd: PropTypes.number.isRequired,
  setLoopEnd: PropTypes.func.isRequired,
  fileDuration: PropTypes.number.isRequired,
  setFileDuration: PropTypes.func.isRequired,
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,

  songFileArrayBuffer: PropTypes.object,
  setSongFileArrayBuffer: PropTypes.func.isRequired,

  handleSubmit: PropTypes.func.isRequired,
  initialParamsType: PropTypes.number.isRequired,
};

export default SongForm;
