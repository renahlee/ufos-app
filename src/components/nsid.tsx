import './nsid.css'

const getBits = nsid => {
  const segments = nsid.split('.');

  const tld = segments.length > 2 ? segments[0] : null; // assumed; todo: psl
  const app = segments.length > 2 ? segments[1] : segments[0];
  const mids = segments.length > 4
    ? segments.slice(2, segments.length - 2)
    : [];
  const group = segments.length > 3 ? segments.at(-2) : null;
  const name = segments.at(-1);
  return { tld, app, mids, group, name };
};

export function NsidTitle({ nsid }) {
  const bits = getBits(nsid);
  if (bits.app && bits.name) {
    return (
      <span className="nsid-title">
        <span className="nsid-app">{bits.app}</span>
        {' '}
        <span className="nsid-name">{bits.name}</span>
      </span>
    );
  } else {
    return (
      <span className="nsid-title">
        <span className="nsid-name">{bits.name}</span>
      </span>
    );
  }
}

export function NsidNice({ nsid, subtle }) {
  const { tld, app, mids, group, name } = getBits(nsid);
  return (
    <span className={`nsid-nice ${subtle ? 'subtle' : ''}`}>
      {tld && (<><span className="nsid-tld">{tld}</span>.</>)}
      {app && (<><span className="nsid-app">{app}</span>.</>)}
      {mids.length > 0 && (<><span className="nsid-mids">{mids.join('.')}</span>.</>)}
      {group && (<><span className="nsid-group">{group}</span>.</>)}
      {name && (<span className="nsid-name">{name}</span>)}
    </span>
  );
}

export function NsidBad({ nsid }) {
  const { tld, app, mids, group, name } = getBits(nsid);
  return (
    <span className="nsid-bad">
      ⚠️{' '}
      {tld && (<><span className="nsid-bad-bit">{tld}</span>.</>)}
      {app && (<><span className="nsid-bad-bit">{app}</span>.</>)}
      {mids.length > 0 && (<><span className="nsid-bad-bit">{mids.join('.')}</span>.</>)}
      {group && (<><span className="nsid-bad-bit">{group}</span>.</>)}
      {name && (<span className="nsid-bad-bit">{name}</span>)}
    </span>
  );
}
