import { assign } from 'xstate';

export const setVideo = assign({
  video: (_context, event) => event.video,
  duration: (_context, event) => event.video.duration
});

export const setElapsed = assign({
  elapsed: (context, _event) => context.video.currentTime
});

export const playVideo = (context, _event) => {
  context.video.play();
};

export const pauseVideo = (context, _event) => {
  context.video.pause();
};

export const restartVideo = (context, _event) => {
  context.video.currentTime = 0;
  context.video.play();
};
