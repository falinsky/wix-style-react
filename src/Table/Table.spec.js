import TableDriverFactory from './Table.driver';
import React from 'react';
import Table from './Table';
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

  const defaultProps = {
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    rowClass: 'class-name',
    showSelection: true,
    children: <Table.Content/>
  };

  const withSelection = {
    selections: [true, false],
    showSelection: true
  };

  it('should pass id prop to child', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  describe('showSelection prop', () => {
    it('should display selection column', () => {
      const driver = createDriver(<Table {...defaultProps} {...withSelection}/>);
      expect(driver.isRowCheckboxVisible(1)).toBeTruthy();
      expect(driver.isBulkSelectionCheckboxVisible()).toBeTruthy();
    });

    it('should not display selection column', () => {
      const driver = createDriver(<Table {...defaultProps} showSelection={false}/>);
      expect(driver.isRowCheckboxVisible(1)).toBeFalsy();
      expect(driver.isBulkSelectionCheckboxVisible()).toBeFalsy();
    });
  });

  describe('selection prop', () => {
    it('should select rows according to selection prop', () => {
      const driver = createDriver(<Table {...defaultProps} {...withSelection}/>);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should update selection if selection prop has change', async () => {
      const selections = [false, false];
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps} selections={selections}/>);
      selections[0] = true;
      wrapper.setProps({selections});
      expect(driver.isRowSelected(0)).toBeTruthy();
    });

    it('should NOT reupdate selection if selection prop has change', async () => {
      const selections = [false, false];
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps} selections={selections}/>);
      selections[0] = true;
      wrapper.setProps({selections});
      expect(driver.isRowSelected(0)).toBeTruthy();
    });
  });

  describe('row selection', () => {
    it('should select row when checkbox clicked give row not selected', () => {
      const driver = createDriver(<Table {...defaultProps} {...withSelection}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeTruthy();
    });

    it('should unselect row when checkbox clicked give row selected', () => {
      const driver = createDriver(<Table {...defaultProps} selections={[true, true]}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeFalsy();
    });
  });

  describe('data prop', () => {
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
  });

  describe('BulkSelection', () => {
    describe('initial render', () => {
      it('should display bulk-selection as checked when all rows are selected', () => {
        const selections = [true, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        expect(driver.isBulkSelectionChecked()).toBeTruthy();
        expect(driver.isBulkSelectionUnchecked()).toBeFalsy();
        expect(driver.isBulkSelectionIndeterminate()).toBeFalsy();
      });

      it('should display bulk-selection as unchecked when no rows are selected', () => {
        const selections = [false, false];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        expect(driver.isBulkSelectionUnchecked()).toBeTruthy();
        expect(driver.isBulkSelectionChecked()).toBeFalsy();
      });

      it('should display bulk-selection as partial when some rows are selected', () => {
        const selections = [false, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        expect(driver.isBulkSelectionIndeterminate()).toBeTruthy();
      });
    });

    describe('Update row selection', () => {
      it('should select all rows when bulk-selection checkbox clicked given no checkboxes are checked', () => {
        const selections = [false, false];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeTruthy();
        expect(driver.isRowSelected(1)).toBeTruthy();
      });

      it('should select all rows when bulk-selection checkbox clicked given some checkboxes are checked', () => {
        const selections = [false, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeTruthy();
        expect(driver.isRowSelected(1)).toBeTruthy();
      });

      it('should unselect all rows when bulk-selection checkbox clicked given all checkboxes are checked', () => {
        const selections = [true, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeFalsy();
        expect(driver.isRowSelected(1)).toBeFalsy();
      });
    });

    describe('onSelectionChanged', () => {
      it('should call onSelectionChanged when bulk-selection checkbox clicked given no checkboxes are checked', () => {
        const onSelectionChanged = jest.fn();
        const selections = [false, false];
        const driver = createDriver(<Table {...defaultProps} selections={selections} onSelectionChanged={onSelectionChanged}/>);
        driver.clickBulkSelectionCheckbox();
        expect(onSelectionChanged).toHaveBeenCalledWith([true, true]);
      });

      it('should call onSelectionChanged when row selected given no checkboxes are checked', () => {
        const onSelectionChanged = jest.fn();
        const selections = [false, false];
        const driver = createDriver(<Table {...defaultProps} selections={selections} onSelectionChanged={onSelectionChanged}/>);
        driver.clickRowChecbox(0);
        expect(onSelectionChanged.mock.calls.length).toBe(1);
        expect(onSelectionChanged).toHaveBeenCalledWith([true, false]);
      });
    });

    describe('Update BulkSelection', () => {
      it('should check bulk-selection checkbox when all rows change to check', () => {
        const selections = [false, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        driver.clickRowChecbox(0);
        expect(driver.isBulkSelectionChecked()).toBeTruthy();
      });

      it('should uncheck bulk-selection checkbox when all rows change to not-selected', () => {
        const selections = [false, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        driver.clickRowChecbox(1);
        expect(driver.isBulkSelectionUnchecked()).toBeTruthy();
      });

      it('should show partial in bulk-selection checkbox when row unselected given all rows selected', () => {
        const selections = [true, true];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
        driver.clickRowChecbox(1);
        expect(driver.isBulkSelectionIndeterminate()).toBeTruthy();
      });

      it('should show partial in bulk-selection checkbox when row selected given all rows not selected', () => {
        const selections = [false, false];
        const driver = createDriver(<Table {...defaultProps} selections={selections}/>);
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
          selections={[false, false]}
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
          selections={[true, true]}
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
          selections={[true, true]}
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
          selections={[true, true]}
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
