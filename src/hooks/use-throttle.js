import { useEffect, useState } from "react";

const THROTTLING = {throttle: "Yeah~"};

function useThrottle(nullValue = undefined) {
  const [ state, setState ] = useState(nullValue);
  const [ notYet, setNotYet ] = useState(THROTTLING);
  const [ throttle, setThrottle ] = useState(THROTTLING);

  useEffect(() => {
    if(notYet !== THROTTLING) {
      setState(notYet);
      setNotYet(THROTTLING);
    }
  }, [notYet]);

  useEffect(() => {
    if(throttle !== THROTTLING) {
      setState(nullValue);
      setNotYet(throttle);
      setThrottle(THROTTLING);
    }
  }, [throttle, nullValue]);

  return [ state, setThrottle ];
}

export default useThrottle;
