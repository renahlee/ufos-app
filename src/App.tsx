import { useState } from 'react'
import { Fetch } from './fetch'
import './App.css'

async function get_whats_hot() {
  const now = new Date();
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const week_ago = new Date(now - ONE_WEEK_MS).toISOString();
  const two_weeks = new Date(now - 2 * ONE_WEEK_MS).toISOString();
  const HOST = 'http://localhost:9999';
  // const HOST = 'https://ufos-api.microcosm.blue';
  const [recent, before] = await Promise.all(
    [
      `limit=${42}&since=${week_ago}`,
      `limit=${64}&since=${two_weeks}&until=${week_ago}`,
    ]
    .map(q => fetch(`${HOST}/collections?order=dids-estimate&${q}`))
    .map(r => r.then(resp => resp.ok ? resp.json() : Promise.reject(new Error(resp)))));

  return recent.collections
    .map(current => {
      const old = before.collections.find(older => older.nsid === current.nsid);
      if (old && old.dids_estimate > 0) {
        const change = (current.dids_estimate - old.dids_estimate) / old.dids_estimate;
        return ({ change, current, old })
      }
    })
    .filter(c => !!c)
    .toSorted((a, b) => b.change - a.change)
    .slice(0, 6);
}

function App() {
  return (
    <>
      <div className="header">
        <h1>🛸 UFOs&nbsp;</h1>
      </div>
      <p>Samples and stats for every <a href="https://atproto.com/guides/lexicon" target="_blank">lexicon</a> observed in the ATmosphere</p>

      <h2>What's hot</h2>
      <Fetch
        using={get_whats_hot}
        args={[]}
        ok={whats_hot => (
          <ol className="hot">
            {whats_hot.map(hot => (
              <li>
                <p>
                  <strong>{hot.current.nsid}</strong><br/>
                  {hot.current.dids_estimate} people active<br/>
                  +{(hot.change * 100).toFixed()}% compared to last week
                </p>
              </li>
            ))}
          </ol>
        )}
      />
    </>
  )
}

export default App
