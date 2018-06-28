/* global describe it expect */

import React from 'react';
import {mount} from 'enzyme';

import {createDriverFactory, resolveIn} from '../test-common';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {formFieldTestkitFactory} from '../../testkit';
import {formFieldTestkitFactory as enzymeFormFieldTestkitFactory} from '../../testkit/enzyme';
import formFieldDriverFactory from './FormField.driver';

import FormField from './';

const createDriver = createDriverFactory(formFieldDriverFactory);

describe('FormField', () => {
  it('should have correct displayName', () => {
    const component = mount(<FormField><div/></FormField>);
    expect(component.name()).toEqual('FormField');
  });

  describe('`label` prop', () => {
    it('should render contents', () => {
      const driver = createDriver(<FormField label="hello label"><div/></FormField>);
      expect(driver.getLabel().innerHTML).toMatch(/hello label/);
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

  describe('`infoContent` icon with tooltip', () => {
    beforeEach(() => {
      document.body.innerHTML = ''; // required for tooltip element to be removed and not to leak in consecutive tests
    });

    describe('given `label`', () => {
      it('should be rendered', () => {
        const driver = createDriver(<FormField infoContent="hello" label="hello"><div/></FormField>);
        expect(driver.getInfoTooltip()).not.toEqual(null);
      });

      it('should display value of `infoContent` prop in tooltip', () => {
        const driver = createDriver(<FormField infoContent="hello from tooltip"><div/></FormField>);
        const tooltip = driver.getInfoTooltip();

        tooltip.mouseEnter();

        return resolveIn(500).then(() => {
          expect(tooltip.getContent()).toBe('hello from tooltip');
        });
      });
    });

    describe('given only `infoContent` prop', () => {
      it('should render it inline', () => {
        const driver = createDriver(<FormField infoContent="hey there"><div/></FormField>);
        const tooltip = driver.getInfoTooltip();

        expect(driver.isInline()).toEqual(true);
        tooltip.mouseEnter();

        return resolveIn(500).then(() =>
          expect(tooltip.getContent()).toBe('hey there'));
      });
    });
  });

  describe('`children` prop', () => {
    class Children extends React.Component {
      componentDidMount() {
        this.props.onMount(); // eslint-disable-line react/prop-types
      }
      render() {
        return <div/>;
      }
    }

    it('should be rendered', () => {
      const driver = createDriver(<FormField>hello</FormField>);
      expect(driver.getChildren().innerHTML).toEqual('hello');
    });

    describe('when function', () => {
      it('should receive setCharactersLeft', () => {
        const children = jest.fn();
        createDriver(<FormField children={children}/>);
        expect(typeof children.mock.calls[0][0].setCharactersLeft).toBe('function');
      });

      describe('with `label` prop', () => {
        it('should display counter when `setCharactersLeft` called', () => {
          const driver = createDriver(
            <FormField label="hello">
              {({setCharactersLeft}) =>
                <Children onMount={() => setCharactersLeft(87987)}/>
              }
            </FormField>
          );

          expect(driver.getLengthLeft()).toBe(87987);
        });

        it('should display different color when result < 0', () => {
          const driver = createDriver(
            <FormField label="hello">
              {({setCharactersLeft}) => <Children onMount={() => setCharactersLeft(-1)}/>}
            </FormField>
          );

          expect(driver.isLengthExceeded()).toBe(true);
        });
      });

      describe('without `label` prop', () => {
        it('should not display counter', () => {
          const driver = createDriver(
            <FormField>
              {({setCharactersLeft}) => <Children onMount={() => setCharactersLeft(123456)}/>}
            </FormField>
          );
          expect(driver.getLengthLeft()).toEqual(null);
        });
      });
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
