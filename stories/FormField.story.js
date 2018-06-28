import React from 'react';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import RichTextArea from 'wix-style-react/RichTextArea';

const placeholder = 'Default text goes here...';
const childrenExamples = [
  {label: 'Input',
    value: <Input placeholder={placeholder}/>
  },
  {label: 'Input with char counter',
    // eslint-disable-next-line react/prop-types
    value: ({setLengthLeft}) =>
      <Input
        placeholder={placeholder}
        onChange={e => setLengthLeft(100 - e.target.value.length)}
        />
  },
  {label: 'InputArea',
    value: <InputArea placeholder={placeholder}/>
  },
  {label: 'RichTextArea',
    value: <RichTextArea placeholder={placeholder}/>
  }
];

export default {
  category: '12. Other',
  storyName: '12.6 FormField',
  component: FormField,
  componentPath: '../src/FormField',

  componentProps: {
    dataHook: 'storybook-formfield',
    children: childrenExamples[0].value,
    label: 'This is an input:',
    required: true,
    info: 'I help you to fill info'
  },

  exampleProps: {
    children: childrenExamples
  }
};
