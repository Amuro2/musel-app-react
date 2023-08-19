import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetSongByIdQuery, useDownloadSongFileQuery } from "../services/songs";

import useFormSong from "../hooks/use-form-song";

import Container from "../components/Container";
import SongUpdateForm from "../components/SongUpdateForm";
import SongPlayer from "../components/SongPlayer";

import NotFound from "../pages/NotFound";

const UpdateSong = () => {
  const params = useParams();
  const songId = Number(params.songId);
  const { data, error, isLoading } = useGetSongByIdQuery(songId);
  const { data: songFileData } = useDownloadSongFileQuery(songId);

  const formSong = useFormSong();

  const {
    setId,
    setTitle,
    loopStart,
    setLoopStart,
    setLoopDuration,
    loopEnd,
    setLoopEnd,
    fileDuration,
    setFileDuration,
    file,
  } = formSong;

  const [ songFileArrayBuffer, setSongFileArrayBuffer ] = useState(null);

  useEffect(() => {
    if(data) {
      setId(data.id);
      setTitle(data.title);
      setLoopStart(data.loopStart);
      setLoopDuration(data.loopEnd - data.loopStart);
      setLoopEnd(data.loopEnd);
      setFileDuration(data.fileDuration);
    }
  }, [data, setId, setTitle, setLoopStart, setLoopDuration, setLoopEnd, setFileDuration]);

  useEffect(() => {
    setSongFileArrayBuffer(songFileData);
  }, [songFileData]);

  const playsOnLoad = !!file;

  if(isLoading) {
    return null;
  }

  if(error) {
    return (
      <NotFound />
    );
  }

  return (
    <Container>
      <SongUpdateForm
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

export default UpdateSong;
