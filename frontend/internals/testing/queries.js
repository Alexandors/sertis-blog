export const queryAllBySelector = (container, selector) => {
  const elements = container.querySelectorAll(selector);
  if (elements && elements.length) return elements;
  return null;
};

export const queryBySelector = (...args) => {
  const elements = queryAllBySelector(...args);
  if (elements && elements.length > 0) return elements[0];
  return null;
};

export const getAllBySelector = (...args) => queryAllBySelector(...args);

export const getBySelector = (...args) => queryBySelector(...args);
