import { useContext } from "react";
import { HostContext } from "../context";
import { useQuery } from "@tanstack/react-query";

const useMeta = () => {
  const host = useContext(HostContext);

  const url = `${host}/meta`;

  return useQuery({
    queryKey: ["meta"],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
};

export { useMeta };
