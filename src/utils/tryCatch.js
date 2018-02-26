export default async function tryCatch(f) {
  let res;
  let err;
  try {
    res = await f();
  } catch (_err) {
    err = _err;
  }

  return [err, res];
}
