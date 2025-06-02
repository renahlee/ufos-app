import { useContext, useState } from 'react';
import { HostContext } from '../../context';
import { useSearchParams } from 'react-router';
import { NsidNice } from '../../components/nsid';
import { niceDt } from '../../components/nice';
import { Sparkline } from '../../components/sparkline';
import { Record } from '../../components/record';
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
  const [showMore, setShowMore] = useState(false);
  const [searchParams, _setSearchParams] = useSearchParams();
  const nsid = searchParams.get('nsid');
  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <h2>
          <NsidNice nsid={nsid} />
        </h2>
        &nbsp;
        <div style={{width: '9rem'}}>
          <Sparkline nsid={nsid} />
        </div>

      </div>

      <h3 style={{marginTop: '2rem'}}>Sample record: latest</h3>
      <Fetch
        using={get_samples}
        args={[host, nsid, 1]}
        ok={samples => samples.length === 0
          ? <p><em>no records seen</em></p>
          : showMore
            ? samples.map(s => (
              <Sample
                key={`${s.did}/${s.rkey}`}
                sample={s}
                nsid={nsid}
              />
            ))
            : (
              <>
                <Sample
                  key={`${samples[0].did}/${samples[0].rkey}`}
                  sample={samples[0]}
                  nsid={nsid}
                />
                {samples.length > 1 && (
                  <button onClick={() => setShowMore(true)}>
                    show more
                  </button>
                )}
              </>
            )
        }
      />

    </>
  );
}
      // <p>
      //   {niceDt(new Date() - sample.time_us / 1000)} ago
      //   {' '}
      //   <small>{sample.did}/&hellip;/{sample.rkey}</small>
      // </p>

function Sample({ sample, nsid }) {
  return (
    <div style={{
      background: '#111',
      padding: '0.5rem',
      margin: '0 0 1em',
    }}>
      <Record record={sample.record} nsid={nsid} />
    </div>
  );
}
