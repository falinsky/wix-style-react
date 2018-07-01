import React from 'react';
import {children, optional, once} from '../Composite';
import RichTextArea from '../RichTextArea';
import Label from '../Label';
import InputAreaWithLabelComposite from '../Composite/InputAreaWithLabelComposite/InputAreaWithLabelComposite';

const RichTextAreaComposite = ({...props, children}) => (
  <InputAreaWithLabelComposite {...props}>
    {children}
  </InputAreaWithLabelComposite>
);


RichTextAreaComposite.propTypes = {
  children: children(optional(Label), once(RichTextArea))
};

RichTextAreaComposite.displayName = 'RichTextAreaComposite';

export default RichTextAreaComposite;
