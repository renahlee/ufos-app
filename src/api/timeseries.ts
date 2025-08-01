import { useQuery } from "@tanstack/react-query";
import { INTERVAL, ONE_HOUR_MS, PERIOD } from "../constants";
import { useContext } from "react";
import { HostContext } from "../context";
import type { Interval, Period } from "../types";

interface Props {
  interval: Interval;
  period: Period;
  nsid: string;
}

const useTimeseries = ({ interval, period, nsid }: Props) => {
  const host = useContext(HostContext);
  const now_ms = +new Date();
  const now_hours = Math.floor(now_ms / ONE_HOUR_MS);
  const now_truncated = now_hours * ONE_HOUR_MS;
  const period_ms = PERIOD[period];
  const interval_ms = INTERVAL[interval];

  const since = new Date(now_truncated - period_ms).toISOString();

  const url = `${host}/timeseries`;
  const params = new URLSearchParams();

  params.set("collection", nsid);
  params.set("since", since);
  params.set("step", `${interval_ms / 1000}`);

  return useQuery({
    queryKey: ["timeseries", nsid],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
  });
};

export { useTimeseries };
