import { useEffect, useState } from 'react';

export function useHasLoaded(ready: boolean) {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (ready) {
      setLoaded(true);
    }
  }, [ready]);

  return loaded;
}
