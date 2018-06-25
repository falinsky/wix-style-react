import {tooltipTestkitFactory} from '../../testkit';

const find = (element, query) =>
  element.querySelector(query);

const getInfoIcon = element =>
  element.querySelector('[data-hook^="field-infoicon"]');

const fieldDriver = ({component, element}) => ({
  component: () => component,
  getChildren: () => find(element, '[data-hook^="field-children"]'),
  getLabel: () => element.querySelector('[data-hook^="field-label"]'),
  getAsterisk: () => element.querySelector('[data-hook^="field-asterisk"]'),
  getInfoIcon: () => getInfoIcon(element),
  getInfoTooltip: () =>
    tooltipTestkitFactory({
      wrapper: getInfoIcon(element),
      dataHook: 'field-infotooltip'
    })
});

export default fieldDriver;
