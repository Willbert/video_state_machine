import { Machine } from 'xstate';

export const videoMachine = Machine({
  id: "video",
  initial: "loading",

  context: {
    video: null,
    duration: 0,
    elapsed: 0
  },

  states: {
    loading: {
      on: {
        LOADED: {
          target: "ready",
          actions: ["setVideo"]
        },
        FAIL: "failure"
      }
    },
    ready: {
      initial: "paused",
      states: {
        paused: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["setElapsed", "playVideo"]
            }
          }
        },
        playing: {
          on: {
            TIMING: {
              target: "playing",
              actions: "setElapsed"
            },
            PAUSE: {
              target: "paused",
              actions: ["setElapsed", "pauseVideo"]
            },
            END: "ended"
          }
        },
        ended: {
          on: {
            PLAY: {
              target: "playing",
              actions: "restartVideo"
            }
          }
        }
      }
    },
    failure: {
      type: "final"
    }
  }
});
