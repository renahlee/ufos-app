import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import "./sparkline.css";
import { useTimeseries } from "../api";
import type { Interval } from "../types";

const fromISO = (d) => new Date(d);
const toLocale = (d) => d.toLocaleString();

interface Props {
  nsid: string;
  height?: number;
  metric: any;
  period: Interval;
  interval: Interval;
  measuring: any;
  lastSegment: any;
}

export function Sparkline({ nsid, metric, height, period, interval, lastSegment, measuring }: Props) {
  metric = metric ?? "dids_estimate";
  period = period ?? "week";
  interval = interval ?? "day";
  measuring = measuring ?? "unique users";

  const lastSegName = `${period}-for-${interval}`;
  const { data, isLoading, isError } = useTimeseries({
    interval,
    period,
    nsid,
  });

  if (isLoading) {
    return (
      <div style={{ height: height ?? 32 }} className="sparkline-wrapper sparkline-loading">
        <span>Loading&hellip;</span>
      </div>
    );
  }

  if (isError) {
    // TODO: implement error handling
    return null;
  }

  return (
    <div className={`sparkline-wrapper ${lastSegName ? `last-seg ${lastSegName}` : ""}`}>
      <SparkLineChart
        xAxis={{
          data: data !== undefined && "range" in data ? data.range.map(fromISO) : [],
          valueFormatter: toLocale,
        }}
        yAxis={{ min: 0 }}
        data={
          data !== undefined && "series" in data && nsid in data.series ? data.series[nsid].map((d) => d[metric]) : []
        }
        valueFormatter={(v) => (v === null ? "" : `${v.toLocaleString()} ${measuring}`)}
        height={height ?? 32}
        color="hsl(210, 94%, 63%)"
        showTooltip
        showHighlight
      />
    </div>
  );
}
