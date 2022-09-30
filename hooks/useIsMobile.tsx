import { useWindowSize } from './useWindowSize';

export const useMobile = () => {
  const { width } = useWindowSize();

  return width ? width < 768 : false;
};
