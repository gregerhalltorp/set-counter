const yearCompare = (dateA, dateB) => dateA.getFullYear() < dateB.getFullYear();

const monthCompare = (dateA, dateB) =>
  (dateA.getFullYear() === dateB.getFullYear()
    ? dateA.getMonth() < dateB.getMonth()
    : yearCompare(dateA, dateB));

const dayCompare = (dateA, dateB) => {
  if (dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth()) {
    return dateA.getDate() < dateB.getDate();
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
