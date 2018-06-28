import {tooltipTestkitFactory} from '../../testkit';
import typography from '../../Typography';

const findByHook = (element, hook) =>
  element.querySelector(`[data-hook*="${hook}"]`);

const getInfoIcon = element =>
  findByHook(element, 'formfield-infoicon');

const getCharactersCounter = element =>
  findByHook(element, 'formfield-counter');

const formFieldDriver = ({element}) => ({
  exists: () => !!element,
  element: () => element,
  getChildren: () => findByHook(element, 'formfield-children'),
  getLabel: () => findByHook(element, 'formfield-label'),
  isRequired: () => !!findByHook(element, 'formfield-asterisk'),
  isInline: () => !!findByHook(element, 'formfield-inline-suffixes'),
  getLengthLeft: () => {
    const counter = getCharactersCounter(element);
    return counter ? parseInt(counter.innerHTML, 10) : null;
  },
  isLengthExceeded: () => {
    const counter = getCharactersCounter(element);
    if (counter) {
      return counter.classList.contains(typography.t3_5);
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
