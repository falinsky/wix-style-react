import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import s from './Table.scss';
import DataTable from '../DataTable';
import WixComponent from '../BaseComponents/WixComponent';
import Checkbox from '../Checkbox';
import {BulkSelection, BulkSelectionState} from './BulkSelection';

/**
 * Table is a composit component that allows adding header, fuooter and bulk actions to tables
 */
export default class Table extends WixComponent {

  createCheckboxColumn({toggleBulkSelection, getBulkSelectionState, toggleItem, isSelected}) {
    const bulkSelectionState = getBulkSelectionState();
    return {
      title: <Checkbox
        dataHook="table-select"
        checked={bulkSelectionState === BulkSelectionState.ALL}
        indeterminate={bulkSelectionState === BulkSelectionState.SOME}
        onChange={() => toggleBulkSelection()}
        />,
      render: (row, rowNum) => (
        <Checkbox
          dataHook="row-select"
          checked={isSelected(rowNum)}
          onChange={() => toggleItem(rowNum)}
          />)
    };
  }

  renderHeader(bulkSelectionContext) {
    const {header} = this.props;
    return (
      <div className={s.header} data-hook="table-header">
        {typeof header === 'function' ? header(bulkSelectionContext) : header}
      </div>);
  }

  renderFooter(bulkSelectionContext) {
    const {footer} = this.props;
    return (
      <div className={s.footer} data-hook="table-footer">
        {typeof footer === 'function' ? footer(bulkSelectionContext) : footer}
      </div>);
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {header, footer, showSelection, onSelectionChanged, columns} = this.props;

    const dataTableProps = omit(this.props,
      'header',
      'footer',
      'showSelection',
      'selections',
      'onSelectionChanged',
      'columns',
      'dataHook');

    return (
      <BulkSelection
        selections={this.props.selections}
        onSelectionChanged={onSelectionChanged}
        >
        {
          bulkSelectionContext => (
            <div>
              {header && this.renderHeader(bulkSelectionContext)}
              <DataTable
                {...dataTableProps}
                dataHook="table"
                columns={showSelection ? [this.createCheckboxColumn(bulkSelectionContext), ...columns] : columns}
                newDesign
                />
              {footer && this.renderFooter(bulkSelectionContext)}
            </div>
          )
        }
      </BulkSelection>
    );
  }
}

Table.defaultProps = {
  ...DataTable.defaultProps,
  showSelection: false,
  selections: []
};

Table.propTypes = {
  ...omit(DataTable.propTypes, ['thPadding', 'thHeight', 'thFontSize', 'thBorder', 'thColor', 'thOpacity', 'thLetterSpacing']),
  /** Indicates wether to show a selection column (with checkboxes) */
  showSelection: PropTypes.bool,
  /** Array of row selection boolean states. Should correspond in length to the data prop */
  selections: PropTypes.arrayOf(PropTypes.bool),
  /** Called when row selection changes. Receives the updated selection array as argument. */
  onSelectionChanged: PropTypes.func,
  /** The header that appear above the table's column titles. Can be a Node, or a function with this signature: (selection: Array[boolean])=>React.ReactNode */
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /** The footer that appear below the table. Can be a Node, or a function with this signature: (selection: Array[boolean])=>React.ReactNode*/
  footer: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};



