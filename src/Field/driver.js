const find = (element, query) =>
  element.querySelector(query);

const fieldDriver = ({component, element}) => ({
  component: () => component,
  getChildren: () => find(element, '[data-hook="field-children"]'),
  getLabel: () => element.querySelector('[data-hook="field-label"]'),
  getAsterisk: () => element.querySelector('[data-hook="field-asterisk"]')
});

export default fieldDriver;
