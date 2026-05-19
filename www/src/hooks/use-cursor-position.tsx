import { useState } from 'react';

export function useCursorPosition() {
  const [cursorPosition, setCursorPosition] = useState({
    row: 1,
    column: 1,
  });

  return { cursorPosition, setCursorPosition };
}
