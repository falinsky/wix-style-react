import React from 'react';
import {Table} from 'wix-style-react/Table';
import {
  HeaderLayout,
  LayoutStart,
  LayoutEnd,
  Title,
  SelectedCount
} from '../../src/Table/TableHeader';

import Card from 'wix-style-react/Card';
import Search from 'wix-style-react/Search';

const baseData = [
  {firstName: 'Meghan', lastName: 'Bishop'},
  {firstName: 'Sara', lastName: 'Porter'},
  {firstName: 'Deborah', lastName: 'Rhodes'},
  {firstName: 'Walter', lastName: 'Jenning'}
];

export class TableExample extends React.Component {

  renderMainHeader() {
    return (
      <HeaderLayout>
        <LayoutStart>
          <Title>My Table</Title>
        </LayoutStart>
        <LayoutEnd>
          <Search/>
        </LayoutEnd>
      </HeaderLayout>
    );
  }

  renderBulkActionsHeader(context) {
    return (
      <div>
        <SelectedCount>{`${context.getNumSelected()} Selected`}</SelectedCount>
      </div>
    );
  }

  render() {
    return (
      <div style={{width: '966px'}}>
        <Card>
          <Table
            dataHook="story-table-example"
            data={baseData}
            itemsPerPage={20}
            columns={[
            {title: 'First Name', render: row => <span>{row.firstName}</span>, width: '40%', minWidth: '100px'},
            {title: 'Last Name', render: row => <span>{row.lastName}</span>, width: '40%', minWidth: '100px'}
            ]}
            showSelection
            >
            <Table.Header>
              {
                context => {
                  return context.getNumSelected() > 0 ?
                    this.renderBulkActionsHeader(context) :
                    this.renderMainHeader();
                }
              }
            </Table.Header>
            <Table.Content/>
          </Table>
        </Card>
      </div>
    );
  }
}
