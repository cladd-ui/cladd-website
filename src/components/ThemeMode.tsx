import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeModeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export const THEME_STORAGE_KEY = 'cladd-theme';

function applyToDom(t: Theme) {
  const root = document.documentElement;
  root.classList.add('no-transition');
  root.classList.remove('dark', 'light');
  root.classList.add(t);
  requestAnimationFrame(() => {
    root.classList.remove('no-transition');
  });
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, t);
  } catch {}
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useLayoutEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      }
    } catch {}
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyToDom(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyToDom(next);
      return next;
    });
  }, []);

  return (
    <ThemeModeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return ctx;
}
