import React from 'react';
import {string} from 'prop-types';
import typography from '../Typography/Typography.scss';
import {Toolbar, ItemGroup, Item, Label, Divider} from './Toolbar';
export * from './Toolbar'; // eslint-disable-line no-duplicate-imports

export const Title = props => {
  return (
    <span className={typography.h2}>
      {props.children}
    </span>
  );
};
Title.displayName = 'TableToolbar.Title';
Title.propTypes = {
  children: string
};

export const SelectedCount = props => {
  return (
    <span className={typography.t2}>
      {props.children}
    </span>
  );
};
SelectedCount.displayName = 'TableToolbar.SelectedCount';
SelectedCount.propTypes = {
  children: string
};

export const TableToolbar = Toolbar;

// Aliases for convenience
TableToolbar.ItemGroup = ItemGroup;
TableToolbar.Item = Item;
TableToolbar.Label = Label;
TableToolbar.SelectedCount = SelectedCount;
TableToolbar.Title = Title;
TableToolbar.Divider = Divider;
