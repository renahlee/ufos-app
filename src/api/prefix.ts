import { useContext } from "react";
import { HostContext } from "../context";
import { useQuery } from "@tanstack/react-query";

interface Props {
  prefix: string;
}

const usePrefix = ({ prefix }: Props) => {
  const host = useContext(HostContext);

  const url = `${host}/prefix`;

  const params = new URLSearchParams();
  params.set("prefix", prefix);

  return useQuery({
    queryKey: ["prefix"],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
  });
};

export { usePrefix };
