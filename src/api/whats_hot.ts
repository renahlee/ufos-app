import { useContext } from "react";
import { HostContext } from "../context";
import { useQuery } from "@tanstack/react-query";

interface Props {
  since: string;
  until?: string;
}

const useWhatsHot = ({ since, until }: Props) => {
  const host = useContext(HostContext);

  const url = `${host}/collections`;

  const params = new URLSearchParams();

  params.set("order", "dids-estimate");
  params.set("since", since);

  if (until !== undefined) {
    params.set("until", until);
  }

  return useQuery({
    queryKey: ["whatshot", since, ...(until !== undefined ? [until] : [])],
    queryFn: async () => {
      const response = await fetch(url + `?${params}`);
      return await response.json();
    },
  });
};

export { useWhatsHot };
