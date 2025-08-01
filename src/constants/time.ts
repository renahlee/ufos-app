const ONE_HOUR_MS = 60 * 60 * 1000;
const ONE_DAY_MS = ONE_HOUR_MS * 24;
const ONE_WEEK_MS = ONE_DAY_MS * 7;
const ONE_MONTH_MS = ONE_WEEK_MS * 4;
const ONE_QUARTER_MS = ONE_MONTH_MS * 3;

const PERIOD = {
  day: ONE_DAY_MS,
  week: ONE_WEEK_MS,
  month: ONE_MONTH_MS,
  quarter: ONE_QUARTER_MS,
};

const INTERVAL = {
  day: ONE_DAY_MS / 2,
  week: ONE_WEEK_MS / 2,
  month: ONE_WEEK_MS,
};

export { ONE_HOUR_MS, ONE_DAY_MS, ONE_WEEK_MS, ONE_MONTH_MS, ONE_QUARTER_MS, PERIOD, INTERVAL };
