import {tooltipTestkitFactory} from '../../testkit';

const findByHook = (element, hook) =>
  element.querySelector(`[data-hook*="${hook}"]`);

const getInfoIcon = element =>
  findByHook(element, 'formfield-infoicon');

const formFieldDriver = ({component, element}) => ({
  exists: () => !!element,
  element: () => element,
  component: () => component,
  getChildren: () => findByHook(element, 'formfield-children'),
  getLabel: () => findByHook(element, 'formfield-label'),
  getAsterisk: () => findByHook(element, 'formfield-asterisk'),
  getInfoIcon: () => getInfoIcon(element),
  getCounter: () => findByHook(element, 'formfield-counter'),
  getInfoTooltip: () =>
    tooltipTestkitFactory({
      wrapper: getInfoIcon(element),
      dataHook: 'formfield-infotooltip'
    })
});

export default formFieldDriver;
