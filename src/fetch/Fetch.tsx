import { useEffect, useState } from 'react';

const loadingDefault = () => (
  <p><em>Loading&hellip;</em></p>
);

const errorDefault = err => (
  <p className="error">
    <strong>Error</strong>:<br/>{`${err}`}
  </p>
);

export function Fetch({ using, args, ok, loading, error }) {
  const [asyncData, setAsyncData] = useState({ state: null });

  useEffect(() => {
    let ignore = false;
    setAsyncData({ state: 'loading' });
    (async () => {
      try {
        const data = await using(...args);
        !ignore && setAsyncData({ state: 'done', data });
      } catch (err) {
        !ignore && setAsyncData({ state: 'error', err });
      }
    })();
    return () => { ignore = true; }
  }, args);

  if (asyncData.state === 'loading') {
    return (loading || loadingDefault)(...args);
  } else if (asyncData.state === 'error') {
    return (error || errorDefault)(asyncData.err);
  } else if (asyncData.state === null) {
    return <span>wat, request has not started (bug?)</span>;
  } else {
    if (asyncData.state !== 'done') { console.warn(`unexpected async data state: ${asyncData.state}`); }
    return ok(asyncData.data);
  }
}
