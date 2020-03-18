import React from 'react';
import { percentage, minutes, seconds } from '../utils';

export const Buttons = ({ current, send }) => {
  if (current.matches({ ready: "playing" })) {
    return (
      <button
        onClick={() => {
          send("PAUSE");
        }}
      >
        Pause
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        send("PLAY");
      }}
    >
      Play
    </button>
  );
};

export const ElapsedBar = ({ elapsed, duration }) => (
  <div className="elapsed">
    <div
      className="elapsed-bar"
      style={{width: `${percentage(duration, elapsed)}%` }}
    />
  </div>
);

export const Timer = ({ elapsed, duration }) => (
  <span className="timer">
    {minutes(elapsed)}:{seconds(elapsed)} of {minutes(duration)}:
    {seconds(duration)}
  </span>
);
