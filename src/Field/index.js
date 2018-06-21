import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'wix-style-react/Text';
import styles from './styles.scss';

const asterisk = (...cssClasses) =>
  <div
    data-hook="field-asterisk"
    className={classnames(styles.asterisk, ...cssClasses)}
    children="*"
    />;

const Field = ({children, label, required}) =>
  <div className={styles.root}>
    { label &&
      <div className={styles.heading}>
        <div
          className={styles.label}
          data-hook="field-label"
          >
          <Text appearance="T1" children={label}/>
          { required && asterisk() }
        </div>
      </div>
    }

    <div
      data-hook="field-children"
      className={classnames(styles.children, { [styles.childrenInline]: !label })}
      children={children}
      />

    { !label && required && asterisk(styles.asteriskInline) }
  </div>;

Field.displayName = 'Field';
Field.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  required: PropTypes.bool
};
Field.defaultProps = {};

export default Field;
