import LinearProgressBar from 'wix-style-react/LinearProgressBar';

export default {
  category: '1. Foundation',
  storyName: '1.6 LinearProgressBar',

  component: LinearProgressBar,
  componentPath: '../src/LinearProgressBar',

  componentProps: {
    errorMessage: 'some error message',
    value: 20,
    light: false,
    error: false,
    showProgressIndication: false
  }
};
