import SongForm from "./SongForm";

import { usePutSongMutation } from "../services/songs";

import { START_END } from "../constants/loop-params-types";

const SongUpdateForm = (props) => {
  const {
    id,
    title,
    loopStart,
    loopEnd,
    fileDuration,
    file,
  } = props;

  const [ putSong ] = usePutSongMutation();

  async function handleSubmit() {
    const res = await putSong({
      id,
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
      initialParamsType={START_END}
    />
  );
};

export default SongUpdateForm;
