export const NO_DEFAULT = '@__ACTION_CREATOR__NO_DEFAULT';

export default (metaConfig = {}) => (type, { ...props } = {}) => (rawData = {}) => {
  const data = {};

  Object.keys(props).forEach((prop) => {
    if ({}.hasOwnProperty.call(rawData, prop)) {
      data[prop] = rawData[prop];
    } else if (props[prop] !== NO_DEFAULT) {
      data[prop] = props[prop];
    }
  });

  const action = { type, data };

  if (metaConfig[type]) {
    action.meta = metaConfig[type];
  }

  return action;
};
