import React from 'react';

import Field from 'wix-style-react/Field';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import RichTextArea from 'wix-style-react/RichTextArea';

const placeholder = 'Default text goes here...';
const childrenExamples = [
  {label: 'Input',
    value: <Input placeholder={placeholder}/>
  },
  {label: 'InputArea',
    value: <InputArea placeholder={placeholder}/>
  },
  {label: 'RichTextArea',
    value: <RichTextArea placeholder={placeholder}/>
  }
];

const isString = value => typeof value === 'string';

export default {
  category: '12. Other',
  storyName: '12.6 Field',
  component: Field,
  componentPath: '../src/Field',

  componentProps: setState => ({
    dataHook: 'storybook-field',
    children: childrenExamples[0].value,
    label: 'This is an input:',
    required: true,
    info: 'I help you to fill info',
    value: '',
    onChange: e => setState({value: isString(e) ? e : e.target.value}),
    maxLength: 100
  }),

  exampleProps: {
    children: childrenExamples,
    onChange: e => isString(e) ? e : e.target.value
  }
};
