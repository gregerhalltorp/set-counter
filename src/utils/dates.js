const yearCompare = (dateA, dateB) => dateA.getUTCFullYear() < dateB.getUTCFullYear();

const monthCompare = (dateA, dateB) =>
  (dateA.getUTCFullYear() === dateB.getUTCFullYear()
    ? dateA.getUTCMonth() < dateB.getUTCMonth()
    : yearCompare(dateA, dateB));

const dayCompare = (dateA, dateB) => {
  if (
    dateA.getUTCFullYear() === dateB.getUTCFullYear() &&
    dateA.getUTCMonth() === dateB.getUTCMonth()
  ) {
    return dateA.getUTCDate() < dateB.getUTCDate();
  }
  return monthCompare(dateA, dateB);
};

export const isBefore = (dateA, dateB, segment = false) => {
  if (!dateA || !dateA.constructor === Date) {
    throw new Error('bad dateA');
  }

  if (!segment) {
    return dateA < dateB;
  }

  if (segment === 'year') {
    return yearCompare(dateA, dateB);
  }

  if (segment === 'month') {
    return monthCompare(dateA, dateB);
  }

  if (segment === 'day') {
    return dayCompare(dateA, dateB);
  }

  throw new Error();
};
