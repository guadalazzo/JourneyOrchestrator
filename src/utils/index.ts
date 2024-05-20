export function hasDuplicates(array: string | any[]) {
  if (array?.length) {
    return new Set(array).size !== array.length;
  }
}
