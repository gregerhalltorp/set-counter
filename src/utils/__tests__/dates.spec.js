import { isBefore } from '../dates';

// TODO: Tests to handle bad inputs
// TODO: Tests for different days on years and months?
describe('isBefore', () => {
  // it('throws on undefined dateA', () => {
  //   let a;
  //   const b = new Date();
  //   expect(isBefore(a, b)).toThrow('bad dateA');
  // });
  describe('no segment', () => {
    it('returns true if no segment is provided and a is before b', () => {
      const a = new Date();
      const b = new Date(a.getTime() + 1000);
      expect(isBefore(a, b)).toBe(true);
    });
    it('returns false if no segment is provided and a is after b', () => {
      const a = new Date();
      const b = new Date(a.getTime() - 1000);
      expect(isBefore(a, b)).toBe(false);
    });
  });

  describe('year', () => {
    it('returns true for "year" if year of a is less than year of b', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-01-01'), 'year')).toBe(true);
    });
    it('returns false for "year" if year of a is more than year of b', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-01-01'), 'year')).toBe(false);
    });
  });

  describe('month', () => {
    it('returns true for "month" if year of a is less than year of b, same month', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-01-01'), 'month')).toBe(true);
    });
    it('returns true for "month" if year of a is less than year of b, month of a less', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-10-01'), 'month')).toBe(true);
    });
    it('returns true for "month" if year of a is less than year of b, month of a more', () => {
      expect(isBefore(new Date('2017-10-01'), new Date('2018-01-01'), 'month')).toBe(true);
    });
    it('returns false for "month" if year of a is more than year of b, same month', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-01-01'), 'month')).toBe(false);
    });
    it('returns false for "month" if year of a is more than year of b, month of a less', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-10-01'), 'month')).toBe(false);
    });
    it('returns false for "month" if year of a is more than year of b, month of a more', () => {
      expect(isBefore(new Date('2018-10-01'), new Date('2017-01-01'), 'month')).toBe(false);
    });
    it('returns true for "month" if same year and month of a is less than month of b', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2018-02-01'), 'month')).toBe(true);
    });
    it('returns false for "month" if same year and month of a is more than month of b', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2018-02-01'), 'month')).toBe(true);
    });
  });

  describe('day', () => {
    it('returns true for "day" if year of a is less than year of b, same month and day', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-01-01'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, same month, day of a less', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-01-10'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, same month, day of a more', () => {
      expect(isBefore(new Date('2017-01-10'), new Date('2018-01-01'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, month of a less, same day', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-10-01'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, month of a less, day of a more', () => {
      expect(isBefore(new Date('2017-01-10'), new Date('2018-10-01'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, month of a less, day of a less', () => {
      expect(isBefore(new Date('2017-01-01'), new Date('2018-10-10'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, month of a more, same day', () => {
      expect(isBefore(new Date('2017-10-01'), new Date('2018-01-01'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, month of a more, day of a more', () => {
      expect(isBefore(new Date('2017-10-10'), new Date('2018-01-01'), 'day')).toBe(true);
    });
    it('returns true for "day" if year of a is less than year of b, month of a more, day of a less', () => {
      expect(isBefore(new Date('2017-10-01'), new Date('2018-01-10'), 'day')).toBe(true);
    });
    it('returns false for "day" if year of a is more than year of b, same month and day', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-01-01'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, same month, day of a less', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-01-10'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, same month, day of a more', () => {
      expect(isBefore(new Date('2018-01-10'), new Date('2017-01-01'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, month of a less, same day', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-10-01'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, month of a less, day of a more', () => {
      expect(isBefore(new Date('2018-01-10'), new Date('2017-10-01'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, month of a less, day of a less', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2017-10-10'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, month of a more, same day', () => {
      expect(isBefore(new Date('2018-10-01'), new Date('2017-01-01'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, month of a more, day of a more', () => {
      expect(isBefore(new Date('2018-10-10'), new Date('2017-01-01'), 'day')).toBe(false);
    });
    it('returns false for "day" if year of a is more than year of b, month of a more, day of a less', () => {
      expect(isBefore(new Date('2018-10-01'), new Date('2017-01-10'), 'day')).toBe(false);
    });
    it('returns true for "day" if same year, same month, day of a is less', () => {
      expect(isBefore(new Date('2018-01-01'), new Date('2018-01-10'), 'day')).toBe(true);
    });
    it('returns false for "day" if same year, same month, day of a is more', () => {
      expect(isBefore(new Date('2018-01-10'), new Date('2018-01-01'), 'day')).toBe(false);
    });
  });
});
