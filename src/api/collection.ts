import { useQuery } from "@tanstack/react-query";
import { ONE_HOUR_MS, PERIOD } from "../constants";
import type { Period } from "../types";
import { HostContext } from "../context";
import { useContext } from "react";

interface Props {
  period?: Period;
  limit?: number;
  cursor?: string;
}

const useCollection = ({ cursor, period, limit = 32 }: Props) => {
  const host = useContext(HostContext);
  const url = `${host}/collections`;
  const params = new URLSearchParams();

  params.set("limit", `${limit}`);

  if (period !== undefined) {
    const now_ms = +new Date();
    const now_hours = Math.floor(now_ms / ONE_HOUR_MS);
    const now_truncated = now_hours * ONE_HOUR_MS;
    const period_ms = PERIOD[period]!;
    const since = new Date(now_truncated - period_ms).toISOString();

    params.set("since", since);
  }

  if (cursor !== undefined) {
    params.set("cursor", cursor);
  }

  return useQuery({
    queryKey: ["collection"],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
  });
};

export { useCollection };
