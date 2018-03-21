import { createSelector } from 'reselect';

export const mapSelectorsToProps = (selectorsMap, propMapper) => {
  const selectors = [];

  const selectorNames = Object.keys(selectorsMap).map((key) => {
    selectors.push(selectorsMap[key]);
    return key;
  });

  return () => {
    const newSelector = createSelector(selectors, (...args) => {
      const props = {};
      for (let i = 0; i < args.length; ++i) {
        props[selectorNames[i]] = args[i];
      }
      return props;
    });
    return (state, props) => {
      const transformedProps =
        propMapper && typeof propMapper === 'function' ? propMapper(props) : props;
      return newSelector(state, transformedProps);
    };
  };
};
