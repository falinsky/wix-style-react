import React from 'react';
import {storiesOf} from '@storybook/react';
import {storySettings} from '../Table/storySettings';

import {TablePageExample} from './TablePageExample';
import TablePageExampleRaw from '!raw-loader!./TablePageExample';
import CodeExample from 'wix-storybook-utils/CodeExample';

storiesOf(storySettings.kind, module)
  .add('13.1 + TablePageExample', () => (
    <CodeExample title="Table in a Page (with fixed Toolbar+Header)" code={TablePageExampleRaw}>
      <TablePageExample/>
    </CodeExample>
  ));
