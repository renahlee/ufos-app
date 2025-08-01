import { useMemo, useState } from "react";
import { ButtonGroup } from "../../components/buttons";
import { TopTile } from "./TopTile";
import { useCollection } from "../../api";
import type { Period } from "../../types";

export function TopCollections() {
  const [period, setPeriod] = useState<Period>("day");

  const { data, isLoading } = useCollection({ period });

  const tops = useMemo(() => {
    const seen = new Set();
    const tops: any[] = [];

    if (data === undefined || !("collections" in data) || data.collections === undefined) {
      return [];
    }

    for (const c of data.collections) {
      if (seen.size >= 9) {
        break;
      }

      const app = c.nsid.split(".").slice(1, 2).join(".");

      if (!seen.has(app)) {
        tops.push(c);
        seen.add(app);
      }
    }

    return tops;
  }, [data]);

  if (isLoading) {
    // OLLIE TODO
    return null;
  }

  return (
    <>
      <div className="top-tiles">
        <h2>Top app collections</h2>
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
        {tops.map((top, i) => (
          <TopTile key={top.nsid} rank={i + 1} nsid={top.nsid} activeCount={top.dids_estimate} rankPeriod={period} />
        ))}
      </ol>
    </>
  );
}
