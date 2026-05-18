import type React from "react";
import { Link } from "react-router-dom";

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
  variant?: "secondary" | "outline-secondary" | "outline-light";
};

export default function ButtonLink({ to, children, variant = "secondary" }: ButtonLinkProps) {
  return (
    <Link to={to} className={`btn btn-${variant}`}>
      {children}
    </Link>
  );
}
