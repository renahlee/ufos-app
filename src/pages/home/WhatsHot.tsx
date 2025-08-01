import { useMemo, useState } from "react";
import { ButtonGroup } from "../../components/buttons";
import { TopTile } from "./TopTile";
import { useWhatsHot } from "../../api";
import { ONE_HOUR_MS, PERIOD } from "../../constants";
import type { Period } from "../../types";

export function WhatsHot() {
  const [period, setPeriod] = useState<Period>("day");
  const now_ms = +new Date();
  const now_truncated = Math.floor(now_ms / ONE_HOUR_MS) * ONE_HOUR_MS;
  const period_ms = PERIOD[period];
  const since = new Date(now_truncated - period_ms).toISOString();
  const prior_since = new Date(now_truncated - 2.75 * period_ms).toISOString();

  const { data: recent, isLoading: isLoadingRecent } = useWhatsHot({
    since,
  });
  const { data: before, isLoading: isLoadingBefore } = useWhatsHot({
    since: prior_since,
    until: since,
  });

  const data = useMemo(() => {
    if (isLoadingRecent || isLoadingBefore) {
      return [];
    }

    if (before === undefined || recent === undefined || !("collections" in before) || !("collections" in recent)) {
      return [];
    }

    return recent.collections
      .map((current) => {
        const old = before.collections.find((older) => older.nsid === current.nsid);
        if (old && old.dids_estimate > 0) {
          const change = (current.dids_estimate - old.dids_estimate) / old.dids_estimate;
          return { change, current, old };
        }
      })
      .filter((c) => !!c)
      .toSorted((a, b) => b.change - a.change)
      .slice(0, 6);
  }, [isLoadingBefore, isLoadingRecent, before, recent]);

  return (
    <>
      <div className="top-tiles">
        <h2>What's hot</h2>
        <ButtonGroup
          options={[
            { val: "day", label: "today" },
            { val: "week", label: "this week" },
            { val: "month", label: "this month" },
          ]}
          current={period}
          onChange={setPeriod}
          subtle={true}
        />
      </div>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem 0.9rem",
          padding: "0",
          margin: "0.6rem 0",
        }}
      >
        {data.map((hot, i) => (
          <TopTile key={hot.current.nsid} rank={i + 1} nsid={hot.current.nsid} activeCount={hot.current.dids_estimate} change={hot.change} rankPeriod={period} />
        ))}
      </ol>
    </>
  );
}
