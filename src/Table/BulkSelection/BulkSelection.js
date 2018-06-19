import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

export const BulkSelectionState = Object.freeze({
  ALL: '_all_',
  NONE: '_none_',
  SOME: '_some_'
});

function getSelectionsCount(selections) {
  return selections.reduce((total, current) => current ? total + 1 : total, 0);
}

function getNextBulkSelectionState(selections) {
  const numOfSelected = getSelectionsCount(selections);
  const numOfRows = selections.length;
  return numOfSelected === 0 ? BulkSelectionState.NONE :
    numOfSelected === numOfRows ? BulkSelectionState.ALL : BulkSelectionState.SOME;
}

/**
 * BulkSelection manages the state and logic of bulk selection.
 * Given an array of selectable items, it manages a bulk selection state (ALL, SOME, NONE),
 * and provides helper methods for modifying the state.
 *
 * toggleBulkSelection(): changes the bulk state according to these state changes: ALL->NONE, SOME->ALL, NONE->ALL
 */
export class BulkSelection extends React.Component {

  constructor(props) {
    super(props);
    const selections = props.selections.slice();
    this.state = {
      selections
    };
  }


  // This method is equivilant to the React 16 Lifecycle method getDerivedStateFromProps
  static _getDerivedStateFromProps(props, state) {
    return isEqual(props.selections, state.selections) ? null : {selections: props.selections.slice()};
  }

  componentWillReceiveProps(nextProps) {
    const newState = BulkSelection._getDerivedStateFromProps(nextProps, this.state);
    newState && this.setState(newState);
  }

  toggleAll = enable => {
    return this.state.selections.map(() => enable);
  }

  toggleBulkSelection = () => {
    let selections;
    const bulkSelectionState = getNextBulkSelectionState(this.state.selections);
    if (bulkSelectionState === BulkSelectionState.SOME) {
      selections = this.toggleAll(true);
    } else if (bulkSelectionState === BulkSelectionState.ALL) {
      selections = this.toggleAll(false);
    } else {
      selections = this.toggleAll(true);
    }
    this.setSelection({selections});
  }

  setSelection = ({selections}) => {
    this.setState({selections});
    this.props.onSelectionChanged && this.props.onSelectionChanged(selections);
  }

  toggleItem = rowNum => {
    const selections = this.state.selections.slice();
    selections[rowNum] = !selections[rowNum];
    this.setSelection({selections});
  }

  getStateAndHelpers() {
    return {
      isSelected: rowNum => !!this.state.selections[rowNum],
      toggleItem: this.toggleItem,
      toggleAll: this.toggleAll,
      setSelection: this.setSelection,
      toggleBulkSelection: this.toggleBulkSelection,
      getBulkSelectionState: () => getNextBulkSelectionState(this.state.selections)
    };
  }

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

BulkSelection.defaultProps = {
  selections: []
};

BulkSelection.propTypes = {
  /** Array of row selection boolean states. Should correspond in length to the data prop */
  selections: PropTypes.arrayOf(PropTypes.bool),
  /** Called when row selection changes. Receives the updated selection array as argument. */
  onSelectionChanged: PropTypes.func,
  /** child as a function which receives the BulkSelection context */
  children: PropTypes.func
};



