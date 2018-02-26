const IS_IMMUTABLE_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';

// We do not want to include immutablejs in this lib (+100kb).
// Immutable.Iterable.isIterable cannot be accessed directly; hence we simply
// reimplement it!
//
// See: https://github.com/facebook/immutable-js/blob/master/src/Iterable.js
export function isImmutableIterable(maybeImmutable) {
  // eslint-disable-line import/prefer-default-export
  return !!(maybeImmutable && maybeImmutable[IS_IMMUTABLE_ITERABLE_SENTINEL]);
}
