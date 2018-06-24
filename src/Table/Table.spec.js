import TableDriverFactory from './Table.driver';
import React from 'react';
import Table from './Table';
import DataTable from '../DataTable';
import ReactTestUtils from 'react-dom/test-utils';
import {createDriverFactory} from '../test-common';
import {tableTestkitFactory} from '../../testkit';
import {tableTestkitFactory as enzymeTableTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Table', () => {
  const createDriver = createDriverFactory(TableDriverFactory);
  const createEnzymeDriver = component => {
    const dataHook = 'someDataHook';
    const wrapper = mount(React.cloneElement(component, {dataHook}));
    const driver = enzymeTableTestkitFactory({wrapper, dataHook});
    return {driver, wrapper};
  };

  const ID_1 = 'aaa', ID_2 = 'bbb';
  const defaultProps = {
    id: 'id',
    data: [{id: ID_1, a: 'value 1', b: 'value 2'}, {id: ID_2, a: 'value 3', b: 'value 4'}],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    rowClass: 'class-name',
    showSelection: true,
    children: <Table.Content/>
  };
  const noneSelected = () => [];
  const firstSelected = () => [ID_1];
  const secondSelected = () => [ID_2];
  const allSelected = () => [ID_1, ID_2];

  it('should pass id prop to child', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  describe('showSelection prop', () => {
    it('should display selection column', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      expect(driver.isRowCheckboxVisible(1)).toBeTruthy();
      expect(driver.isBulkSelectionCheckboxVisible()).toBeTruthy();
    });

    it('should not display selection column', () => {
      const driver = createDriver(<Table {...defaultProps} showSelection={false}/>);
      expect(driver.isRowCheckboxVisible(1)).toBeFalsy();
      expect(driver.isBulkSelectionCheckboxVisible()).toBeFalsy();
    });
  });

  describe('selectedIds prop', () => {
    it('should select rows according to selectedIds prop given string ids', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should select rows according to selectedIds prop given numeric ids', () => {
      const ID_1 = 1234, ID_2 = 1235;
      const driver = createDriver(
        <Table
          {...defaultProps}
          data={[{id: ID_1, a: 'value 1', b: 'value 2'}, {id: ID_2, a: 'value 3', b: 'value 4'}]}
          selectedIds={[ID_1]}
          />);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should select rows according to selectedIds prop given row index as ids', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          data={[{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}]}
          selectedIds={[0]}
          />);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should update selection if selection prop has change', async () => {
      const selectedIds = [];
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
      expect(driver.isRowSelected(0)).toBeFalsy();
      wrapper.setProps({selectedIds: firstSelected()});
      expect(driver.isRowSelected(0)).toBeTruthy();
    });

    //TODO: It seems that DataTable.render is not called (verified with console.log). But this test shows it does.
    xit('should NOT re-render DataTable when new props are set but selection has NOT changed', async () => {
      const {wrapper} = createEnzymeDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      const renderMock = jest.fn();
      wrapper.find(DataTable).instance().render = renderMock;
      wrapper.setProps({selectedIds: firstSelected()});
      expect(renderMock.mock.calls.length).toBe(0);
    });
  });

  describe('row selection', () => {
    it('should select row when checkbox clicked given row not selected', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeTruthy();
    });

    it('should unselect row when checkbox clicked given row selected', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={allSelected()}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeFalsy();
    });
  });

  describe('re-render', () => {
    it('should re-render on data update', () => {
      const props = {
        id: 'id',
        columns: [
          {title: 'Row Num', render: (row, rowNum) => rowNum},
          {title: 'A', render: row => row.a},
          {title: 'B', render: row => row.b}
        ],
        rowClass: 'class-name'
      };
      const data = [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}];
      const {driver, wrapper} = createEnzymeDriver(<Table {...props} data={data}/>);
      const newValue = 'value 1 changed';
      const COLUMN_A_INDEX = 1;
      const ROW_INDEX = 0;
      data[ROW_INDEX].a = newValue;
      wrapper.setProps({data});
      expect(driver.getCell(ROW_INDEX, COLUMN_A_INDEX).textContent).toBe(newValue);
    });

    it('should keep selection when re-rendered given selectedIds not provided (Uncontrolled)', () => {
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeTruthy();
      wrapper.setProps({...defaultProps});
      expect(driver.isRowSelected(1)).toBeTruthy();
    });
  });

  describe('BulkSelection', () => {
    describe('initial render', () => {
      it('should display bulk-selection as checked when all rows are selected', () => {
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        expect(driver.isBulkSelectionChecked()).toBeTruthy();
        expect(driver.isBulkSelectionUnchecked()).toBeFalsy();
        expect(driver.isBulkSelectionIndeterminate()).toBeFalsy();
      });

      it('should display bulk-selection as unchecked when no rows are selected', () => {
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        expect(driver.isBulkSelectionUnchecked()).toBeTruthy();
        expect(driver.isBulkSelectionChecked()).toBeFalsy();
      });

      it('should display bulk-selection as partial when some rows are selected', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        expect(driver.isBulkSelectionIndeterminate()).toBeTruthy();
      });
    });

    describe('Update row selection', () => {
      it('should select all rows when bulk-selection checkbox clicked given no checkboxes are checked', () => {
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeTruthy();
        expect(driver.isRowSelected(1)).toBeTruthy();
      });

      it('should select all rows when bulk-selection checkbox clicked given some checkboxes are checked', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeTruthy();
        expect(driver.isRowSelected(1)).toBeTruthy();
      });

      it('should unselect all rows when bulk-selection checkbox clicked given all checkboxes are checked', () => {
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeFalsy();
        expect(driver.isRowSelected(1)).toBeFalsy();
      });
    });

    describe('onSelectionChanged', () => {
      it('should call onSelectionChanged when bulk-selection checkbox clicked given no checkboxes are checked', () => {
        const onSelectionChanged = jest.fn();
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds} onSelectionChanged={onSelectionChanged}/>);
        driver.clickBulkSelectionCheckbox();
        expect(onSelectionChanged).toHaveBeenCalledWith(allSelected());
      });

      it('should call onSelectionChanged when row selected given no checkboxes are checked', () => {
        const onSelectionChanged = jest.fn();
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds} onSelectionChanged={onSelectionChanged}/>);
        driver.clickRowChecbox(0);
        expect(onSelectionChanged.mock.calls.length).toBe(1);
        expect(onSelectionChanged).toHaveBeenCalledWith(firstSelected());
      });
    });

    describe('Update BulkSelection', () => {
      it('should check bulk-selection checkbox when all rows change to check', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(0);
        expect(driver.isBulkSelectionChecked()).toBeTruthy();
      });

      it('should uncheck bulk-selection checkbox when all rows change to not-selected', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(1);
        expect(driver.isBulkSelectionUnchecked()).toBeTruthy();
      });

      it('should show partial in bulk-selection checkbox when row unselected given all rows selected', () => {
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(1);
        expect(driver.isBulkSelectionIndeterminate()).toBeTruthy();
      });

      it('should show partial in bulk-selection checkbox when row selected given all rows not selected', () => {
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(1);
        expect(driver.isBulkSelectionIndeterminate()).toBeTruthy();
      });
    });
  });

  describe('Compound components', () => {
    it('should NOT have any compound components', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={noneSelected()}
          />
        );
      expect(!!driver.getHeader()).toBeFalsy();
      expect(!!driver.getFooter()).toBeFalsy();
      expect(!!driver.getTitleBar()).toBeFalsy();
    });

    it('should have Table.Header with BulkSelectionContext', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={allSelected()}
          >
          <Table.Header>
            {({getNumSelected}) => <div>{`${getNumSelected()} Selected`}</div>}
          </Table.Header>
          <Table.Content/>
        </Table>
        );
      expect(!!driver.getHeader()).toBeTruthy();
      expect(driver.getHeader().textContent).toBe('2 Selected');
    });

    it('should have Table.Footer with BulkSelectionContext', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={allSelected()}
          >
          <Table.Content/>
          <Table.Footer>
            {({getNumSelected}) => <div>{`${getNumSelected()} Selected`}</div>}
          </Table.Footer>
        </Table>
        );
      expect(!!driver.getFooter()).toBeTruthy();
      expect(driver.getFooter().textContent).toBe('2 Selected');
    });

    it('should have Table.TitleBar', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={allSelected()}
          >
          <div>
            <Table.TitleBar/>
          </div>
          <div>
            <Table.Content titleBarVisible={false}/>
          </div>
        </Table>
        );
      expect(!!driver.getTitleBar()).toBeTruthy();
      expect(driver.isBulkSelectionCheckboxVisible()).toBeTruthy();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>
        <Table
          dataHook={dataHook}
          {...defaultProps}
          />
      </div>));
      const dataTableTestkit = tableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Table {...defaultProps} dataHook={dataHook}/>);
      const dataTableTestkit = enzymeTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });
});
