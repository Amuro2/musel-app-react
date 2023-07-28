import { useEffect, useState } from "react";

function useWindowSize() {
  const [ size, setSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function onResize() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener("resize", onResize);
  }, []);

  return size;
}

export default useWindowSize;
