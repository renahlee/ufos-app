import { useState, useContext } from 'react'
import { HostContext } from './context'
import { WhatsHot } from './WhatsHot'
import './App.css'

const UFOS_HOST_DEV = 'http://localhost:9999';
const UFOS_HOST_PROD = 'https://ufos-api.microcosm.blue';
const INTIAL_HOST = localStorage.getItem('ufos-api-host') || UFOS_HOST_PROD;

function App() {
  const [ufosHost, setUfosHost] = useState(INTIAL_HOST);

  const setDev = en => {
    const newHost = en ? UFOS_HOST_DEV : UFOS_HOST_PROD;
    setUfosHost(newHost);
    localStorage.setItem('ufos-api-host', newHost);
  };
  const isDev = host => host === UFOS_HOST_DEV;

  return (
    <HostContext.Provider value={ufosHost}>
      <label className="dev-mode">
        <input
          type="checkbox"
          onChange={e => setDev(e.target.checked)}
          checked={isDev(ufosHost)}
        />
        dev api
      </label>
      <div className="header">
        <h1>🛸 UFOs&nbsp;</h1>
      </div>
      <p>Samples and stats for every <a href="https://atproto.com/guides/lexicon" target="_blank">lexicon</a> observed in the ATmosphere</p>
      <WhatsHot />
    </HostContext.Provider>
  )
}

export default App
