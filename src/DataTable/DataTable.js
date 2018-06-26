import React, {Component} from 'react';
import PropTypes from 'prop-types';
import oldStyle from './DataTable.old.scss';
import newStyle from './DataTable.scss';
import typography from '../Typography/Typography.scss';
import classNames from 'classnames';
import InfiniteScroll from './InfiniteScroll';
import WixComponent from '../BaseComponents/WixComponent';
import ArrowVertical from '../Icons/dist/components/ArrowVertical';
import SortByArrowDown from 'wix-ui-icons-common/system/SortByArrowDown';
import SortByArrowUp from 'wix-ui-icons-common/system/SortByArrowUp';
import {Animator} from 'wix-animations';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';
import Tooltip from '../Tooltip/Tooltip';
import omit from 'lodash/omit';

export const DataTableHeader = props => (
  <div>
    <table style={{width: props.width}} className={newStyle.table}>
      <TableHeader {...props}/>
    </table>
  </div>
);

DataTableHeader.propTypes = {
  width: PropTypes.string
};

class DataTable extends WixComponent {

  constructor(props) {
    super(props);
    let state = {selectedRows: {}};
    if (props.infiniteScroll) {
      state = {...state, ...this.createInitialScrollingState(props)};
    }
    this.state = state;
  }

  get style() {
    return this.props.newDesign ? newStyle : oldStyle;
  }

  componentWillReceiveProps(nextProps) {
    let isLoadingMore = false;
    if (this.props.infiniteScroll && nextProps.data !== this.props.data) {
      if (nextProps.data instanceof Array && this.props.data instanceof Array) {
        if (this.props.data.every((elem, index) => {
          return nextProps.data.length > index && nextProps.data[index] === elem;
        })) {
          isLoadingMore = true;
          const lastPage = this.calcLastPage(nextProps);
          const currentPage =
            this.state.currentPage < lastPage ? this.state.currentPage + 1 : this.state.currentPage;
          this.setState({lastPage, currentPage});
        }
      }
      if (!isLoadingMore) {
        this.setState(this.createInitialScrollingState(nextProps));
      }
    }
  }

  shouldComponentUpdate() {
    // DataTable extends WixComponent which is a PureComponent, but DataTable is not pure.
    // returning true, disables the PureComponent optimization.
    return true;
  }

  createInitialScrollingState(props) {
    return {currentPage: 0, lastPage: this.calcLastPage(props)};
  }

  render() {
    const {data, showHeaderWhenEmpty, infiniteScroll, itemsPerPage} = this.props;

    if (!data.length && !showHeaderWhenEmpty) {
      return null;
    }

    const rowsToRender = infiniteScroll ?
      data.slice(0, ((this.state.currentPage + 1) * itemsPerPage)) :
      data;

    const table = this.renderTable(rowsToRender);
    if (infiniteScroll) {
      return this.wrapWithInfiniteScroll(table);
    }

    return table;
  }

