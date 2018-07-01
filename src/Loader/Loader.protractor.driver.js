import css from './Loader.scss';
import textDriverFactory from '../Deprecated/Text/Text.protractor.driver';
import {protractorTestkitFactoryCreator} from '../test-common';

const textTestkitFactory = protractorTestkitFactoryCreator(textDriverFactory);

const hasClass = (element, styles, cls) => {
  return element
    .getAttribute('class')
    .then(classes => classes.split(' ').some(c => c.includes(styles[cls])));
};

const loaderDriverFactory = component => {
  const textDriver = textTestkitFactory({dataHook: 'loader-text'});

  return {
    element: () => component,
    isTiny: () => hasClass(component, css, 'tiny'),
    isSmall: () => hasClass(component, css, 'small'),
    isMedium: () => hasClass(component, css, 'medium'),
    isLarge: () => hasClass(component, css, 'large'),
    getColor: () => hasClass(component, css, 'blue').then(hasClass => hasClass ? 'blue' : 'white'),
    hasText: () => textDriver.element().isPresent(),
    getText: () => textDriver.getText()
  };
};

export default loaderDriverFactory;
