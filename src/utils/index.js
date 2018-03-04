export const dateReviver = (key, value) =>
  (~key.toLowerCase().indexOf('date') ? new Date(value) : value);
