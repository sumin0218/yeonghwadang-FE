import type { ReactNode } from "react";

import "./Header.css";

type HeaderProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
};

export function Header({ left, center, right, className }: HeaderProps) {
  return (
    <header className={`header ${className ?? ""}`.trim()}>
      <div className="header__side header__side--left">{left}</div>
      <div className="header__center">{center}</div>
      <div className="header__side header__side--right">{right}</div>
    </header>
  );
}
