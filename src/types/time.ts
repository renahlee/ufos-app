import type { INTERVAL, PERIOD } from "../constants";

type Period = keyof typeof PERIOD;
type Interval = keyof typeof INTERVAL;

export type { Period, Interval };
