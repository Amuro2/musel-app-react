import { useGetSongByIdTaglessQuery, useDownloadSongFileQuery } from "../services/songs";

function useGetSongAndFile(id) {
  const { data: song, error: songError, isLoading: isSongLoading, isFetching: isSongFetching } = useGetSongByIdTaglessQuery(id);
  const { data: songFile, error: songFileError, isLoading: isSongFileLoading, isFetching: isSongFileFetching } = useDownloadSongFileQuery(id);

  const error = songError || songFileError;
  const isLoading = isSongLoading || isSongFileLoading;
  const isFetching = isSongFetching || isSongFileFetching;

  const data = song && songFile && !error && !isLoading && !isFetching ? {
    ...song,
    songFileArrayBuffer: songFile,
  } : null;

  return {
    data,
    error,
    isLoading,
    isFetching,
  };
}

export default useGetSongAndFile;
