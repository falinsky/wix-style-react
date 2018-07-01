import React from 'react';
import {children, optional, oneOf} from '../Composite';
import Label from '../Label';
import Input from '../Input';
import DatePicker from '../DatePicker';
import RangeInputWithLabelComposite from '../Composite/RangeInputWithLabelComposite/RangeInputWithLabelComposite';

const Range = ({...props, children}) => (
  <RangeInputWithLabelComposite {...props}>
    {children}
  </RangeInputWithLabelComposite>
);

Range.propTypes = {
  ...RangeInputWithLabelComposite.propTypes,
  children: children(optional(Label), oneOf(Input, DatePicker), oneOf(Input, DatePicker))
};

Range.displayName = 'Range';

export default Range;
