import React from 'react';
import inputDriverFactory from '../Input/Input.driver';
import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';
import ReactDOM from 'react-dom';

const inputWithOptionsDriverFactory = ({element, wrapper, component}) => {

  const inputWrapper = element && element.childNodes[0];
  const inputDriver = element && inputDriverFactory({element: inputWrapper.childNodes[0], wrapper: inputWrapper});
  const dropdownLayoutDriver = element && dropdownLayoutDriverFactory({element: element.childNodes[1].childNodes[0], wrapper});

  const driver = {
    exists: () => !!element,
    isReadOnly: () => inputDriver.getReadOnly() && inputWrapper.className.includes('readonly'),
    inputWrapper: () => inputWrapper,
    focus: () => inputDriver.focus(),
    blur: () => dropdownLayoutDriver.mouseClickOutside(),
    pressDownKey: () => inputDriver.keyDown('ArrowDown'),
    pressUpKey: () => inputDriver.keyDown('ArrowUp'),
    pressAnyKey: () => inputDriver.keyDown('Any'),
    pressEnterKey: () => inputDriver.keyDown('Enter'),
    pressSpaceKey: () => inputDriver.keyDown(' '),
    pressTabKey: () => inputDriver.keyDown('Tab'),
    pressEscKey: () => inputDriver.keyDown('Escape'),
    outsideClick: () => document.body.dispatchEvent(new Event('mouseup', {cancelable: true})),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    },
    isOptionWrappedToHighlighter: optionId => {
      const {element} = dropdownLayoutDriver.optionById(optionId);
      return !!element().querySelector(`[data-hook=highlighter-${optionId}]`);
    }
  };
  return {
    exists: () => driver.exists(),
    driver,
    inputDriver,
    dropdownLayoutDriver
  };
};

export default inputWithOptionsDriverFactory;
