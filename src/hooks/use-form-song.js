import { useState } from "react";

function useFormSong() {
  const [ id, setId ] = useState(undefined);
  const [ title, setTitle ] = useState("");
  const [ loopStart, setLoopStart ] = useState(0);
  const [ loopDuration, setLoopDuration ] = useState(0);
  const [ loopEnd, setLoopEnd ] = useState(0);
  const [ fileDuration, setFileDuration ] = useState(0);
  const [ file, setFile ] = useState(null);

  const song = {
    id,
    title,
    loopStart,
    loopDuration,
    loopEnd,
    fileDuration,
    file,
  };

  return {
    id,
    setId,

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

    song,
  };
}

export default useFormSong;
