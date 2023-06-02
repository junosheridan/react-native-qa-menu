export default function objType(obj) {
  if (
    obj !== null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    typeof obj[Symbol.iterator] === 'function'
  ) {
    return 'Iterable'
  }
  return Object.prototype.toString.call(obj).slice(8, -1)
}
