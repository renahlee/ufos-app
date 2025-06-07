import { useContext, useRef, useState } from 'react';
import './search.css';

export function SearchInput({ onActivate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const querySetter = v => e => {
    e.preventDefault();
    onActivate(true);
    setQuery(v);
    inputRef.current.focus();
  };
  const canSearch = query.replaceAll(/[ \.]/g, '').length > 1;
  return (
    <div className="search-input">
      <div className="input-group">
        <input
          className="search-input-thing"
          placeholder="Search lexicons…"
          onFocus={() => onActivate(true)}
          onKeyDown={e => {
            if (e.key === 'Escape') inputRef.current.blur();
          }}
          onChange={e => setQuery(e.target.value)}
          onBlur={() => query === '' && onActivate(false)}
          value={query}
          ref={inputRef}
        />
        <button
          title="clear"
          onClick={() => {
            setQuery('');
            onActivate(false);
          }}
        >
          &times;
        </button>
      </div>
      {query === ''
        ? (
          <div className="eg">
            eg:
            <a href="#" onClick={querySetter('feed.like')}>feed.like</a>
            <a href="#" onClick={querySetter('uk.skyblur')}>uk.skyblur</a>
            <a href="#" onClick={querySetter('leaflet')}>leaflet</a>
          </div>
        ) : canSearch
            ? <SearchResults query={query} />
            : (
              <div className="eg">
                <em>keep typing to search</em>
              </div>
            )
      }
    </div>
  );
}

function SearchResults({ query }) {
  return (
    <p>search for {query}</p>
  );
}
