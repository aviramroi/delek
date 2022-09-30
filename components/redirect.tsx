import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';

export const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return <Fragment />;
};
