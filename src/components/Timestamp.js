import React from "react";
import PropTypes from "prop-types";

function explodeSeconds(time) {
  return {
    milliseconds: Math.round((time - Math.floor(time)) * 1000),
    seconds: Math.floor(time % 60),
    minutes: Math.floor(time / 60 % 60),
    hours: Math.floor(time / 60 / 60),
  };
}

function millisecondsToString(milliseconds) {
  return isNaN(Number(milliseconds))
  ? "---"
  : ("000" + milliseconds).slice(-3);
}

function secondsToString(seconds) {
  return isNaN(Number(seconds))
  ? "--"
  : ("00" + seconds).slice(-2);
}

function minutesToString(minutes) {
  return isNaN(Number(minutes))
  ? "--"
  : ("00" + minutes).slice(-2);
}

function hoursToString(hours, maxHours = undefined) {
  const hoursDigits = maxHours > 0 ? ("" + maxHours).length : 0;
  
  return isNaN(Number(hours))
  ? "-".repeat(hoursDigits)
  : maxHours > 0
  ? ("0".repeat(hoursDigits) + hours).slice(-hoursDigits)
  : "" + hours;
}

const Timestamp = ({ time, max = undefined, showsMilliseconds = false }) => {
  const {
    milliseconds,
    seconds,
    minutes,
    hours,
  } = explodeSeconds(time);

  const maxHours = Math.floor(max / 60 / 60);

  const millisecondsString = millisecondsToString(milliseconds);
  const secondsString = secondsToString(seconds);
  const minutesString = minutesToString(minutes);
  const hoursString = hoursToString(hours, maxHours);

  const showsHours = hours > 0 || maxHours > 0;

  return (
    <span>
      <span hidden={!showsHours}>
        <span>{hoursString}</span>
        <span>:</span>
      </span>

      <span>{minutesString}</span>
      <span>:</span>
      <span>{secondsString}</span>

      <span hidden={!showsMilliseconds}>
        <span>.</span>
        <span>{millisecondsString}</span>
      </span>
    </span>
  );
};

Timestamp.propTypes = {
  time: PropTypes.number.isRequired,
  max: PropTypes.number,
  showsMilliseconds: PropTypes.bool,
};

export default Timestamp;
