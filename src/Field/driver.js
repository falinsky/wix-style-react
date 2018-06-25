import {tooltipTestkitFactory} from '../../testkit';

const findByHook = (element, hook) =>
  element.querySelector(`[data-hook*="${hook}"]`);

const getInfoIcon = element =>
  findByHook(element, 'field-infoicon');

const fieldDriver = ({component, element}) => ({
  exists: () => !!element,
  element: () => element,
  component: () => component,
  getChildren: () => findByHook(element, 'field-children'),
  getLabel: () => findByHook(element, 'field-label'),
  getAsterisk: () => findByHook(element, 'field-asterisk'),
  getInfoIcon: () => getInfoIcon(element),
  getInfoTooltip: () =>
    tooltipTestkitFactory({
      wrapper: getInfoIcon(element),
      dataHook: 'field-infotooltip'
    })
});

export default fieldDriver;
