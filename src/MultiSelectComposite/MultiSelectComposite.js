import React from 'react';
import {bool, node} from 'prop-types';
import {children, optional, once} from '../Composite';
import Label from '../Label';
import MultiSelect from '../MultiSelect';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const MultiSelectComposite = ({...props, children}) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);

MultiSelectComposite.propTypes = {
  children: children(optional(Label), once(MultiSelect)),
  required: bool,
  appendToParent: bool,
  info: node,
  tooltip: node
};

MultiSelectComposite.displayName = 'MultiSelectComposite';

export default MultiSelectComposite;
