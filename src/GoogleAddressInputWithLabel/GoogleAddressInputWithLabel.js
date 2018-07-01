import React from 'react';
import {children, optional, once} from '../Composite';
import Label from '../Label';
import GoogleAddressInput from '../GoogleAddressInput';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const GoogleAddressInputWithLabel = ({...props, children}) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);

GoogleAddressInputWithLabel.propTypes = {
  children: children(optional(Label), once(GoogleAddressInput))
};

GoogleAddressInputWithLabel.displayName = 'GoogleAddressInputWithLabel';

export default GoogleAddressInputWithLabel;
