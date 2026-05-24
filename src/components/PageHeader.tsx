import { Link } from "react-router-dom";
import "./PageHeader.css";

interface PageHeaderProps {
  backTo: string;
  backLabel: string;
}

export function PageHeader({ backTo, backLabel }: PageHeaderProps) {
  return (
    <header className="page-header">
      <Link to={backTo} className="page-header__backlink">
        {backLabel}
      </Link>
    </header>
  );
}
