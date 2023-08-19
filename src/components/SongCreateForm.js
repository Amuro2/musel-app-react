import SongForm from "./SongForm";

import { usePostSongMutation } from "../services/songs";

import { DURATION } from "../constants/loop-params-types";

const SongCreateForm = (props) => {
  const {
    title,
    loopStart,
    loopEnd,
    fileDuration,
    file,
  } = props;

  const [ postSong ] = usePostSongMutation();

  async function handleSubmit() {
    const res = await postSong({
      title,
      loopStart,
      loopEnd,
      fileDuration,
      file,
    });

    // TODO success/failure notification
    if(res) {}
  }

  return (
    <SongForm
      {...props}
      handleSubmit={handleSubmit}
      initialParamsType={DURATION}
    />
  );
};

export default SongCreateForm;
