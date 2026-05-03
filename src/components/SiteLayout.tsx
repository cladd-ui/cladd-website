import Link from "next/link";
import type { ReactNode } from "react";

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 h-14 border-b border-cladd-outline">
        <Link href="/" className="font-semibold tracking-tight">
          cladd
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/docs/">Docs</Link>
          <Link href="/docs/components/button/">Components</Link>
          <a
            href="https://github.com/cladd-ui/cladd"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="px-6 py-6 text-xs text-cladd-fg-2 border-t border-cladd-outline">
        Built with cladd.
      </footer>
    </div>
  );
}
