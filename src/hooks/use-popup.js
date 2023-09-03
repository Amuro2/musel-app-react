import { useEffect, useState } from "react";

import Popup from "../components/Popup";

const KEY_ESCAPE = 27;

function usePopup() {
  const [ isVisible, setIsVisible ] = useState(false);
  const [ icon, setIcon ] = useState(null);
  const [ message, setMessage ] = useState(null);

  function show() {
    setIsVisible(true);

    document.activeElement.blur();
  }

  function hide() {
    setIsVisible(false);
  }

  function success(message) {
    setIcon(
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="lime" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

    setMessage(message);

    show();
  }

  function failure(message) {
    setIcon(
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

    setMessage(message);

    show();
  }

  useEffect(() => {
    if(isVisible) {
      function onkeydown(event) {
        if(event.keyCode === KEY_ESCAPE) {
          hide();
        }
      }

      window.addEventListener("keydown", onkeydown);

      return () => {
        window.removeEventListener("keydown", onkeydown);
      };
    }
  }, [isVisible]);

  const node = isVisible ? (
    <Popup close={hide}>
      <div className="flex gap-2">
        <span>{icon}</span>
        <span className="text-black">{message}</span>
      </div>
    </Popup>
  ) : null;

  return {
    node,
    success,
    failure,
  };
}

export default usePopup;
