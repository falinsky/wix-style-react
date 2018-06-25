/* global describe it expect */

import React from 'react';
import {createDriverFactory, resolveIn} from '../test-common';
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

  describe('required asterisk', () => {
    describe('given `label` and `required` props', () => {
      it('should render asterisk', () => {
        const driver = createDriver(<Field label="hello" required/>);
        expect(driver.getAsterisk().innerHTML).toEqual('*');
      });
    });

    describe('given only `required` prop', () => {
      it('should render it inline', () => {
        const driver = createDriver(<Field required/>);
        const asterisk = driver.getAsterisk();
        expect(asterisk.innerHTML).toEqual('*');
        expect(asterisk.attributes['data-hook'].value).toEqual('field-asterisk-inline');
      });
    });
  });

  describe('`info` icon', () => {
    describe('given `label`', () => {
      it('should render it', () => {
        const driver = createDriver(<Field info="hello" label="hello"/>);
        expect(driver.getInfoIcon()).not.toEqual(null);
      });

      it('should display value of `info` in tooltip', () => {
        const driver = createDriver(<Field info="hello from tooltip"/>);
        const tooltip = driver.getInfoTooltip();

        tooltip.mouseEnter();

        return resolveIn(500).then(() => {
          expect(tooltip.getContent()).toBe('hello from tooltip');
        });
      });
    });

    describe('given only `info` prop', () => {
      it('should render inline', () => {
        const driver = createDriver(<Field info="hello"/>);
        const infoIcon = driver.getInfoIcon();
        expect(infoIcon.attributes['data-hook'].value).toEqual('field-infoicon-inline');
      });
    });
  });
});
