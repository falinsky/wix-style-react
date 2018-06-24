import React from 'react';

import Field from 'wix-style-react/Field';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';

const childrenExamples = [
  {label: 'Input',
    value: <Input placeholder="Field Input"/>
  },
  {label: 'InputArea',
    value: <InputArea placeholder="Field Input"/>
  }
];

export default {
  category: '12. Other',
  storyName: 'Field',
  component: Field,
  componentPath: '../src/Field',

  componentProps: {
    children: childrenExamples[0].value,
    label: 'This is an input:',
    required: true,
    info: 'Hello'
  },

  exampleProps: {
    children: childrenExamples
  }
};
