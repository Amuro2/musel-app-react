import { useCallback, useEffect, useState } from "react";

function boundTime(unboundedTime, start, end) {
  if(unboundedTime < start) {
    return unboundedTime;
  } else if(Number(start) === Number(end)) {
    return start;
  } else {
    return (unboundedTime - start) % (end - start) + start;
  }
}

function useAudioContext(
  songFileArrayBuffer,
  volume,
  loopStart,
  loopEnd,
  isPlaying,
) {
  const [ audioContext, setAudioContext ] = useState(null);
  const [ gainNode, setGainNode ] = useState(null);
  const [ bufferSource, setBufferSource ] = useState(null);
  const [ audioBuffer, setAudioBuffer ] = useState(null);

  const [ isDecodingAudioBuffer, setIsDecodingAudioBuffer ] = useState(false);

  const [ audioContextStartTime, setAudioContextStartTime ] = useState(0);
  const [ startedAt, setStartedAt ] = useState(0);
  const [ startTime, setStartTime ] = useState(0);

  const [ time, setTime ] = useState(0);

  const [ , setIsTimeLive ] = useState(false);

  const hasAudio = !!audioBuffer;

  // Decodes audio data.
  useEffect(() => {
    setAudioBuffer(null);

    setTime(0);
    setStartTime(0);

    if(songFileArrayBuffer) {
      const bytes = songFileArrayBuffer.slice(0, songFileArrayBuffer.byteLength);

      const audioContext = new AudioContext();

      const gainNode = audioContext.createGain();

      gainNode.connect(audioContext.destination);

      setIsDecodingAudioBuffer(true);

      let usesResult = true;

      audioContext.decodeAudioData(bytes, (audioBuffer) => {
        if(usesResult) {
          setAudioBuffer(audioBuffer);

          setIsDecodingAudioBuffer(false);
        }
      });

      setGainNode(gainNode);
      setAudioContext(audioContext);

      return () => {
        usesResult = false;

        audioContext.close();
      };
    }

    else {
      setAudioContext(null);
      setGainNode(null);
    }
  }, [songFileArrayBuffer]);

  // Sets an interval to update the value of time.
  useEffect(() => {
    if(audioContext && audioContext.state !== "closed" && isPlaying && !isDecodingAudioBuffer) {
      setIsTimeLive(true);

      const timeInterval = setInterval(() => {
        const audioContextCurrentTimeDiff = audioContext.currentTime - audioContextStartTime;
        const unboundedTime = startedAt + audioContextCurrentTimeDiff;
        const time = boundTime(unboundedTime, loopStart, loopEnd);

        setTime(time);
      }, 16);

      return () => {
        clearInterval(timeInterval);

        setIsTimeLive(false);
      };
    }
  }, [
    audioContext,
    loopStart,
    loopEnd,
    startedAt,
    audioContextStartTime,
    isPlaying,
    isDecodingAudioBuffer,
  ]);

  // Pauses / resumes audio based on the value of isPlaying.
  useEffect(() => {
    if(audioContext && audioContext.state !== "closed") {
      if(isPlaying) {
        audioContext.resume();
      } else {
        audioContext.suspend();
      }
    }
  }, [isPlaying, audioContext]);

  // Updates volume when volume / gainNode is changed.
  useEffect(() => {
    if(gainNode) {
      gainNode.gain.value = volume;
    }
  }, [volume, gainNode]);

  // Creates bufferSource when decoding a new audio data / restarting at a specific time.
  useEffect(() => {
    if(audioContext && audioContext.state !== "closed" && audioBuffer && gainNode && isPlaying) {
      const bufferSource = audioContext.createBufferSource();

      bufferSource.buffer = audioBuffer;

      bufferSource.connect(gainNode);

      bufferSource.loop = true;

      bufferSource.start(0, startTime);
      setAudioContextStartTime(audioContext.currentTime);
      setStartedAt(startTime);

      setBufferSource(bufferSource);

      return () => {
        bufferSource.stop();
      };
    }

    else {
      setBufferSource(null);
    }
  }, [
    audioBuffer,
    startTime,
    audioContext, gainNode,
    isPlaying,
  ]);

  // Updates bufferSource's loopStart property.
  useEffect(() => {
    if(bufferSource) {
      bufferSource.loopStart = loopStart;
    }
  }, [bufferSource, loopStart]);

  // Updates bufferSource's loopEnd property.
  useEffect(() => {
    if(bufferSource) {
      bufferSource.loopEnd = loopEnd;
    }
  }, [bufferSource, loopEnd]);

  // Start the song at a specific time, adjusted to the boundaries of the loop.
  const start = useCallback((startTime) => {
    setStartTime(boundTime(startTime, loopStart, loopEnd));
  }, [loopStart, loopEnd]);

  return {
    time,
    setTime,
    start,
    hasAudio,
  };
}

export default useAudioContext;
