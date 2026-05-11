import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface SidebarContextValue {
  open: boolean;
  /** True only briefly around a user-initiated open/close, so CSS transitions can be gated on it. */
  animating: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const ANIMATION_MS = 450;

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const router = useRouter();
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const startAnimating = useCallback(() => {
    setAnimating(true);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      setAnimating(false);
      animationTimeoutRef.current = null;
    }, ANIMATION_MS);
  }, []);

  const toggle = useCallback(() => {
    startAnimating();
    setOpen((v) => !v);
  }, [startAnimating]);

  const close = useCallback(() => {
    setOpen((wasOpen) => {
      if (wasOpen) startAnimating();
      return false;
    });
  }, [startAnimating]);

  useEffect(() => {
    const handler = () => {
      setOpen((wasOpen) => {
        if (wasOpen) startAnimating();
        return false;
      });
    };
    router.events.on('routeChangeComplete', handler);
    return () => {
      router.events.off('routeChangeComplete', handler);
    };
  }, [router.events, startAnimating]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ open, animating, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    return {
      open: false,
      animating: false,
      toggle: () => {},
      close: () => {},
    };
  }
  return ctx;
}
