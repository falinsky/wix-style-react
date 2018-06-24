import React from 'react';
import {string, number, arrayOf, oneOfType, func, any} from 'prop-types';
import isEqual from 'lodash/isEqual';
import createReactContext from 'create-react-context';
export const BulkSelectionContext = createReactContext();

export const BulkSelectionState = Object.freeze({
  ALL: '_all_',
  NONE: '_none_',
  SOME: '_some_'
});


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
    this.state = {
      selectedIds: (props.selectedIds || []).slice()
    };
  }

  getSelectedCount() {
    return this.state.selectedIds.length;
  }

  getBulkSelectionState() {
    const numOfSelected = this.getSelectedCount();
    const numOfItems = this.props.allIds.length;
    return numOfSelected === 0 ? BulkSelectionState.NONE :
      numOfSelected === numOfItems ? BulkSelectionState.ALL : BulkSelectionState.SOME;
  }

  // This method is equivilant to the React 16 Lifecycle method getDerivedStateFromProps
  static _getDerivedStateFromProps(props, state) {
    if (!props.selectedIds) {
      return null;
    }
    return isEqual(props.selectedIds, state.selectedIds) ? null : {selectedIds: props.selectedIds.slice()};
  }

  componentWillReceiveProps(nextProps) {
    const newState = BulkSelection._getDerivedStateFromProps(nextProps, this.state);
    newState && this.setState(newState);
    //TODO: should we call the onSelectionChanged callback here?
  }

  toggleAll = enable => {
    if (enable) {
      this.setSelectedIds(this.props.allIds);
    } else {
      this.setSelectedIds([]);
    }
  }

  toggleBulkSelection = () => {
    const bulkSelectionState = this.getBulkSelectionState();
    if (bulkSelectionState === BulkSelectionState.SOME) {
      this.toggleAll(true);
    } else if (bulkSelectionState === BulkSelectionState.ALL) {
      this.toggleAll(false);
    } else {
      this.toggleAll(true);
    }
  }

  isSelected = id => {
    return this.state.selectedIds.indexOf(id) !== -1;
  }

  toggleSelectionById = id => {
    this.setSelectedIds(
      this.isSelected(id) ?
      this.state.selectedIds.filter(_id => _id !== id) :
      this.state.selectedIds.concat(id)
    );
  }

  setSelectedIds = selectedIds => {
    if (!Array.isArray(selectedIds)) {
      throw new Error('selectedIds must be an array');
    }
    this.setState({selectedIds}, () => {
      this.props.onSelectionChanged && this.props.onSelectionChanged(selectedIds.slice());
    });
  }

  stateAndHelpers = {
    // Getters
    isAnySelected: () => this.getSelectedCount() > 0,
    getBulkSelectionState: () => this.getBulkSelectionState(),
    getNumSelected: () => this.getSelectedCount(),
    isSelected: this.isSelected,
    // Modifiers
    toggleSelectionById: this.toggleSelectionById,
    toggleBulkSelection: this.toggleBulkSelection,
    selectAll: () => this.toggleAll(true),
    deselectAll: () => this.toggleAll(false),
    setSelectedIds: this.setSelectedIds
  };

  render() {
    return (
      <BulkSelectionContext.Provider
        value={this.stateAndHelpers}
        >
        {this.props.children}
      </BulkSelectionContext.Provider>
    );
  }
}

BulkSelection.propTypes = {
  /** Array of item selection boolean states. Should correspond in length to the data prop */
  selectedIds: oneOfType([arrayOf(string), arrayOf(number)]),
  /** An array of all item ids (string ids) */
  allIds: oneOfType([arrayOf(string), arrayOf(number)]).isRequired,
  /** Called when item selection changes. Receives the updated selectedIds array as argument. */
  onSelectionChanged: func,
  /** Any - can consume the BulkSelectionProvider context */
  children: any
};



