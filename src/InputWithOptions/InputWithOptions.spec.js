import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';

import inputWithOptionsDriverFactory from './InputWithOptions.driver';
import InputWithOptions from './InputWithOptions';
import {createDriverFactory} from '../test-common';
import {makeControlled} from '../../test/utils';
import {inputWithOptionsTestkitFactory} from '../../testkit';
import {inputWithOptionsTestkitFactory as enzymeInputWithOptionsTestkitFactory} from '../../testkit/enzyme';

const runInputWithOptionsTest = driverFactory => {
  describe('InputWithOptions', () => {
    const ControlledInputWithOptions = makeControlled(InputWithOptions);

    const createDriver = createDriverFactory(driverFactory);
    const options = [
      {id: 0, value: 'Option 1'},
      {id: 1, value: 'Option 2'},
      {id: 2, value: 'Option 3', disabled: true},
      {id: 3, value: 'Option 4'},
      {id: 'divider1', value: '-'},
      {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}
    ];

    it('should show dropdown when autofocus is on', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} autoFocus/>);
      expect(inputDriver.isFocus()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should have an Input and an hidden DropdownLayout', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      expect(inputDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should show DropdownLayout when input get focused', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.focus();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    describe('showOptionsIfEmptyInput property', () => {
      describe('show options if input is empty (default behaviour)', () => {
        it('should show DropdownLayout if input is empty and focused', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              showOptionsIfEmptyInput
              options={options}
              />
          );

          driver.inputDriver.focus();
          expect(driver.dropdownLayoutDriver.isShown()).toBe(true);
        });
      });

      describe('do not show options if input is empty', () => {
        it('should not show DropdownLayout if input is empty and focused', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              showOptionsIfEmptyInput={false}
              options={options}
              />
          );

          driver.inputDriver.focus();
          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
        });

        it('should show DropdownLayout if initial value passed and input focused', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              showOptionsIfEmptyInput={false}
              value={options[0].value}
              options={options}
              />
          );

          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
          driver.inputDriver.focus();
          expect(driver.dropdownLayoutDriver.isShown()).toBe(true);
        });

        it('should show DropdownLayout if text was entered', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              showOptionsIfEmptyInput={false}
              options={options}
              />
          );

          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
          driver.inputDriver.focus();
          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
          driver.inputDriver.enterText('some value');
          expect(driver.dropdownLayoutDriver.isShown()).toBe(true);
        });

        it('should not show DropdownLayout if input was emptied', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              showOptionsIfEmptyInput={false}
              options={options}
              />
          );

          driver.inputDriver.enterText('some value');
          driver.inputDriver.clearText();
          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
        });

        it('should not show DropdownLayout if input is empty and no char was produced by keypress', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              showOptionsIfEmptyInput={false}
              options={options}
              />
          );

          driver.inputDriver.trigger('keyDown', {
            key: 37 // <Left Arrow> key code
          });
          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
        });

        it('should hide options on option select', () => {
          const driver = createDriver(
            <ControlledInputWithOptions
              value="some value"
              showOptionsIfEmptyInput={false}
              options={options}
              closeOnSelect
              onSelect={function (option) {
                this.setState({value: option.value});
              }}
              />
          );

          driver.inputDriver.focus();
          driver.dropdownLayoutDriver.clickAtOption(0);
          expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
        });
      });
    });

    it('should show DropdownLayout on any key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.pressAnyKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on down key', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on up key', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.pressDownKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should hide DropdownLayout on enter and esc key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.focus();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEnterKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEscKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should start keyboard navigation from last selected option when re-opening the dropdown layout', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} selectedId={1}/>);
      driver.focus();

      dropdownLayoutDriver.clickAtOption(1);
      driver.outsideClick();
      driver.focus();

      expect(dropdownLayoutDriver.isOptionSelected(1)).toBeTruthy();
      expect(dropdownLayoutDriver.isOptionHovered(1)).toBeTruthy();

      driver.pressDownKey(); // going to skip disabled option at index 2
      expect(dropdownLayoutDriver.isOptionHovered(3)).toBeTruthy();
    });

    it('should call onManuallyInput on enter key press with a trimed value', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('my text      ');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('my text', undefined);
    });

    it('should call onManuallyInput on enter key press', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('my text');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('my text', undefined);
    });

    it('should call onManuallyInput on tab key press', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('my text');
      driver.pressTabKey();
      expect(onManuallyInput).toBeCalledWith('my text', undefined);
    });

    it('should close dropdown on press tab key', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.focus();
      driver.pressDownKey();
      expect(inputDriver.isFocus()).toBe(true);
      expect(dropdownLayoutDriver.isShown()).toBe(true);
      driver.pressTabKey();
      // todo: jest limitation of mimicking native Tab browser behaviour
      // expect(inputDriver.isFocus()).toBe(false);
      expect(dropdownLayoutDriver.isShown()).toBe(false);
    });

    it('should stay focused on tab key press with closeOnSelect=false', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput} closeOnSelect={false}/>);
      inputDriver.focus();
      inputDriver.enterText('Option 1');
      driver.pressDownKey();
      expect(inputDriver.isFocus()).toBe(true);
      driver.pressTabKey();
      expect(inputDriver.isFocus()).toBe(true);
      expect(dropdownLayoutDriver.isShown()).toBe(true);
    });

    it('should suggest an option when calling onManuallyInput', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManuallyInput}/>);
      inputDriver.enterText('Option 2');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('Option 2', {id: 1, value: 'Option 2'});
    });

    it('should hide options on selection by default', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should hide options on outside click', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options}/>);
      driver.outsideClick();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should not hide options on selection', () => {
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} closeOnSelect={false}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should call onSelect when an option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onSelect={onSelect}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).toBeCalledWith(options[0]);
    });

    it('should not call onSelect when a selected option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver(<InputWithOptions options={options} onSelect={onSelect} selectedId={options[0].id}/>);
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).not.toBeCalled();
    });

    it('should call onFocus', () => {
      const onFocus = jest.fn();
      const {driver} = createDriver(<InputWithOptions options={options} onFocus={onFocus}/>);
      driver.focus();
      expect(onFocus).toBeCalled();
    });

    it('should call onBlur if clicked outside and input is focused', () => {
      const onBlur = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onBlur={onBlur}/>);
      driver.outsideClick();
      expect(onBlur).not.toBeCalled();
      driver.focus();
      driver.outsideClick();
      inputDriver.blur(); // apparently, jsdom does not fire onBlur after input.blur() is called
      expect(onBlur).toBeCalled();
    });

    it('should not call onManuallyInput when composing text via external means', () => {
      const onManualInput = jest.fn();
      const {driver, inputDriver} = createDriver(<InputWithOptions options={options} onManuallyInput={onManualInput}/>);
      inputDriver.startComposing();
      driver.pressEnterKey();
      expect(onManualInput).not.toBeCalled();
      inputDriver.endComposing();
      driver.pressEnterKey();
      expect(onManualInput).toBeCalled();
    });

    it('should wrap all options to highlighter component if prop highlight true', () => {
      const {driver} = createDriver(<InputWithOptions options={options} highlight/>);
      expect(driver.isOptionWrappedToHighlighter(options[0].id)).toBeTruthy();

      driver.setProps({highlight: false});
      expect(driver.isOptionWrappedToHighlighter(options[0].id)).toBeFalsy();
    });

    // TODO
    it.skip('should change input value when an option is pressed', () => {
      const driver = createDriver(
        <InputWithOptions
          options={options}
          />
      );
      driver.inputDriver.focus();

      const OPTION_INDEX = 0;
      driver.dropdownLayoutDriver.clickAtOption(OPTION_INDEX);
      expect(driver.inputDriver.getValue()).toBe(options[OPTION_INDEX].value);
    });

    // TODO
    it.skip('should invoke onChange with proper event object when an option is pressed', () => {
      const onChange = jest.fn();
      const driver = createDriver(
        <InputWithOptions
          options={options}
          value="some value"
          onChange={onChange}
          />
      );
      driver.inputDriver.focus();

      const OPTION_INDEX = 0;
      driver.dropdownLayoutDriver.clickAtOption(OPTION_INDEX);
      expect(onChange).toBeCalled();
      expect(onChange.mock.calls[0][0].target.value).toBe(options[OPTION_INDEX].value);
    });

    it('should support autocomplete prop', () => {
      const {inputDriver} = createDriver(<InputWithOptions autocomplete="off"/>);
      expect(inputDriver.getAutocomplete()).toBe('off');
    });

    it('should support tabIndex prop', () => {
      const {dropdownLayoutDriver} = createDriver(<InputWithOptions tabIndex={-1}/>);
      expect(dropdownLayoutDriver.tabIndex()).toBe(-1);
    });

    it('should support required prop', () => {
      const {inputDriver} = createDriver(<InputWithOptions required/>);
      expect(inputDriver.getRequired()).toBeTruthy();
    });

    describe('onKeyDown', () => {
      it('should bahave normal when external onKeyDown passed', () => {
        const {driver, dropdownLayoutDriver} = createDriver(
          <InputWithOptions options={options} onKeyDown={() => null}/>
        );
        driver.focus();
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        driver.pressEnterKey();
        expect(dropdownLayoutDriver.isShown()).toBeFalsy();
        driver.pressUpKey();
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        driver.pressEscKey();
        expect(dropdownLayoutDriver.isShown()).toBeFalsy();
      });
    });

    describe('onSelect', () => {
      it('should call onSelect on enter key press', () => {
        const onSelect = jest.fn();
        const {driver} = createDriver(<InputWithOptions options={options} onSelect={onSelect}/>);
        driver.focus();
        driver.pressDownKey();
        driver.pressEnterKey();
        expect(onSelect).toBeCalledWith(options[0]);
      });

      it('should call onSelect on tab key press', () => {
        const onSelect = jest.fn();
        const {driver} = createDriver(<InputWithOptions options={options} onSelect={onSelect}/>);
        driver.focus();
        driver.pressDownKey();
        driver.pressTabKey();
        expect(onSelect).toBeCalledWith(options[0]);
      });

      it('should not call onSelect on space key press', () => {
        const onSelect = jest.fn();
        const {driver} = createDriver(<InputWithOptions options={options} onSelect={onSelect}/>);
        driver.focus();
        driver.pressDownKey();
        driver.pressSpaceKey();
        expect(onSelect).not.toHaveBeenCalled();
      });

      it('should call onSelect on space key press in readOnly mode', () => {
        const onSelect = jest.fn();
        class ReadOnlyInput extends InputWithOptions {
          inputAdditionalProps = () => ({readOnly: true})
        }
        const {driver} = createDriver(<ReadOnlyInput options={options} onSelect={onSelect}/>);
        driver.focus();
        driver.pressDownKey();
        driver.pressSpaceKey();
        expect(onSelect).toBeCalledWith(options[0]);
      });
    });


    describe('testkit', () => {
      it('should exist', () => {
        const div = document.createElement('div');
        const dataHook = 'myDataHook';
        const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><InputWithOptions dataHook={dataHook}/></div>));
        const inputWithOptionsTestkit = inputWithOptionsTestkitFactory({wrapper, dataHook});
        expect(inputWithOptionsTestkit.driver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.inputDriver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      });
    });

    describe('enzyme testkit', () => {
      it('should exist', () => {
        const dataHook = 'myDataHook';
        const wrapper = mount(<InputWithOptions dataHook={dataHook}/>);
        const inputWithOptionsTestkit = enzymeInputWithOptionsTestkitFactory({wrapper, dataHook});
        expect(inputWithOptionsTestkit.driver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.inputDriver.exists()).toBeTruthy();
        expect(inputWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      });
    });

    describe('appearance', () => {
      it('should be possible to specify the theme of underlying elements', () => {
        const props = {theme: 'material', dataHook: 'myDataHook'};
        const wrapper = mount(<InputWithOptions {...props}/>);
        const testkit = enzymeInputWithOptionsTestkitFactory({wrapper, dataHook: props.dataHook});
        expect(testkit.inputDriver.isOfStyle(props.theme)).toBe(true);
        expect(testkit.dropdownLayoutDriver.hasTheme(props.theme)).toBe(true);
      });
    });

  });
};

runInputWithOptionsTest(inputWithOptionsDriverFactory);

export {runInputWithOptionsTest};
