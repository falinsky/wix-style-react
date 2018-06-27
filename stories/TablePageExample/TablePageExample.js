import React from 'react';
import {Table} from 'wix-style-react/Table';
import {any} from 'prop-types';

import styles from './TablePageExample.scss';
import {renderMyTableHeader} from '../Table/DefaultHeader';
import Card from 'wix-style-react/Card';
import Page from 'wix-style-react/Page';


const baseData = [
  {name: 'Apple Towels', SKU: '111222', price: '$2.00', inventory: 'In stock'},
  {name: 'Cyan Towels', SKU: '222333', price: '$2.00', inventory: 'In stock'},
  {name: 'Marble Slippers', SKU: '333444', price: '$14.00', inventory: 'In stock'},
  {name: 'Red Slippers', SKU: '444555', price: '$14.00', inventory: 'Out of stock'}
];

const data = [1, 2, 3, 4, 5].reduce(accum => accum.concat(baseData), []);

const ViewPortLayout = ({children}) => (
  <div className={styles.storyPageExample}>
    <div className={styles.sideBar}>Sidebar</div>

    <div className={styles.bodyContent}>
      <div className={styles.topBar}>TopBar</div>
      {children}
    </div>
  </div>
);
ViewPortLayout.propTypes = {
  children: any
};

export class TablePageExample extends React.Component {

  render() {
    return (
      <ViewPortLayout>
        <Table
          withWrapper={false}
          dataHook="story-table-example"
          data={data}
          itemsPerPage={20}
          columns={[
              {title: 'Name', render: row => <span>{row.name}</span>, width: '30%', minWidth: '150px'},
              {title: 'SKU', render: row => <span>{row.SKU}</span>, width: '20%', minWidth: '100px'},
              {title: 'Price', render: row => <span>{row.price}</span>, width: '20%', minWidth: '100px'},
              {title: 'Inventory', render: row => <span>{row.inventory}</span>, width: '20%', minWidth: '100px'}
          ]}
          showSelection
          onSelectionChange={selectedIds => console.log('Table.onSelectionChange(): selectedIds=', selectedIds)}
          >
          <Page>
            <Page.Header title="My Table Title"/>
            <Page.Tail>
              <Card>
                <Table.Header>
                  { renderMyTableHeader }
                </Table.Header>
                <Table.Titlebar/>
              </Card>
            </Page.Tail>
            <Page.Content>
              <Card>
                <Table.Content titleBarVisible={false}/>
              </Card>
            </Page.Content>
          </Page>
        </Table>
      </ViewPortLayout>
    );
  }
}
