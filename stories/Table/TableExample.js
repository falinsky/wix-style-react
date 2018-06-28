import React from 'react';
import {
  Table,
  TableToolbar,
  ItemGroup,
  Item,
  Label,
  Title,
  SelectedCount,
  Divider
} from 'wix-style-react/Table';


import Card from 'wix-style-react/Card';
import Search from 'wix-style-react/Search';
import Dropdown from 'wix-style-react/Dropdown';
import Button from 'wix-style-react/Button';
import {PenOutline, Duplicate2, Export} from 'wix-style-react/Icons';

const baseData = [
  {name: 'Apple Towels', SKU: '111222', price: '$2.00', inventory: 'In stock'},
  {name: 'Cyan Towels', SKU: '222333', price: '$2.00', inventory: 'In stock'},
  {name: 'Marble Slippers', SKU: '333444', price: '$14.00', inventory: 'In stock'},
  {name: 'Red Slippers', SKU: '444555', price: '$14.00', inventory: 'Out of stock'}
];

export class TableExample extends React.Component {

  renderMainHeader() {
    const collectionOptions = [
      {id: 0, value: 'All Products'},
      {id: 1, value: 'Towels'},
      {id: 2, value: 'Slippers'}
    ];

    const filterOptions = [
      {id: 0, value: 'All'},
      {id: 1, value: 'Red'},
      {id: 2, value: 'Cyan'}
    ];

    return (
      <TableToolbar>
        <ItemGroup position="start">
          <Item>
            <Title>My Table</Title>
          </Item>
          <Item>
            <Label>
              Collection
              <span style={{width: '150px'}}>
                <Dropdown options={collectionOptions} selectedId={0} roundInput/>
              </span>
            </Label>
          </Item>
          <Item>
            <Label>
              Filter By
              <span style={{width: '86px'}}>
                <Dropdown options={filterOptions} selectedId={0} roundInput/>
              </span>
            </Label>
          </Item>
        </ItemGroup>
        <ItemGroup position="end">
          <Item>
            <Search/>
          </Item>
        </ItemGroup>
      </TableToolbar>
    );
  }

  renderBulkActionsHeader(context) {
    return (
      <TableToolbar>
        <ItemGroup>
          <Item>
            <SelectedCount>{`${context.getNumSelected()} Selected`}</SelectedCount>
          </Item>
        </ItemGroup>
        <ItemGroup position="end">
          <Item layout="button">
            <Button theme="whiteblueprimary" prefixIcon={<Export/>} >
              Export
            </Button>
          </Item>
          <Item layout="button">
            <Button theme="whiteblueprimary" prefixIcon={<Duplicate2/>} >
              Duplicate
            </Button>
          </Item>
          <Item layout="button">
            <Button theme="whiteblueprimary" prefixIcon={<PenOutline/>} >
              Edit
            </Button>
          </Item>
          <Divider/>
          <Search expandable/>
        </ItemGroup>
      </TableToolbar>
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
              {title: 'Name', render: row => <span>{row.name}</span>, width: '30%', minWidth: '150px'},
              {title: 'SKU', render: row => <span>{row.SKU}</span>, width: '20%', minWidth: '100px'},
              {title: 'Price', render: row => <span>{row.price}</span>, width: '20%', minWidth: '100px'},
              {title: 'Inventory', render: row => <span>{row.inventory}</span>, width: '20%', minWidth: '100px'}
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
