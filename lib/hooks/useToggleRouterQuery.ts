import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useToggleRouterQuery = (name: string) => {
  const { query } = useRouter();

  const off = useMemo(() => {
    const newQuery = {
      ...query,
    };
    delete newQuery[name];
    return {
      newQuery,
    };
  }, [name, query]);

  const on = useMemo(() => {
    const newQuery = {
      ...query,
      [name]: 'tweet',
    };
    return {
      newQuery,
    };
  }, [name, query]);

  return {
    off,
    on,
    isOn: query[name] === 'tweet',
  };
};
