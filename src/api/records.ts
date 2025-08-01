import { useContext } from "react";
import { HostContext } from "../context";
import { useQuery } from "@tanstack/react-query";

interface Props {
  collection: string | null;
  limit: number;
}

const useRecords = ({ collection, limit }: Props) => {
  const host = useContext(HostContext);

  const url = `${host}/records`;
  const params = new URLSearchParams();

  params.set("limit", `${limit}`);

  if (collection !== null) {
    params.set("collection", collection);
  }

  return useQuery({
    queryKey: ["records"],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
    enabled: collection !== null,
  });
};

export { useRecords };
