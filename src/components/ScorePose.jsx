import pose from 'react-pose';

const ScorePose = pose.div({
  scoreUpdate: {
    scale: 1,
    transition: {
      scale: () => ({
        type: 'keyframes',
        times: [0, .5, 1],
        values: [1, 1.3, 1],
        duration: 225,
      })
    }
  }
});

export default ScorePose;