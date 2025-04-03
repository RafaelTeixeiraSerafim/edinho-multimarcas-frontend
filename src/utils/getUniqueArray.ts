export function getUniqueArray<T>(array: T[]) {
  return [...new Set(array)];
}
