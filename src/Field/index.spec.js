/* global describe it expect */

import React from 'react';
import {createDriverFactory} from '../test-common';
import fieldDriverFactory from './driver.js';

import Field from './';
import styles from './styles.scss';

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
    it('should be rendered with Text component', () => {
      const driver = createDriver(<Field label="hello label"/>);
      expect(driver.getLabel().innerHTML).toMatch(/Text.*hello label/);
    });

    it('should not render div when `label` is undefined', () => {
      const driver = createDriver(<Field/>);
      expect(driver.getLabel()).toEqual(null);
    });
  });

  describe('given `label` and `required` props', () => {
    it('should render asterisk', () => {
      const driver = createDriver(<Field label="hello" required/>);
      expect(driver.getAsterisk().innerHTML).toEqual('*');
    });
  });

  describe('given only `required` prop', () => {
    it('should render it next to input', () => {
      const driver = createDriver(<Field required/>);
      const asterisk = driver.getAsterisk();
      expect(asterisk.innerHTML).toEqual('*');
      expect(asterisk.className).toMatch(styles.asteriskInline);
    });
  });
});