  wrapWithInfiniteScroll = table => {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.state.currentPage < this.state.lastPage || (this.props.hasMore)}
        loader={this.props.loader}
        useWindow={this.props.useWindow}
        scrollElement={this.props.scrollElement}
        >
        {table}
      </InfiniteScroll>
    );
  };

  renderTable = rowsToRender => {
    const style = {width: this.props.width};
    return (
      <div>
        <table id={this.props.id} style={style} className={this.style.table}>
          {!this.props.hideHeader &&
          <TableHeader {...this.props}/>}
          {this.renderBody(rowsToRender)}
        </table>
      </div>);
  };

  renderBody = rows => (
    <tbody>
      {rows.map(this.renderRow)}
    </tbody>
  );

  onRowClick = (rowData, rowNum) => {
    const {onRowClick, rowDetails} = this.props;
    onRowClick && onRowClick(rowData, rowNum);
    rowDetails && this.toggleRowDetails(rowNum);
  };

  renderRow = (rowData, rowNum) => {
    const {onRowClick, onMouseEnterRow, onMouseLeaveRow, rowDataHook, dynamicRowClass, rowDetails} = this.props;
    const rowClasses = [this.props.rowClass];
    const optionalRowProps = {};

    const handlers = [
      {rowEventHandler: this.onRowClick, eventHandler: 'onClick'},
      {rowEventHandler: onMouseEnterRow, eventHandler: 'onMouseEnter'},
      {rowEventHandler: onMouseLeaveRow, eventHandler: 'onMouseLeave'}
    ];

    handlers.forEach(({rowEventHandler, eventHandler}) => {
      if (rowEventHandler) {
        optionalRowProps[eventHandler] = event => {
          if (event.isDefaultPrevented()) {
            return;
          }
          rowEventHandler(rowData, rowNum);
        };
      }
    });

    if (onRowClick) {
      rowClasses.push(this.style.clickableDataRow);
    }

    if (rowDetails) {
      rowClasses.push(this.style.animatedDataRow);
    }

    if (rowDataHook) {
      if (typeof rowDataHook === 'string') {
        optionalRowProps['data-hook'] = rowDataHook;
      } else {
        optionalRowProps['data-hook'] = rowDataHook(rowData, rowNum);
      }
    }

    if (dynamicRowClass) {
      rowClasses.push(dynamicRowClass(rowData, rowNum));
    }

    optionalRowProps.className = classNames(rowClasses);

    const key = rowData.id === undefined ? rowNum : rowData.id;
    const rowsToRender = [(
      <tr data-table-row="dataTableRow" key={key} {...optionalRowProps}>
        {this.props.columns.map((column, colNum) => this.renderCell(rowData, column, rowNum, colNum))}
      </tr>
    )];

    if (rowDetails) {
      const showDetails = !!this.state.selectedRows[rowNum];

      rowsToRender.push(
        <tr key={`${key}_details`} className={classNames(this.style.rowDetails)}>
          <td
            data-hook={`${rowNum}_details`}
            className={classNames(this.style.details, showDetails ? this.style.active : '')}
            colSpan={this.props.columns.length}
            >
            <div className={classNames(this.style.rowDetailsInner)}>
              <Animator show={showDetails} height>
                {rowDetails(rowData, rowNum)}
              </Animator>
            </div>
          </td>
        </tr>
      );
    }

    return rowsToRender;
  };

  renderCell = (rowData, column, rowNum, colNum) => {
    const classes = classNames(
      {[typography.t1]: this.props.newDesign},
      {[this.style.important]: column.important},
      {[this.style.largeVerticalPadding]: this.props.rowVerticalPadding === 'large'},
      {[this.style.mediumVerticalPadding]: this.props.rowVerticalPadding !== 'large'});
    const width = rowNum === 0 && this.props.hideHeader ? column.width : undefined;

    return (<td
      style={column.style}
      width={width}
      className={classes}
      key={colNum}
      >
      {column.render && column.render(rowData, rowNum)}
    </td>);
  };

  calcLastPage = ({data, itemsPerPage}) => Math.ceil(data.length / itemsPerPage) - 1;

  loadMore = () => {
    if (this.state.currentPage < this.state.lastPage) {
      this.setState({currentPage: this.state.currentPage + 1});
    } else {
      this.props.loadMore && this.props.loadMore();
    }
  };

  toggleRowDetails = selectedRow => {
    let selectedRows = {[selectedRow]: !this.state.selectedRows[selectedRow]};
    if (this.props.allowMultiDetailsExpansion) {
      selectedRows = Object.assign({}, this.state.selectedRows, {[selectedRow]: !this.state.selectedRows[selectedRow]});
    }
    this.setState({selectedRows});
  }
}

class TableHeader extends Component {

  static propTypes = {
    onSortClick: PropTypes.func,
    thPadding: PropTypes.string,
    thHeight: PropTypes.string,
    thFontSize: PropTypes.string,
    thBorder: PropTypes.string,
    thColor: PropTypes.string,
    thOpacity: PropTypes.string,
    thLetterSpacing: PropTypes.string,
    thBoxShadow: PropTypes.string,
    columns: PropTypes.array,
    newDesign: PropTypes.bool
  };

  get style() {
    return this.props.newDesign ? newStyle : oldStyle;
  }

  renderSortingArrow = (sortDescending, colNum) => {
    if (sortDescending === undefined) {
      return null;
    }
    if (this.props.newDesign) {
      const Arrow = sortDescending ? SortByArrowUp : SortByArrowDown;
      return (
        <span
          data-hook={`${colNum}_title`}
          className={this.style.sortArrow}
          >
          <Arrow height={12} data-hook={sortDescending ? 'sort_arrow_dec' : 'sort_arrow_asc'}/>
        </span>);
    }
    const sortDirectionClassName = sortDescending ? this.style.sortArrowAsc : this.style.sortArrowDesc;
    return <span data-hook={`${colNum}_title`} className={sortDirectionClassName}><ArrowVertical/></span>;
  };

