import type { ReactNode } from "react";

import "./TopBar.css";

type TopBarProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function TopBar({ left, center, right, className }: TopBarProps) {
  return (
    <header className={`topbar ${className ?? ""}`.trim()}>
      <div className="topbar__side topbar__side--left">{left}</div>
      <div className="topbar__center">{center}</div>
      <div className="topbar__side topbar__side--right">{right}</div>
    </header>
  );
}
