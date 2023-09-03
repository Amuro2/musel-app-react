import SongForm from "./SongForm";

import { usePutSongMutation } from "../services/songs";

import { START_END } from "../constants/loop-params-types";

import usePopup from "../hooks/use-popup";

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

  const popup = usePopup();

  async function handleSubmit() {
    const res = await putSong({
      id,
      title,
      loopStart,
      loopEnd,
      fileDuration,
      file,
    });

    if(!res?.error) {
      popup.success("The song has successfully been updated.");
    } else if(res?.error?.status === 400) {
      popup.failure("Invalid form.");
    } else {
      popup.failure("An error occured.");
    }
  }

  return (
    <>
      <SongForm
        {...props}
        handleSubmit={handleSubmit}
        initialParamsType={START_END}
      />

      {popup.node}
    </>
  );
};

export default SongUpdateForm;
