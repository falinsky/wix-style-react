import React from 'react';
import Table from 'wix-style-react/Table';
import Search from 'wix-style-react/Search';
import s from './Table.story.scss';
import {storySettings} from './storySettings';
import CodeExample from 'wix-storybook-utils/CodeExample';
import {
  TableToolbar,
  LeftSide,
  RightSide,
  Title,
  SelectedCount
} from '../../src/Table/TableToolbar';

import {TableExample} from './TableExample';
import TableExampleRaw from '!raw-loader!./TableExample';

const mainHeader = (
  <TableToolbar>
    <LeftSide>
      <Title>My Table</Title>
    </LeftSide>
    <RightSide>
      <Search/>
    </RightSide>
  </TableToolbar>
);

const bulkSelectionHeader = context => {
  <div>
    <SelectedCount>{`${context.getNumSelected()} Selected`}</SelectedCount>
  </div>;
};

const childrenWithHeader = (
  [
    <Table.Header key="header">
      {bulkSelectionContext => bulkSelectionContext.getNumSelected() === 0 ?
         mainHeader : bulkSelectionHeader(bulkSelectionContext)}
    </Table.Header>,
    <Table.Content key="content"/>
  ]
);

const data = [
  {firstName: 'Meghan', lastName: 'Bishop'},
  {firstName: 'Sara', lastName: 'Porter'},
  {firstName: 'Deborah', lastName: 'Rhodes'},
  {firstName: 'Walter', lastName: 'Jenning'}
];

const dataLong = [1, 2, 3, 4, 5].reduce(accum => accum.concat(data), []);

const columnsOption1 = [
  {title: 'First', render: row => row.firstName},
  {title: 'Last', render: row => row.lastName}
];

const columnsOption2 = [
  {title: 'Row Num', render: (row, rowNum) => rowNum},
  {title: 'First', render: row => row.firstName},
  {title: 'Last', render: row => row.lastName},
  {title: 'Full', render: row => row.firstName + row.lastName}
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Table,
  componentPath: '../../src/Table',

  componentProps: {
    dataHook: storySettings.dataHook,
    id: 'id',
    data,
    columns: columnsOption1,
    showSelection: true,
    children: <Table.Content/>
  },
  exampleProps: {
    columns: [
      {label: '2 columns example', value: columnsOption1},
      {label: '4 columns example', value: columnsOption2}
    ],
    children: [{label: 'With Example Header', value: childrenWithHeader}],
    data: [
      {label: '4 rows', value: data},
      {label: '40 rows', value: dataLong}
    ]
  },
  examples: (
    <div>
      <h1>Examples</h1>
      <div className={s.examples}>
        <div className={s.example}>
          <CodeExample title="With Bulk Actions" code={TableExampleRaw}>
            <TableExample/>
          </CodeExample>
        </div>
      </div>
    </div>
  )
};