  renderInfoTooltip = (tooltipProps, colNum) => {
    if (tooltipProps === undefined) {
      return null;
    }
    const _tooltipProps = Object.assign({theme: 'dark'}, tooltipProps, {
      dataHook: `${colNum}_info_tooltip`,
      moveBy: {x: 2.5, y: -7}
    });
    return (
      <Tooltip {..._tooltipProps}>
        <span className={this.style.infoTooltipWrapper}>
          <InfoCircle className={this.style.infoIcon} size={24}/>
        </span>
      </Tooltip>
    );
  };

  renderHeaderCell = (column, colNum) => {
    const style = {
      width: column.width,
      padding: this.props.thPadding,
      height: this.props.thHeight,
      fontSize: this.props.thFontSize,
      border: this.props.thBorder,
      boxShadow: this.props.thBoxShadow,
      color: this.props.thColor,
      opacity: this.props.thOpacity,
      letterSpacing: this.props.thLetterSpacing,
      cursor: column.sortable === undefined ? 'arrow' : 'pointer'
    };

    const optionalHeaderCellProps = {};
    if (column.sortable) {
      optionalHeaderCellProps.onClick = () => this.props.onSortClick && this.props.onSortClick(column, colNum);
    }
    return (
      <th
        style={style}
        key={colNum}
        className={classNames({[typography.t4]: this.props.newDesign})}
        {...optionalHeaderCellProps}
        >
        <div className={this.style.thContainer}>
          {column.title}{this.renderSortingArrow(column.sortDescending, colNum)}{this.renderInfoTooltip(column.infoTooltip, colNum)}
        </div>
      </th>);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(this.renderHeaderCell)}
        </tr>
      </thead>);
  }
}

function validateData(props, propName) {
  if (props[propName]) {
    if (props[propName].constructor && props[propName].constructor.name && props[propName].constructor.name.toLowerCase().indexOf('array') > -1) {
      return null;
    } else {
      return Error('Data element must be an array type');
    }
  }
  return null;
}

DataTable.defaultProps = {
  data: [],
  columns: [],
  showHeaderWhenEmpty: false,
  infiniteScroll: false,
  itemsPerPage: 20,
  width: '100%',
  loadMore: null,
  hasMore: false,
  loader: <div className="loader">Loading ...</div>,
  scrollElement: null,
  useWindow: true,
  rowVerticalPadding: 'medium',
  newDesign: false
};

DataTable.propTypes = {
  id: PropTypes.string,
  data: validateData,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]).isRequired,
    render: PropTypes.func.isRequired,
    sortable: PropTypes.bool,
    infoTooltipProps: PropTypes.shape(omit(Tooltip.propTypes, ['moveBy', 'dataHook'])),
    sortDescending: PropTypes.bool
  })).isRequired,
  showHeaderWhenEmpty: PropTypes.bool,
  rowDataHook: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  rowClass: PropTypes.string,
  dynamicRowClass: PropTypes.func,
  onRowClick: PropTypes.func,
  onMouseEnterRow: PropTypes.func,
  onMouseLeaveRow: PropTypes.func,
  infiniteScroll: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  width: PropTypes.string,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  loader: PropTypes.node,
  useWindow: PropTypes.bool,
  scrollElement: PropTypes.object,
  rowVerticalPadding: PropTypes.oneOf([
    'medium',
    'large'
  ]),
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thPadding: PropTypes.string,
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thHeight: PropTypes.string,
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thFontSize: PropTypes.string,
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thBorder: PropTypes.string,
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thColor: PropTypes.string,
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thOpacity: PropTypes.string,
  /** this prop is deprecated and should not be used
   * @deprecated
   */
  thBoxShadow: PropTypes.string,
  thLetterSpacing: PropTypes.string,
  rowDetails: PropTypes.func,
  allowMultiDetailsExpansion: PropTypes.bool,
  hideHeader: PropTypes.bool,
  newDesign: PropTypes.bool
};
DataTable.displayName = 'DataTable';

export default DataTable;
