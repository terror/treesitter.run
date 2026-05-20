import { useEffect, useRef } from 'react';

export function usePreviousValue<T>(value: T): T | undefined {
  const previous = useRef<T>();

  useEffect(() => {
    previous.current = value;
  }, [value]);

  return previous.current;
}
