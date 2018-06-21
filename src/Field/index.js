import React from 'react';
import PropTypes from 'prop-types';

const Field = ({children, label}) =>
  <div>
    { label &&
      <div data-hook="field-label">{label}</div>
    }

    <div data-hook="field-children">{children}</div>
  </div>;

Field.displayName = 'Field';
Field.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node
};
Field.defaultProps = {};

export default Field;
