import {tooltipTestkitFactory} from '../../testkit';

const findByHook = (element, hook) =>
  element.querySelector(`[data-hook*="${hook}"]`);

const getInfoIcon = element =>
  findByHook(element, 'formfield-infoicon');

const getLengthLeft = element => {
  const counter = findByHook(element, 'formfield-counter');
  if (counter) {
    const count = counter.querySelector('span').innerHTML;
    return parseInt(count, 10);
  }

  return null;
};

const formFieldDriver = ({component, element}) => ({
  exists: () => !!element,
  element: () => element,
  component: () => component,
  getChildren: () => findByHook(element, 'formfield-children'),
  getLabel: () => findByHook(element, 'formfield-label'),
  isRequired: () => !!findByHook(element, 'formfield-asterisk'),
  isInline: () => !!findByHook(element, 'formfield-inline-suffixes'),
  getLengthLeft: () => getLengthLeft(element),
  isLengthExceeded: () => {
    const length = getLengthLeft(element);
    if (length) {
      return length < 0;
    }
    return false;
  },
  getInfoTooltip: () =>
    tooltipTestkitFactory({
      wrapper: getInfoIcon(element),
      dataHook: 'formfield-infotooltip'
    })
});

export default formFieldDriver;
