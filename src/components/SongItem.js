import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { useDeleteSongMutation } from "../services/songs";

const SongItem = ({
  song,
  setCurrentSongId,
  isInvalid,
  isBeingPlayed,
}) => {
  const [ deleteSong ] = useDeleteSongMutation();

  const backgroundColor = isInvalid ? "bg-red-100" : isBeingPlayed ? "bg-green-100" : "bg-white";

  function handlePlayClick(event) {
    event.stopPropagation();

    if(!isInvalid) {
      setCurrentSongId(song.id);
    }
  }

  function handleDeleteButtonClick(event) {
    event.stopPropagation();

    deleteSong(song.id);

    if(isBeingPlayed) {
      setCurrentSongId(0);
    }
  }

  return (
    <div className={`flex justify-between px-4 py-2 ${backgroundColor} text-black rounded-full`}>
      <div className="flex gap-2 overflow-hidden">
        <span className="cursor-pointer" onClick={handlePlayClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        </span>

        <span className="whitespace-nowrap text-ellipsis overflow-hidden">{song.title}</span>
      </div>

      <div className="flex justify-end gap-2">
        <Link to={`/update-song/${song.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </Link>

        <span className="cursor-pointer" onClick={handleDeleteButtonClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </span>
      </div>
    </div>
  );
};

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  setCurrentSongId: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  isBeingPlayed: PropTypes.bool.isRequired,
};

export default SongItem;
