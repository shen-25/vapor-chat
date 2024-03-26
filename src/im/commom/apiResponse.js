export function isSuccess(code) {
  return code === 0;
}
export function isError(code) {
  return !isSuccess(code);
}
