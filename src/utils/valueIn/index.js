import { isImmutableIterable } from './helpers';

export const NOT_FOUND_TOKEN = undefined;
const INPUT_STRING_SPLIT = '.';

const toArr = (path) => {
  if (typeof path === 'string') {
    return path.split(INPUT_STRING_SPLIT);
  }

  if (Object.prototype.toString.call(path) === '[object Array]') {
    return [].concat(path);
  }

  return [];
};

const valueIn = (target, path) => {
  const pathArr = toArr(path);

  if (typeof target === 'undefined' || target === null) {
    return NOT_FOUND_TOKEN;
  }

  if (!pathArr.length) {
    return target;
  }

  let ptr = target;
  while (pathArr.length) {
    if (ptr === undefined || ptr === null) {
      return NOT_FOUND_TOKEN;
    }

    ptr = isImmutableIterable(ptr) ? ptr.get(pathArr.shift()) : ptr[pathArr.shift()];
  }

  return ptr;
};

valueIn.array = (array, key) => {
  return !!array && !!array.indexOf && !!~array.indexOf(key);
};

export default valueIn;
