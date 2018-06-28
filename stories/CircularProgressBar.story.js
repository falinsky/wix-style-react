import CircularProgressBar from 'wix-style-react/CircularProgressBar';

export default {
  category: '1. Foundation',
  storyName: '1.7 CircularProgressBar',

  component: CircularProgressBar,
  componentPath: '../src/CircularProgressBar',

  componentProps: {
    errorMessage: 'some error message',
    value: 20,
    size: 'medium',
    light: false,
    error: false,
    errorLabel: '',
    showProgressIndication: false
  },

  exampleProps: {
    size: ['small', 'medium', 'large']
  }
};
