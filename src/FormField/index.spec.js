/* global describe it expect */

import React from 'react';
import {mount} from 'enzyme';

import {createDriverFactory, resolveIn} from '../test-common';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {formFieldTestkitFactory} from '../../testkit';
import {formFieldTestkitFactory as enzymeFormFieldTestkitFactory} from '../../testkit/enzyme';
import formFieldDriverFactory from './driver.js';

import FormField from './';

const createDriver = createDriverFactory(formFieldDriverFactory);

describe('FormField', () => {
  it('should pass sanity check', () => {
    const driver = createDriver(<FormField><div/></FormField>);

    const component = driver.component();
    expect(component.type.displayName).toEqual('FormField');
    expect(component.type.propTypes).not.toEqual(undefined);
    expect(component.type.defaultProps).not.toEqual(undefined);
  });

  it('should render children', () => {
    const driver = createDriver(<FormField>hello</FormField>);
    expect(driver.getChildren().innerHTML).toEqual('hello');
  });

  describe('`label` prop', () => {
    it('should be rendered with Text component', () => {
      const driver = createDriver(<FormField label="hello label"><div/></FormField>);
      expect(driver.getLabel().innerHTML).toMatch(/Text.*hello label/);
    });

    it('should not render div when `label` is undefined', () => {
      const driver = createDriver(<FormField><div/></FormField>);
      expect(driver.getLabel()).toEqual(null);
    });
  });

  describe('required', () => {
    describe('given `label` and `required` props', () => {
      it('should render as required', () => {
        const driver = createDriver(<FormField label="hello" required><div/></FormField>);
        expect(driver.isRequired()).toEqual(true);
      });
    });

    describe('given only `required` prop', () => {
      it('should render it inline', () => {
        const driver = createDriver(<FormField required><div/></FormField>);
        expect(driver.isRequired()).toEqual(true);
        expect(driver.isInline()).toEqual(true);
      });
    });

    it('should not render when `required` prop', () => {
      const driver = createDriver(<FormField><div/></FormField>);
      expect(driver.isRequired()).toEqual(false);
    });
  });

  describe('`info` icon with tooltip', () => {
    beforeEach(() => {
      document.body.innerHTML = ''; // required for tooltip element to be removed and not to leak in consecutive tests
    });

    describe('given `label`', () => {
      it('should be rendered', () => {
        const driver = createDriver(<FormField info="hello" label="hello"><div/></FormField>);
        expect(driver.getInfoTooltip()).not.toEqual(null);
      });

      it('should display value of `info` prop in tooltip', () => {
        const driver = createDriver(<FormField info="hello from tooltip"><div/></FormField>);
        const tooltip = driver.getInfoTooltip();

        tooltip.mouseEnter();

        return resolveIn(500).then(() => {
          expect(tooltip.getContent()).toBe('hello from tooltip');
        });
      });
    });

    describe('given only `info` prop', () => {
      it('should render it inline', () => {
        const driver = createDriver(<FormField info="hey there"><div/></FormField>);
        const tooltip = driver.getInfoTooltip();

        expect(driver.isInline()).toEqual(true);
        tooltip.mouseEnter();

        return resolveIn(500).then(() =>
          expect(tooltip.getContent()).toBe('hey there'));
      });
    });
  });

  describe('`value` prop', () => {
    it('should be proxied to children', () => {
      const field = mount(<FormField value="hello" children={<span/>}/>);
      expect(field.find('[data-hook="formfield-children"]').children().prop('value')).toEqual('hello');
    });
  });

  describe('`onChange` prop', () => {
    it('should be proxied to children and invoked when child calls it', () => {
      const onChange = jest.fn();
      const Child = ({onChange}) => <div onClick={onChange}/>; // eslint-disable-line react/prop-types
      const field = mount(<FormField onChange={onChange} children={<Child/>}/>);
      const fieldChildren = field.find('[data-hook="formfield-children"]').children();

      expect(fieldChildren.prop('onChange')).toEqual(onChange);
      fieldChildren.simulate('click');
      expect(onChange.mock.calls.length).toEqual(1);
    });
  });

  describe('`maxLength` prop', () => {
    describe('without `label` prop', () => {
      it('should not display value limit counter', () => {
        const driver = createDriver(<FormField maxLength={10}><div/></FormField>);
        expect(driver.getCounter()).toEqual(null);
      });
    });

    describe('with `label` prop', () => {
      it('should display value limit counter', () => {
        const driver = createDriver(<FormField label="hello" maxLength={87987}><div/></FormField>);
        expect(driver.getCounter().innerHTML).toMatch('87987');
      });

      it('should display result of maxLength - value.length', () => {
        const driver = createDriver(<FormField label="hello" value="12345" maxLength={87987}><div/></FormField>);
        expect(driver.getCounter().innerHTML).toMatch('87982');
      });

      it('should display with skin="error" when result < 0', () => {
        const driver = createDriver(<FormField label="hello" value="12345" maxLength={4}><div/></FormField>);
        expect(driver.getCounter().innerHTML).toMatch('skin="error"'); // TODO: use Text testkit from wix-ui-backoffice
      });
    });
  });

  describe('`valueLength` prop', () => {
    it('should be used instead of `value.length` when defined', () => {
      const driver = createDriver(<FormField label="hello" value="12345" valueLength={54327} maxLength={5}><div/></FormField>);
      expect(driver.getCounter().innerHTML).toMatch('-54322');
    });
  });

  describe('testkits', () => {
    it('should exist', () => {
      expect(isTestkitExists(<FormField><div/></FormField>, formFieldTestkitFactory)).toBe(true);
    });

    it('should exist for enzyme', () => {
      expect(isEnzymeTestkitExists(<FormField><div/></FormField>, enzymeFormFieldTestkitFactory, mount)).toBe(true);
    });
  });
});
