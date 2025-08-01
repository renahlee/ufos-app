import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";

// Following defaults per https://tanstack.com/query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export { queryClient, persister };
export * from "./collection";
export * from "./collection_stat";
export * from "./group";
export * from "./meta";
export * from "./prefix";
export * from "./timeseries";
export * from "./whats_hot";
