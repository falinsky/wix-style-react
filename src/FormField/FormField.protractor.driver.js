const fieldDriverFactory = component => {
  const byHook = hook => component.$(`[data-hook*=${hook}]`);

  return {
    element: () => component,
    getLabel: () => byHook('field-label'),
    getAsterisk: () => byHook('field-asterisk'),
    getInfoIcon: () => byHook('field-infoicon')
  };
};

export default fieldDriverFactory;
