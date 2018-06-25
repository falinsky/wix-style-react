import React from 'react';
import Table from 'wix-style-react/Table';
import Card from 'wix-style-react/Card';

const baseData = [
  {firstName: 'Meghan', lastName: 'Bishop'},
  {firstName: 'Sara', lastName: 'Porter'},
  {firstName: 'Deborah', lastName: 'Rhodes'},
  {firstName: 'Walter', lastName: 'Jenning'}
];

export class TableExample extends React.Component {
  render() {
    return (
      <div style={{width: '966px'}}>
        <Card>
          <Table
            dataHook="story-table-example"
            data={baseData}
            itemsPerPage={20}
            columns={[
            {title: 'Row Number', render: (row, rowNum) => '#' + (rowNum + 1), width: '20%', minWidth: '75px', important: true},
            {title: 'First Name', render: row => <span>{row.firstName}</span>, width: '40%', minWidth: '100px'},
            {title: 'Last Name', render: row => <span>{row.lastName}</span>, width: '40%', minWidth: '100px'}
            ]}
            showSelection
            >
            <Table.Header>
              {() => (
                <span>My Table</span>
              )}
            </Table.Header>
            <Table.Content/>
          </Table>
        </Card>
      </div>
    );
  }
}
