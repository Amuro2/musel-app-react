import React from "react";

import useThrottle from "../hooks/use-throttle";

import useGetSongAndFile from "../services/song-and-file";

import Container from "../components/Container";
import SongList from "../components/SongList";
import SongPlayer from "../components/SongPlayer";

const Library = () => {
  const [ songId, setSongId ] = useThrottle(0);

  const { data: songWithFile } = useGetSongAndFile(songId);

  const songFileArrayBuffer = songWithFile?.songFileArrayBuffer ?? null;
  const fileDuration = songWithFile?.fileDuration ?? 0;
  const loopStart = songWithFile?.loopStart ?? 0;
  const loopEnd = songWithFile?.loopEnd ?? 0;

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <SongList currentSongId={songId} setCurrentSongId={setSongId} />

        <div className="sticky bottom-0 bg-[#0000009F]">
          <SongPlayer
            fileDuration={fileDuration}
            loopStart={loopStart}
            loopEnd={loopEnd}
            songFileArrayBuffer={songFileArrayBuffer}
            playsOnLoad
          />
        </div>
      </div>
    </Container>
  );
};

export default Library;
