# `<Table/>`

> A Table component for displaying data, with selection column and header & footer which are aware of the selection state.

### Column object props

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string or node | - | true | A string or any element, the column's header title  |
| render | function | - | true | A function to render column cells. The function will be called with each row's data and should return a jsx element. Signature: `render(rowData, rowNum)` |
| width | string | - | - | The width to apply to the column. No value means column will try to contain its children, if possible.  |
| important | bool | false | - | Whether font color should be stronger, more dominant |
| sortable | bool | false | - | Enables sorting by column |
| sortDescending | bool | - | - | Pass false - for ascending sort, true - for descending|
| infoTooltipProps | object | - | - | Props object for [tooltip](https://wix-wix-style-react.surge.sh/?selectedKind=7.%20Tooltips&selectedStory=7.1.%20Tooltip&full=0&addons=0&stories=1&panelRight=0). Note: dataHook, moveBy and children will not be passed to tooltip. |

### Children

The `<Talbe/>` component acts as a Table context provider, and the compound components which consume it are:
 - `<Table.Header/>`
 - `<Table.Content/>`
   - props:
     - titleBarVisible: boolean - wether to display the column's title bar (`<thead>`) or not. (defaults to  `true`)
 - `<Table.Footer/>`

#### BulkSelectionContext

All consumers require a single child as a function which receives the following BulkSelectionContext as an argument:
(interface is described in Typescript format for convenience)
```ts
import {BulkSelectionState} from 'wix-style-react/Table';

interface BulkSelectionContext {
  // Getters
  
  /** Is the selecttion count > 0 */
  isAnySelected: () => boolean,
  /** Get the BulkSelectionState, which can have 3 possible values: ALL, SOME, NONE */
  getBulkSelectionState: () => BulkSelectionState,
  /** Get the number of selected items */
  getNumSelected: () => number,
  /** Is the item with the given id selected. (id comes from the rowData.id if exists, if not then it is the rowIndex) */
  isSelected: (id: string | number) => boolean,
  
  // Modifiers
  /** Toggle the selection state (selected/not-selected) of an item by id */
  toggleSelectionById: (id: string | number) => void,
  /** Toggles the bulk selection state: NONE -> ALL, SOME -> ALL, ALL -> NONE */ 
  toggleBulkSelection: () => void,
  /** Select all items */
  selectAll: () => void,
  /** Deselect all items (clear selection) */
  deselectAll: () => void,
  /** Set the selection */
  setSelectedIds: (Array<string> | Array<number>) => void
```

#### For example:

```js
<Table>
  <Table.Header>
    {({getNumSelected}) => (
      <span>{`${getNumSelected()} Selected`}</span>
    )}
  </Table.Header>
  <Table.Content/>
</Table>
```

# Playground (generated Code section is incomplete!!! See Examples section)
