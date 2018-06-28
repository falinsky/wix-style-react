import React from 'react';
import PropTypes from 'prop-types';

import Text from 'wix-style-react/Text';

import styles from '../FormField.scss';

const MaxLengthCounter = ({lengthLeft}) =>
  <div
    className={styles.counter}
    data-hook="formfield-counter"
    >
    <Text
      size="small"
      skin={lengthLeft > 0 ? 'standard' : 'error'}
      secondary
      children={lengthLeft}
      />
  </div>;

MaxLengthCounter.propTypes = {
  lengthLeft: PropTypes.number
};

export default MaxLengthCounter;
