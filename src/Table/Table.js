import React from 'react';
import {string, number, arrayOf, oneOfType, func, bool, any} from 'prop-types';
import omit from 'lodash/omit';
import defaultTo from 'lodash/defaultTo';
import createReactContext from 'create-react-context';
import DataTable, {DataTableHeader} from '../DataTable';
import WixComponent from '../BaseComponents/WixComponent';
import Checkbox from '../Checkbox';
import {BulkSelection, BulkSelectionState, BulkSelectionConsumer} from './BulkSelection';

export * from './TableToolbar';
export {BulkSelectionState};

const TableDefaultProps = {
  ...DataTable.defaultProps,
  showSelection: false,
  selections: []
};

export const TableContext = createReactContext(TableDefaultProps);

function createColumns({tableProps, bulkSelectionContext}) {
  const createCheckboxColumn = (
    {
      toggleBulkSelection,
      getBulkSelectionState,
      toggleSelectionById,
      isSelected
    }
  ) => {
    const bulkSelectionState = getBulkSelectionState();
    return {
      title: <Checkbox
        dataHook="table-select"
        checked={bulkSelectionState === BulkSelectionState.ALL}
        indeterminate={bulkSelectionState === BulkSelectionState.SOME}
        onChange={() => toggleBulkSelection()}
        />,
      render: (row, rowNum) => {
        const id = defaultTo(row.id, rowNum);
        return (
          <Checkbox
            dataHook="row-select"
            checked={isSelected(id)}
            onChange={() => toggleSelectionById(id)}
            />
        );
      },
      width: '12px'
    };
  };

  return tableProps.showSelection ? [createCheckboxColumn(bulkSelectionContext), ...tableProps.columns] : tableProps.columns;
}

export const TableHeader = props => {
  return (
    <div data-hook="table-header">
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


const TableFooter = props => {
  return (
    <div data-hook="table-footer">
      <BulkSelectionConsumer consumerCompName="Table.Footer" providerCompName="Table">
        {props.children}
      </BulkSelectionConsumer>
    </div>
  );
};
TableFooter.displayName = 'Table.Footer';
TableFooter.propTypes = {
  children: any
};

function getDataTableProps(tableProps) {
  return {
    ...omit(tableProps,
          'showSelection',
          'selections',
          'onSelectionChanged',
          'dataHook',
          'newDesign',
          'hideHeader',
        ),
    newDesign: true
  };
}


/**
 * TitleBar (aka DataTableHeader)
 */
const TableTitleBar = () => {
  return (
    <TableContext.Consumer>
      {tableProps => {
        const dataTableProps = getDataTableProps(tableProps);
        if (tableProps.showSelection) {
          return (
            <BulkSelectionConsumer consumerCompName="Table.TitleBar" providerCompName="Table">
              {bulkSelectionContext => (
                <div data-hook="table-title-bar">
                  <DataTableHeader
                    {...dataTableProps}
                    columns={createColumns({tableProps, bulkSelectionContext})}
                    />
                </div>
            )}
            </BulkSelectionConsumer>
          );
        } else {
          return (
            <div data-hook="table-title-bar">
              <DataTableHeader {...dataTableProps}/>
            </div>
          );
        }
      }}
    </TableContext.Consumer>
  );
};
TableTitleBar.displayName = 'Table.TitleBar';
/**
 *
 */
const TableContent = ({titleBarVisible}) => {
  //TODO: figure out if we need to put result of createColumns() on state, in order to avoid
  // redundant renders.
  return (
    <TableContext.Consumer>
      {tableProps => {
        const dataTableProps = {
          ...getDataTableProps(tableProps),
          dataHook: 'table-content',
          hideHeader: !titleBarVisible
        };

        if (tableProps.showSelection) {
          return (
            <BulkSelectionConsumer consumerCompName="Table.Content" providerCompName="Table">
              {bulkSelectionContext => (
                <DataTable
                  {...dataTableProps}
                  columns={createColumns({tableProps, bulkSelectionContext})}
                  />
              )}
            </BulkSelectionConsumer>
          );
        } else {
          return (
            <DataTable
              {...dataTableProps}
              />
          );
        }
      }}
    </TableContext.Consumer>
  );
};
TableContent.displayName = 'Table.Content';
TableContent.propTypes = {
  titleBarVisible: bool
};
TableContent.defaultProps = {
  titleBarVisible: true
};

/**
 * Table is a composit component that allows adding SelectionColumn, Header (on top of the TitleBar), Footer.
 * It is a context provider, and thus the Table.Header, Table.TitleBar and Table.Content can be rendered separatly.
 */
export class Table extends WixComponent {

  static Header = TableHeader;
  static Titlebar = TableTitleBar;
  static Content = TableContent;
  static Footer = TableFooter;

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    // The state IS the props since Table acts as a context provider for all Table props.
    this.setState(nextProps);
  }

  shouldComponentUpdate() {
    // Table is not really a PureComponent
    return true;
  }

  setSelectedIds(selectedIds) {
    this.bulkSelection.setSelectedIds(selectedIds);
  }

  renderChildren() {
    const children = this.props.children;
    return this.props.withWrapper ? (
      <div>
        {children}
      </div>) :
      children;
  }

  render() {

    return (
      <TableContext.Provider value={this.state}>
        {this.props.showSelection ?
        (
          <BulkSelection
            ref={_ref => this.bulkSelection = _ref}
            selectedIds={this.props.selectedIds}
            allIds={this.state.data.map((rowData, rowIndex) => defaultTo(rowData.id, rowIndex))}
            onSelectionChanged={this.props.onSelectionChanged}
            >
            {this.renderChildren()}
          </BulkSelection>
        ) :
        this.renderChildren()
        }
      </TableContext.Provider>
    );
  }
}

Table.defaultProps = {
  ...TableDefaultProps,
  children:
  [
    <Table.Content key="content"/>
  ],
  withWrapper: true
};

Table.propTypes = {
  ...omit(DataTable.propTypes, ['thPadding', 'thHeight', 'thFontSize', 'thBorder', 'thColor', 'thOpacity', 'thLetterSpacing', 'hideHeader']),
  /** Indicates wether to show a selection column (with checkboxes) */
  showSelection: bool,
    /** Array of selected row ids.
     *  Idealy, id should be a property on the data row object.
     *  If data objects do not have id property, then the data row's index would be used as an id. */
  selectedIds: oneOfType([arrayOf(string), arrayOf(number)]),
  /** Called when row selection changes. Receives the updated selection array as argument. */
  onSelectionChanged: func,
  /**
   *  When false then Table would not create a `<div/>` wrapper around it's children.
   *  Useful when using `<Table/>` to wrap a `<Page/>` component, in that case we use the `<Table/>` only as a context provider and it doesn't render anything to the DOM by itself.*/
  withWrapper: bool
};

export default Table;
