import { useState } from 'react'
import { NavLink } from 'react-router'
import { HostContext } from './context'
import './App.css'

const UFOS_HOST_DEV = 'http://localhost:9999';
const UFOS_HOST_PROD = 'https://ufos-api.microcosm.blue';
const INTIAL_HOST = localStorage.getItem('ufos-api-host') || UFOS_HOST_PROD;

function App({ children }) {
  const [ufosHost, setUfosHost] = useState(INTIAL_HOST);

  const setDev = en => {
    const newHost = en ? UFOS_HOST_DEV : UFOS_HOST_PROD;
    setUfosHost(newHost);
    localStorage.setItem('ufos-api-host', newHost);
  };
  const isDev = host => host === UFOS_HOST_DEV;

  return (
    <HostContext.Provider value={ufosHost}>
      <div className="dev-shortcut">
        api:
        {' '}
        <NavLink to="/status">status</NavLink>
        {' | '}
        <label>
          <input
            type="checkbox"
            onChange={e => setDev(e.target.checked)}
            checked={isDev(ufosHost)}
          />
          localhost
        </label>
      </div>
      <div className="header">
        <h1>
          <NavLink to="/">
            🛸 UFOs
          </NavLink>
        </h1>
        &nbsp;
        <p>Explore <a href="https://atproto.com/guides/lexicon" target="_blank">lexicons</a></p>
      </div>

      {children}

    </HostContext.Provider>
  )
}

export default App
