import React from 'react';
import {
  TableToolbar,
  ItemGroup,
  Item,
  Label,
  Title,
  SelectedCount,
  Divider
} from 'wix-style-react/Table';

import Search from 'wix-style-react/Search';
import Dropdown from 'wix-style-react/Dropdown';
import Button from 'wix-style-react/Button';
import {PenOutline, Duplicate2, Export} from 'wix-style-react/Icons';


export const renderMyTableHeader = context => {
  return context.getNumSelected() > 0 ?
      renderBulkActionsHeader(context) :
      renderMainHeader();
};


function renderMainHeader() {
  const collectionOptions = [
      {id: 0, value: 'All Products'},
      {id: 1, value: 'Towels'},
      {id: 2, value: 'Slippers'}
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
              <span style={{maxWidth: '150px'}}>
                <Dropdown options={collectionOptions} selectedId={0} roundInput/>
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

function renderBulkActionsHeader(context) {
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

