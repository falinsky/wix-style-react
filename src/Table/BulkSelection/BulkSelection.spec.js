import React from 'react';
import {mount} from 'enzyme';
import {BulkSelectionConsumer} from './BulkSelectionConsumer';
import {BulkSelection} from './BulkSelection';

describe('BulkSelection', () => {
  describe('BulkSelectionConsumer error', () => {
    it('should throw error when consumer is not within a BulkSelection', () => {
      const create = () => mount(<BulkSelectionConsumer>{() => null}</BulkSelectionConsumer>);
      expect(create).toThrow();
    });

    it('should throw custom error when consumer is not within a BulkSelection', () => {
      const create = () => mount(
        <BulkSelectionConsumer consumerCompName="Consumer" providerCompName="Provider">
          {() => null}
        </BulkSelectionConsumer>
      );
      expect(create).toThrow('Consumer cannot be rendered outside the Provider component');
    });
  });

  it('setSelectionIds & isSelected', () => {
    let _setSelectedIds, _isSelected;
    mount(
      <BulkSelection allIds={[1, 2, 3]}>
        <BulkSelectionConsumer>
          {({setSelectedIds, isSelected}) => {
            _setSelectedIds = setSelectedIds;
            _isSelected = isSelected;
            return (
              <div/>
            );
          }}
        </BulkSelectionConsumer>
      </BulkSelection>
    );
    expect(_isSelected(1)).toBeFalsy();
    expect(_isSelected(2)).toBeFalsy();
    expect(_isSelected(3)).toBeFalsy();
    _setSelectedIds([1, 2]);
    expect(_isSelected(1)).toBeTruthy();
    expect(_isSelected(2)).toBeTruthy();
    expect(_isSelected(3)).toBeFalsy();
  });
});

