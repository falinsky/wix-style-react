import React from 'react';
import {children, optional, once} from '../Composite';
import Label from '../Label';
import Input from '../Input';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const TextField = ({...props, children}) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);

TextField.propTypes = {
  children: children(optional(Label), once(Input))
};

TextField.displayName = 'TextField';

export default TextField;
