function* tryCatch(f, ...args) {
  let err;
  let res;

  try {
    res = yield f(...args);
  } catch (e) {
    err = e;
  } finally {
    return { err, res }; // eslint-disable-line no-unsafe-finally
  }
}

export const REACTUTILSCONFIG = {
  entry: ['regenerator-runtime/runtime'],
};
// entry: ['regenerator-runtime/runtime', __dirname + '/index.js'],

export default tryCatch;
