import React from 'react';
import {mount} from 'enzyme';
import {BulkSelectionConsumer} from './BulkSelectionConsumer';

describe('BulkSelection', () => {
  it('should throw error when consumer is not within a BulkSelection', () => {
    const create = () => mount(<BulkSelectionConsumer>{() => null}</BulkSelectionConsumer>);
    expect(create).toThrow();

  });

  it('should throw custom error when consumer is not within a BulkSelection', () => {

    const create = () => mount(
      <BulkSelectionConsumer noContextMsg="the message">
        {() => null}
      </BulkSelectionConsumer>
      );
    expect(create).toThrow('the message');

  });
});
