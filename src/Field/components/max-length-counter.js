import React from 'react';
import PropTypes from 'prop-types';

import Text from 'wix-style-react/Text';

import styles from '../styles.scss';

const maxLengthCounter = ({maxLength, value, valueLength}) => {
  const count = typeof value === 'string' ? maxLength - (valueLength || value.length) : maxLength;

  return (
    <div
      className={styles.counter}
      data-hook="field-counter"
      >
      <Text
        size="small"
        skin={count > 0 ? 'standard' : 'error'}
        secondary
        children={count}
        />
    </div>
  );
};

maxLengthCounter.propTypes = {
  maxLength: PropTypes.number,
  valueLength: PropTypes.number,
  value: PropTypes.any
};

export default maxLengthCounter;
