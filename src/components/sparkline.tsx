import { useContext } from 'react'
import { HostContext } from '../context'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Fetch } from '../fetch';
import './sparkline.css';

const get_timeseries = async (host, nsid) => {
  // TODO: custom time period
  const resp = await fetch(`${host}/timeseries?collection=${nsid}`);
  if (!resp.ok) {
    throw new Error(`failed to fetch: ${resp}`);
  }
  return await resp.json();
}

export function Sparkline({ nsid, metric, height, lastSegment }) {
  const host = useContext(HostContext);
  metric = metric ?? 'dids_estimate';
  return (
    <div className={`sparkline-wrapper ${lastSegment ? 'week-for-day' : ''}`}>
      <Fetch
        key={nsid}
        using={get_timeseries}
        args={[host, nsid]}
        ok={({ series, range }) => (
          <SparkLineChart
            xAxis={{ data: range }}
            yAxis={{ min: 0 }}
            data={series[nsid].map(d => d[metric])}
            valueFormatter={v => `${v.toLocaleString()} unique users`}
            height={height ?? 32}
            showTooltip
            showHighlight
          />
        )}
      />
    </div>
  );
}
