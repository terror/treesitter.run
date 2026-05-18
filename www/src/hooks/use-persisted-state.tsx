import { useCallback, useEffect, useState } from 'react';

type PersistedStateAction<T> = Partial<T> | ((prevState: T) => Partial<T>);

export function usePersistedState<T extends object>(
  key: string,
  initialValue: T
): [T, (action: PersistedStateAction<T>) => void] {
  const [state, setFullState] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue === null) {
        return initialValue;
      }

      return {
        ...initialValue,
        ...JSON.parse(savedValue),
      };
    } catch (error) {
      console.warn(`Error reading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, state]);

  const setState = useCallback((action: PersistedStateAction<T>) => {
    setFullState((prevState) => ({
      ...prevState,
      ...(typeof action === 'function' ? action(prevState) : action),
    }));
  }, []);

  return [state, setState];
}
