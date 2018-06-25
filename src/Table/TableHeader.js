import React from 'react';
import {string, any} from 'prop-types';
import {BulkSelectionConsumer} from './BulkSelection';
import s from './TableHeader.scss';
import typography from '../Typography/Typography.scss';

const TableHeader = props => {
  return (
    <div data-hook="table-header" className={s.header}>
      <BulkSelectionConsumer consumerCompName="Table.Header" providerCompName="Table">
        {props.children}
      </BulkSelectionConsumer>
    </div>
  );
};
TableHeader.displayName = 'Table.Header';
TableHeader.propTypes = {
  children: any
};

export const HeaderLayout = props => {
  return <div className={s.headerLayout}>{props.children}</div>;
};
HeaderLayout.displayName = 'TableHeader.HeaderLayout';
HeaderLayout.propTypes = {
  children: any
};

export const LayoutStart = props => {
  return <div className={s.headerLayoutStart}>{props.children}</div>;
};
LayoutStart.displayName = 'TableHeader.LayoutStart';
LayoutStart.propTypes = {
  children: any
};

export const LayoutEnd = props => {
  return <div className={s.headerLayoutEnd}>{props.children}</div>;
};
LayoutEnd.displayName = 'TableHeader.LayoutEnd';
LayoutEnd.propTypes = {
  children: any
};


export const Title = props => {
  return <span className={typography.h2}>{props.children}</span>;
};
Title.displayName = 'TableHeader.Title';
Title.propTypes = {
  children: string
};

export const SelectedCount = props => {
  return <span className={typography.t2}>{props.children}</span>;
};
SelectedCount.displayName = 'TableHeader.SelectedCount';
SelectedCount.propTypes = {
  children: string
};


TableHeader.Title = Title;
export {TableHeader};
