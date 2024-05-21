export function hasDuplicates(array: string | any[]) {
  if (array?.length) {
    return new Set(array).size !== array.length;
  }
}
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}
export function convertToDate(dateString: string) {
  //  Convert a "dd/MM/yyyy" string into a Date object
  let d = dateString.split('/');
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
  return dat;
}

export function daysTo(date1: Date, date2: Date) {
  const DifferenceBetweenTime = date2.getTime() - date1.getTime();
  const DifferenceInDays = Math.round(DifferenceBetweenTime / (1000 * 3600 * 24));

  return DifferenceInDays;
}
