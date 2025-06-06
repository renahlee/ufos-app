import { useContext, useState } from 'react';
import './search.css';

export function SearchInput({ onActivate }) {
  const [entry, setEntry] = useState('');
  return (
    <div className="search-input">
      <div className="input-group">
        <input
          className="search-input-thing"
          placeholder="Search lexicons…"
          onFocus={() => onActivate(true)}
          onKeyDown={e => {
            if (e.key === 'Escape') e.target.blur(); // should this use a ref??
          }}
          onChange={e => setEntry(e.target.value)}
          onBlur={() => entry === '' && onActivate(false)}
          value={entry}
        />
        <button
          title="clear"
          onClick={() => {
            setEntry('');
            onActivate(false);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
