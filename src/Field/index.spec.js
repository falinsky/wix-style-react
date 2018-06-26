/* global describe it expect */

import React from 'react';
import {mount} from 'enzyme';

import {createDriverFactory, resolveIn} from '../test-common';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {fieldTestkitFactory} from '../../testkit';
import {fieldTestkitFactory as enzymeFieldTestkitFactory} from '../../testkit/enzyme';
import fieldDriverFactory from './driver.js';

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

  describe('`value` prop', () => {
    it('should be proxied to children', () => {
      const field = mount(<Field value="hello" children={<span/>}/>);
      expect(field.find('[data-hook="field-children"]').children().prop('value')).toEqual('hello');
    });
  });

  describe('`onChange` prop', () => {
    it('should be proxied to children and invoked when child calls it', () => {
      const onChange = jest.fn();
      const Child = ({onChange}) => <div onClick={onChange}/>; // eslint-disable-line react/prop-types
      const field = mount(<Field onChange={onChange} children={<Child/>}/>);
      const fieldChildren = field.find('[data-hook="field-children"]').children();

      expect(fieldChildren.prop('onChange')).toEqual(onChange);
      fieldChildren.simulate('click');
      expect(onChange.mock.calls.length).toEqual(1);
    });
  });

  describe('`maxLength` prop', () => {
    describe('without `label` prop', () => {
      it('should not display value limit counter', () => {
        const driver = createDriver(<Field maxLength={10}/>);
        expect(driver.getCounter()).toEqual(null);
      });
    });

    describe('with `label` prop', () => {
      it('should display value limit counter', () => {
        const driver = createDriver(<Field label="hello" maxLength={87987}/>);
        expect(driver.getCounter().innerHTML).toMatch('87987');
      });

      it('should display result of maxLength - value.length', () => {
        const driver = createDriver(<Field label="hello" value="12345" maxLength={87987}/>);
        expect(driver.getCounter().innerHTML).toMatch('87982');
      });

      it('should display with skin="error" when result < 0', () => {
        const driver = createDriver(<Field label="hello" value="12345" maxLength={4}/>);
        expect(driver.getCounter().innerHTML).toMatch('skin="error"'); // TODO: use Text testkit from wix-ui-backoffice
      });
    });
  });

  describe('`valueLength` prop', () => {
    it('should be used instead of `value.length` when defined', () => {
      const driver = createDriver(<Field label="hello" value="12345" valueLength={54327} maxLength={5}/>);
      expect(driver.getCounter().innerHTML).toMatch('-54322');
    });
  });

  describe('testkits', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Field/>, fieldTestkitFactory)).toBe(true);
    });

    it('should exist for enzyme', () => {
      expect(isEnzymeTestkitExists(<Field/>, enzymeFieldTestkitFactory, mount)).toBe(true);
    });
  });
});
