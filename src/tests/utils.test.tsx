import { convertToDate, hasDuplicates, changeDateFormatTo, formateForDateInput, daysTo } from '../utils';
import { expect, test } from '@jest/globals';

test("hasDuplicates to be true when ['a','a']", () => {
  expect(hasDuplicates(['a', 'a'])).toBe(true);
});

test("hasDuplicates to be false when ['a','b']", () => {
  expect(hasDuplicates(['a', 'b'])).toBe(false);
});

test('convertToDate returns date object', () => {
  expect(convertToDate('02/03/1999')).toBeInstanceOf(Date);
});

test('changeDateFormatTo changes the format 2019-02-01 to 01/02/2019', () => {
  expect(changeDateFormatTo('2019-02-01')).toBe('01/02/2019');
});

test('formateForDateInput changes the format 01/02/2019 to 2019-02-01', () => {
  expect(formateForDateInput('01/02/2019')).toBe('2019-02-01');
});

test('daysTo gives the amount of days between two dates', () => {
  const date1 = convertToDate('01/02/2019');
  const date2 = convertToDate('04/02/2019');
  expect(daysTo(date1, date2)).toBe(3);
});
