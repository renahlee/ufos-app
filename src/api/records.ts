import { useContext } from "react";
import { HostContext } from "../context";
import { useQuery } from "@tanstack/react-query";

interface Props {
  collection: string;
  limit: number;
}

const useRecords = ({ collection, limit }: Props) => {
  const host = useContext(HostContext);

  const url = `${host}/records`;

  const params = new URLSearchParams();

  params.set("collection", collection);
  params.set("limit", `${limit}`);

  return useQuery({
    queryKey: ["records"],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
  });
};

export { useRecords };
