import { useContext } from 'react';
import { HostContext } from '../../context';
import { useSearchParams } from 'react-router';
import { NsidNice } from '../../components/nsid';
import { niceDt } from '../../components/nice';
import { Fetch } from '../../fetch';

async function get_samples(host, nsid, limit) {
  const res = await fetch(`${host}/records?collection=${nsid}&limit=${limit}`);
  if (!res.ok) {
    throw new Error(`request failed: ${res}`);
  }
  return await res.json();
}

export function Collection({}) {
  const host = useContext(HostContext);
  const [searchParams, _setSearchParams] = useSearchParams();
  const nsid = searchParams.get('nsid');
  return (
    <>
      <h2>Sample records</h2>

      <p><NsidNice nsid={nsid} /></p>

      <Fetch
        using={get_samples}
        args={[host, nsid, 1]}
        ok={samples => samples.map(sample => (
          <div key={`${sample.did}/${sample.rkey}`}>
            <p>{sample.did}/&hellip;/{sample.rkey}</p>
            <p>{niceDt(new Date() - sample.time_us / 1000)} ago</p>
            <Record record={sample.record} />
          </div>
        ))}
      />

    </>
  );
}

function Record({ record }) {
  return <pre>{JSON.stringify(record, null, 2)}</pre>
}
