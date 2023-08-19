import React from "react";
import PropTypes from "prop-types";

import { useGetAllSongsQuery } from "../services/songs";

import SongItem from "./SongItem";

const SongList = ({
  currentSongId,
  setCurrentSongId,
}) => {
  const { data: songs, isLoading } = useGetAllSongsQuery();

  if(isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {songs.map((song, i) => {
        const isBeingPlayed = song.id === currentSongId;
        const isInvalid = song.isFileMissing;

        return (
          <SongItem key={i} song={song} setCurrentSongId={setCurrentSongId} isInvalid={isInvalid} isBeingPlayed={isBeingPlayed} />
        );
      })}
    </div>
  );
};

SongList.propTypes = {
  currentSongId: PropTypes.number.isRequired,
  setCurrentSongId: PropTypes.func.isRequired,
};

export default SongList;
