import SongForm from "./SongForm";

import { usePostSongMutation } from "../services/songs";

import { DURATION } from "../constants/loop-params-types";

import usePopup from "../hooks/use-popup";

const SongCreateForm = (props) => {
  const {
    title,
    loopStart,
    loopEnd,
    fileDuration,
    file,
  } = props;

  const [ postSong ] = usePostSongMutation();

  const popup = usePopup();

  async function handleSubmit() {
    const res = await postSong({
      title,
      loopStart,
      loopEnd,
      fileDuration,
      file,
    });

    if(!res?.error) {
      popup.success("The song has been created.");
    } else if(res?.error?.status === 400) {
      popup.failure("Invalid form. (Please ensure an audio file has been imported and the title is valid.)");
    } else {
      popup.failure("An error occured.");
    }
  }

  return (
    <>
      <SongForm
        {...props}
        handleSubmit={handleSubmit}
        initialParamsType={DURATION}
      />

      {popup.node}
    </>
  );
};

export default SongCreateForm;
