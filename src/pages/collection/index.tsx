import { useSearchParams } from 'react-router';

export function Collection({}) {
  const [searchParams, _setSearchParams] = useSearchParams();
  console.log('args', searchParams);
  return (
    <>
      hi: {searchParams.get('nsid')}
    </>
  );
}