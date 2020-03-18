import React from 'react';
import { videoMachine } from './state_machine';
import { useMachine } from '@xstate/react';
import { Buttons, ElapsedBar, Timer } from './video_player/video_controls';
import {
  setVideo, setElapsed, playVideo,
  pauseVideo, restartVideo
} from './video_player/video_functions';

import './App.css';
import './reset.css';

export default function App() {
  const ref = React.useRef(null);
  const [current, send] = useMachine(videoMachine, {
    actions: { setVideo, setElapsed, playVideo, pauseVideo, restartVideo }
  });
  const { duration, elapsed } = current.context;

  console.log(current.value);

  return (
    <div className="container">
      <video
        ref={ref}
        onCanPlay={() => {
          send("LOADED", { video: ref.current });
        }}
        onTimeUpdate={() => {
          send("TIMING");
        }}
        onEnded={() => {
          send("END");
        }}
        onError={() => {
          send("FAIL");
        }}
      >
        <source src="/coverr-waves-and-sand.mp4" type="video/mp4" />
      </video>

      <div>
        <ElapsedBar elapsed={elapsed} duration={duration} />
        <Buttons current={current} send={send} />
        <Timer elapsed={elapsed} duration={duration} />
      </div>
    </div>
  );
}
