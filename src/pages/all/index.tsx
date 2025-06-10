import './all.css';
import { GetJson } from '../../fetch';

export function All({}) {

  return (
    <>
      <h2>All collections</h2>
      <GetJson
        endpoint="/collections"
        params={{limit: 100}}
        ok={collections => (
          <pre>{JSON.stringify(collections, null, 2)}</pre>
        )}
      />
    </>
  );
}
