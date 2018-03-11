function* tryCatch(f, ...args) {
  let err;
  let res;
  try {
    res = yield f(...args);
  } catch (e) {
    err = e;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { err, res };
  }
}

export const REACTUTILSCONFIG = {
  entry: ['regenerator-runtime/runtime'],
};
// entry: ['regenerator-runtime/runtime', __dirname + '/index.js'],

export default tryCatch;
