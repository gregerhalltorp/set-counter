export const dateReviver = (key, value) =>
  (~key.toLowerCase().indexOf('date') ? new Date(value) : value);

export const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});