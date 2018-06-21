/* global describe it expect */

import React from 'react';
import {createDriverFactory} from '../test-common';
import fieldDriverFactory from './Field.driver.js';

import Field from './';

const createDriver = createDriverFactory(fieldDriverFactory);

describe('Field', () => {
  it('should pass sanity check', () => {
    const driver = createDriver(<Field/>);

    const component = driver.component();
    expect(component.type.displayName).toEqual('Field');
    expect(component.type.propTypes).not.toEqual(undefined);
    expect(component.type.defaultProps).not.toEqual(undefined);
  });

  it('should render children', () => {
    const driver = createDriver(<Field>hello</Field>);
    expect(driver.getChildren().innerHTML).toEqual('hello');
  });

  describe('`label` prop', () => {
    it('should be rendered under label hook', () => {
      const driver = createDriver(<Field label="hello label"/>);
      expect(driver.getLabel().innerHTML).toEqual('hello label');
    });

    it('should not render div when `label` is undefined', () => {
      const driver = createDriver(<Field/>);
      expect(driver.getLabel()).toEqual(null);
    });
  });
});
