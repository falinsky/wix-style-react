import React from 'react';
import PropTypes from 'prop-types';
import {BulkSelectionContext} from './BulkSelection';

export const BulkSelectionConsumer = props => {
  if (typeof props.children !== 'function') {
    throw new Error(`child of ${props.consumerCompName} must be a context consumer function`);
  }
  return (
    <BulkSelectionContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(`${props.consumerCompName} cannot be rendered outside the ${props.providerCompName} component`);
        }
        return props.children(context);
      }}
    </BulkSelectionContext.Consumer>
  );
};

BulkSelectionConsumer.propTypes = {
  children: PropTypes.any.isRequired,
  consumerCompName: PropTypes.string,
  providerCompName: PropTypes.string
};

BulkSelectionConsumer.defaultProps = {
  consumerCompName: 'BulkSelectionConsumer',
  providerCompName: 'BulkSelection'
};
