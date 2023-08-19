import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const SongFileForm = ({
  file,
  setFile,
  fileDuration,
  setFileDuration,

  setSongFileArrayBuffer,
}) => {
  const fileInputRef = useRef();

  const filename = file ? file.name : "No file selected";

  useEffect(() => {
    if(file) {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", function() {
        const audioContext = new AudioContext();

        setSongFileArrayBuffer(this.result.slice(0, this.result.byteLength));

        audioContext.decodeAudioData(this.result, function(audioBuffer) {
          setFileDuration(audioBuffer.duration);
        });
      });

      fileReader.readAsArrayBuffer(file);
    }
  }, [file, setSongFileArrayBuffer, setFileDuration]);

  useEffect(() => {
    function onDragover(event) {
      event.preventDefault();
    }

    function onDrop(event) {
      event.preventDefault();

      const musicFiles = Array.from(event.dataTransfer.files).filter((file) => {
        return file.type.match(/^audio\//) !== null;
      });

      if(musicFiles.length > 0) {
        setFile(musicFiles[0]);
      }
    }

    function onPaste(event) {
      const musicFiles = Array.from(event.clipboardData.items).filter((item) => {
        return item.type.match(/^audio\//) !== null;
      }).map((item) => {
        return item.getAsFile();
      });

      if(musicFiles.length > 0) {
        setFile(musicFiles[0]);
      }
    }

    window.addEventListener("dragover", onDragover);
    window.addEventListener("drop", onDrop);
    window.addEventListener("paste", onPaste);

    return () => {
      window.removeEventListener("dragover", onDragover);
      window.removeEventListener("drop", onDrop);
      window.removeEventListener("paste", onPaste);
    };
  }, [setFile]);

  function handleFileChange(event) {
    const musicFiles = Array.from(event.target.files).filter((file) => {
      return file.type.match(/^audio\//) !== null;
    });

    if(musicFiles.length > 0) {
      setFile(musicFiles[0]);
    }
  }

  function handleButtonClick() {
    if(fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="audio/*" />

      <button onClick={handleButtonClick}>Import File</button>

      <span>{filename}</span>
    </div>
  );
};

SongFileForm.propTypes = {
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  fileDuration: PropTypes.number.isRequired,
  setFileDuration: PropTypes.func.isRequired,

  setSongFileArrayBuffer: PropTypes.func.isRequired,
};

export default SongFileForm;
