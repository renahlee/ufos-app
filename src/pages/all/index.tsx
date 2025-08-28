import { useState } from "react";
import { Link } from "react-router";
import { SearchInput } from "../../components/search";
import { NsidNice, NsidBar } from "../../components/nsid";
import "./all.css";
import { useCollection } from "../../api";

export function All() {
  const [searchActive, setSearchActive] = useState(false);
  const [showGhosts, setShowGhosts] = useState(false);
  const { data, isLoading } = useCollection({ limit: 200 });

  return (
    <>
      <div className="home-search">
        <SearchInput onActivate={setSearchActive} />
      </div>

      <div className={`all-collections ${searchActive ? "all-collections-hidden" : ""}`}>
        {/* we don't want to actually remove these from the react tree to avoid re-fetching*/}
        <div className="all-collections-control">
          <h2>All collections</h2>
          <label className="">
            <input type="checkbox" onChange={() => setShowGhosts((h) => !h)} checked={showGhosts} /> show ghosts
          </label>
        </div>
        <List resp={data} showGhosts={showGhosts} />
      </div>
    </>
  );
}

function List({ resp, showGhosts }) {
  const [showMore, setShowMore] = useState(false);

  const active = showGhosts ? resp.collections : resp.collections.filter((c) => c.creates > c.deletes);
  const { data, isLoading } = useCollection({ cursor: resp.cursor, limit: 200 });

  return (
    <>
      {active.map((c) => (
        <CollectionItem c={c} />
      ))}
      {resp.cursor &&
        (showMore ? (
          <List resp={data} showGhosts={showGhosts} />
        ) : (
          <p>
            <button onClick={() => setShowMore(true)}>+ more</button>
          </p>
        ))}
    </>
  );
}

const CollectionItem = ({ c }) => {
  let ghosty = c.deletes >= c.creates && c.deletes > 0;
  return (
    <Link key={c.nsid} to={`/collection/?nsid=${c.nsid}`} className={`all-collections-item ${ghosty ? "ghost" : ""}`}>
      <NsidBar n={c.dids_estimate} />
      &nbsp;
      {ghosty && <span className="ghosty">&nbsp;</span>}
      <NsidNice nsid={c.nsid} />
    </Link>
  );
};
