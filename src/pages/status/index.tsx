import { niceDt } from "../../components/nice";
import { useMeta } from "../../api";

const Cursor = ({ cursor }) => {
  if (!cursor) return "??";
  let dt_ms = new Date() - cursor / 1000;
  return (
    <>
      {cursor} ({dt_ms < 0 ? "0" : `-${niceDt(dt_ms)}`})
    </>
  );
};

const Size = ({ bytes }) => {
  if (!bytes) return "??";
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  bytes /= 1024;
  if (bytes < 1024) {
    return `${bytes.toFixed(1)}KiB`;
  }
  bytes /= 1024;
  if (bytes < 1024) {
    return `${bytes.toFixed(2)}MiB`;
  }
  bytes /= 1024;
  if (bytes < 1024) {
    return `${bytes.toFixed(2)}GiB`;
  }
  bytes /= 1024;
  if (bytes < 1024) {
    return `${bytes.toFixed(2)}TiB`;
  }
  return `${Math.round(bytes).toLocaleString()}TiB`;
};

export function Status() {
  const { data: status } = useMeta();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <h2>API status&nbsp;</h2>
        <a
          href=""
          title="reload"
          onClick={(e) => {
            e.preventDefault();
            // OLLIE TODO: expose react-query cache invalidation
          }}
        >
          reload
        </a>
      </div>
      <p>
        <i>Note: this info may be up to 15s stale due to caching</i>
      </p>

      <h3 style={{ margin: "2rem 0 1rem" }}>Firehose</h3>
      <p>
        Type: <strong>{status.consumer?.jetstream ? "jetstream" : "??"}</strong>
      </p>
      <p>
        Host: <strong>{status.consumer?.jetstream?.endpoint ?? "??"}</strong>
      </p>
      <p>
        Cursor: <Cursor cursor={status.consumer?.jetstream?.latest_cursor} />
      </p>

      <h3 style={{ margin: "2rem 0 1rem" }}>Database</h3>
      <p>
        Storage: <strong>{status.storage_name ?? "??"}</strong>
      </p>
      <p>
        Current size: <Size bytes={status.storage?.keyspace_disk_space ?? "??"} />
      </p>
      <p>
        Rollup cursor: <Cursor cursor={status.storage?.rollup_cursor} />
      </p>
    </div>
  );
}
