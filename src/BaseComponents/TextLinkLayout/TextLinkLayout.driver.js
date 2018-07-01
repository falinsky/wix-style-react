import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const textLinkLayoutDriverFactory = ({element, wrapper, component}) => {

  return {
    exists: () => !!element,
    getContent: () => element.textContent,
    doesComponentHasClass: className => element.className.includes(className),
    isDarkBackground: () => element.style._values.color === 'rgb(240, 244, 247)',
    isGreyScale: () => element.style._values.color === 'rgb(22, 45, 61)',
    hover: () => ReactTestUtils.Simulate.mouseEnter(element),
    isUnderline: () => element.style._values['text-decoration'] === 'underline',
    getDisplay: () => element.style._values.display,
    isLightBackground: () => element.style._values.color === 'rgb(56, 153, 236)',
    getSize: () => element.classList.contains('t1_3') ? 'medium' : element.classList.contains('t3_3') ? 'small' : 'unknown',
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    },
    getColor: () => element.style._values.color
  };
};

export default textLinkLayoutDriverFactory;
