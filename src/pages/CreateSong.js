import React, { useState } from "react";

import useFormSong from "../hooks/use-form-song";

import Container from "../components/Container";
import SongCreateForm from "../components/SongCreateForm";
import SongPlayer from "../components/SongPlayer";

const CreateSong = () => {
  const formSong = useFormSong();

  const {
    loopStart,
    loopEnd,
    fileDuration,
    file,
  } = formSong;

  const [ songFileArrayBuffer, setSongFileArrayBuffer ] = useState(null);

  const playsOnLoad = !!file;

  return (
    <Container>
      <SongCreateForm
        {...formSong}
        songFileArrayBuffer={songFileArrayBuffer}
        setSongFileArrayBuffer={setSongFileArrayBuffer}
      />

      <SongPlayer
        fileDuration={fileDuration}
        loopStart={loopStart}
        loopEnd={loopEnd}
        songFileArrayBuffer={songFileArrayBuffer}
        playsOnLoad={playsOnLoad}
      />
    </Container>
  );
};

export default CreateSong;
