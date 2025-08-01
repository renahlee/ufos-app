import { useQuery } from "@tanstack/react-query";
import { ONE_HOUR_MS, PERIOD } from "../constants";
import type { Period } from "../types";
import { HostContext } from "../context";
import { useContext } from "react";

interface Props {
  nsid: string | null;
  period: Period;
}

const useCollectionStat = ({ nsid, period }: Props) => {
  const host = useContext(HostContext);

  const now_ms = +new Date();
  const now_hours = Math.floor(now_ms / ONE_HOUR_MS);
  const now_truncated = now_hours * ONE_HOUR_MS;
  const period_ms = PERIOD[period]!;
  const since = new Date(now_truncated - period_ms).toISOString();

  const url = `${host}/collections/stats`;

  const params = new URLSearchParams();

  params.set("since", since);

  if (nsid !== null) {
    params.set("collection", nsid);
  }

  return useQuery({
    queryKey: ["collection", "stat", nsid],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
    enabled: nsid !== null,
  });
};

export { useCollectionStat };
