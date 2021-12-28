import { useState } from 'react';

export type DarkMode = ReturnType<typeof useIsDarkMode>;

export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return { isDarkMode, setIsDarkMode };
}
